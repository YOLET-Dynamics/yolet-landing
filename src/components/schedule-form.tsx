"use client";

import type { FormEvent, ReactElement, ReactNode } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
  SERVICE_OPTIONS,
  scheduleSubmissionSchema,
  type ScheduleSubmission,
} from "@/lib/schedule-schema";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ScheduleApiError = {
  error?: string;
  fieldErrors?: Partial<Record<keyof ScheduleSubmission, string[]>>;
};

type ScheduleField = keyof ScheduleSubmission;

type FormStep = {
  id: "contact" | "company" | "project";
  number: string;
  title: string;
  heading: string;
  description: string;
  fields: readonly ScheduleField[];
};

const FORM_STEPS = [
  {
    id: "contact",
    number: "01",
    title: "Contact details",
    heading: "Your contact details.",
    description: "",
    fields: ["firstName", "lastName", "email", "phone"],
  },
  {
    id: "company",
    number: "02",
    title: "Company context",
    heading: "A little company context.",
    description: "",
    fields: ["company", "location", "industry", "companySize"],
  },
  {
    id: "project",
    number: "03",
    title: "Project scope",
    heading: "What do you need help with?",
    description: "",
    fields: ["services", "projectDescription"],
  },
] satisfies readonly FormStep[];

const FIELD_SURFACE_CLASS =
  "border-transparent bg-white/[0.035] focus-visible:border-transparent focus-visible:ring-yellow-500/20";

type FormFieldProps = {
  children: ReactNode;
  description?: string;
  error?: string;
  label: string;
  htmlFor?: string;
};

function FormField({
  children,
  description,
  error,
  label,
  htmlFor,
}: FormFieldProps): ReactElement {
  return (
    <div className="space-y-2.5">
      <Label htmlFor={htmlFor} className="text-sm text-white/[0.78]">
        {label}
      </Label>
      {description ? (
        <p className="text-xs leading-5 text-white/[0.42]">{description}</p>
      ) : null}
      {children}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

function getDefaultValues(startedAt: number): ScheduleSubmission {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: undefined as never,
    companySize: undefined as never,
    location: "",
    services: undefined as never,
    projectDescription: "",
    honeypot: "",
    startedAt,
  };
}

function getFirstInvalidStepIndex(
  fieldErrors?: Partial<Record<ScheduleField, string[]>>,
): number {
  if (!fieldErrors) {
    return -1;
  }

  return FORM_STEPS.findIndex((step) =>
    step.fields.some((field) => (fieldErrors[field]?.length ?? 0) > 0),
  );
}

export function ScheduleForm(): ReactElement {
  const startedAtRef = useRef<number>(Date.now());
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const form = useForm<ScheduleSubmission>({
    resolver: zodResolver(scheduleSubmissionSchema),
    defaultValues: getDefaultValues(startedAtRef.current),
    mode: "onBlur",
  });

  const currentStep = FORM_STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;
  const projectDescription = form.watch("projectDescription") ?? "";
  const submitHandler = form.handleSubmit(onSubmit);

  async function onSubmit(values: ScheduleSubmission): Promise<void> {
    setServerError("");

    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result =
      ((await response.json().catch((): null => null)) as ScheduleApiError | null) ??
      null;

    if (!response.ok) {
      if (result?.fieldErrors) {
        for (const [fieldName, messages] of Object.entries(result.fieldErrors)) {
          const message = messages?.[0];

          if (!message) {
            continue;
          }

          form.setError(fieldName as keyof ScheduleSubmission, {
            type: "server",
            message,
          });
        }

        const nextStepIndex = getFirstInvalidStepIndex(result.fieldErrors);

        if (nextStepIndex >= 0) {
          setCurrentStepIndex(nextStepIndex);
        }
      }

      setServerError(
        result?.error ??
        "Your request could not be sent right now. Please try again in a moment.",
      );
      return;
    }

    startedAtRef.current = Date.now();
    form.reset(getDefaultValues(startedAtRef.current));
    setCurrentStepIndex(0);
    setIsSubmitted(true);
  }

  async function goToNextStep(): Promise<void> {
    if (isLastStep) {
      return;
    }

    const isValid = await form.trigger([...currentStep.fields], {
      shouldFocus: true,
    });

    if (!isValid) {
      return;
    }

    setServerError("");
    setCurrentStepIndex((stepIndex) =>
      Math.min(stepIndex + 1, FORM_STEPS.length - 1),
    );
  }

  function goToPreviousStep(): void {
    setServerError("");
    setCurrentStepIndex((stepIndex) => Math.max(stepIndex - 1, 0));
  }

  function handleStepSelect(stepIndex: number): void {
    if (stepIndex >= currentStepIndex) {
      return;
    }

    setServerError("");
    setCurrentStepIndex(stepIndex);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>): void {
    if (!isLastStep) {
      event.preventDefault();
      void goToNextStep();
      return;
    }

    void submitHandler(event);
  }

  if (isSubmitted) {
    return (
      <div className="premium-surface overflow-hidden p-8 md:p-10">
        <div className="flex flex-col items-start gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1rem] border border-green-500/20 bg-green-500/10 text-green-400">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-medium text-white">
              Request sent.
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/[0.62]">
              We got it. We’ll be in touch soon.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                Return home
                <ArrowUpRight className="text-yellow-600" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => {
                setCurrentStepIndex(0);
                setIsSubmitted(false);
              }}
            >
              Send another request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/[0.16] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl md:p-8 lg:p-10"
      noValidate
    >
      <input
        type="hidden"
        {...form.register("startedAt", { valueAsNumber: true })}
      />

      <div className="hidden">
        <Label htmlFor="companyWebsite">Leave this field blank</Label>
        <Input
          id="companyWebsite"
          autoComplete="off"
          tabIndex={-1}
          {...form.register("honeypot")}
        />
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-3">
                <h2 className="text-3xl font-medium text-white md:text-4xl">
                  Start with the basics.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-white/[0.52] md:text-base">
                  Just enough for a useful first reply.
                </p>
              </div>
            </div>

            {serverError ? (
              <div className="rounded-[1.05rem] bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {serverError}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-2 px-3 py-3 md:px-5">
          <div className="pointer-events-none absolute left-[calc(16.666%+0.75rem)] right-[calc(16.666%+0.75rem)] top-1/2 h-px -translate-y-1/2 bg-white/10 md:left-[calc(16.666%+1.25rem)] md:right-[calc(16.666%+1.25rem)]">
            <div
              className={cn(
                "h-full bg-gradient-to-r from-yellow-500 to-yellow-500/65 transition-all duration-300",
                currentStepIndex === 0
                  ? "w-0"
                  : currentStepIndex === 1
                    ? "w-1/2"
                    : "w-full",
              )}
            />
          </div>
          {FORM_STEPS.map((step, index) => {
            const isActive = index === currentStepIndex;
            const isComplete = index < currentStepIndex;
            const isFuture = index > currentStepIndex;

            return (
              <button
                key={step.id}
                type="button"
                disabled={isFuture}
                onClick={() => handleStepSelect(index)}
                className={cn(
                  "relative flex items-center justify-center py-2 text-center transition-colors",
                  isActive
                    ? "text-white"
                    : isComplete
                      ? "text-white/[0.72] hover:text-white"
                      : "text-white/[0.3]",
                  isFuture && "cursor-not-allowed",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-full text-[0.98rem] font-medium tracking-[0.08em] transition-all duration-300",
                    isActive
                      ? "border border-yellow-500/20 bg-yellow-500/[0.06] text-yellow-400 shadow-[0_0_0_1px_rgba(245,184,0,0.06),0_0_32px_rgba(245,184,0,0.14)]"
                      : isComplete
                        ? "border border-white/10 bg-white/[0.03] text-white/[0.7]"
                        : "border border-white/[0.06] bg-black/[0.22] text-white/[0.28]",
                  )}
                >
                  {step.number}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-[1.15rem] bg-black/[0.18] p-5 md:p-6">
          <div className="space-y-2 pb-6">
            <p className="text-[0.82rem] font-medium tracking-[0.08em] text-white/[0.42]">
              {currentStep.title}
            </p>
            <h3 className="text-[1.45rem] font-medium leading-tight text-white md:text-[1.8rem]">
              {currentStep.heading}
            </h3>
            <p className="max-w-xl text-sm leading-6 text-white/[0.5]">
              {currentStep.description}
            </p>
          </div>

          <div>
            {currentStep.id === "contact" ? (
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="First name"
                    htmlFor="firstName"
                    error={form.formState.errors.firstName?.message}
                  >
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      placeholder="Abel"
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("firstName")}
                    />
                  </FormField>
                  <FormField
                    label="Last name"
                    htmlFor="lastName"
                    error={form.formState.errors.lastName?.message}
                  >
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      placeholder="Kebede"
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("lastName")}
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="Email"
                    htmlFor="email"
                    error={form.formState.errors.email?.message}
                  >
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="hello@company.com"
                      spellCheck={false}
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("email")}
                    />
                  </FormField>
                  <FormField
                    label="Phone"
                    htmlFor="phone"
                    error={form.formState.errors.phone?.message}
                  >
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+251912345678"
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("phone")}
                    />
                  </FormField>
                </div>
              </div>
            ) : null}

            {currentStep.id === "company" ? (
              <div className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="Company"
                    htmlFor="company"
                    error={form.formState.errors.company?.message}
                  >
                    <Input
                      id="company"
                      autoComplete="organization"
                      placeholder="YOLET"
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("company")}
                    />
                  </FormField>
                  <FormField
                    label="Location"
                    htmlFor="location"
                    error={form.formState.errors.location?.message}
                  >
                    <Input
                      id="location"
                      autoComplete="address-level2"
                      placeholder="Addis Ababa, Ethiopia"
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("location")}
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    label="Industry"
                    error={form.formState.errors.industry?.message}
                  >
                    <Controller
                      control={form.control}
                      name="industry"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={FIELD_SURFACE_CLASS}>
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRY_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormField>
                  <FormField
                    label="Company size"
                    error={form.formState.errors.companySize?.message}
                  >
                    <Controller
                      control={form.control}
                      name="companySize"
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className={FIELD_SURFACE_CLASS}>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPANY_SIZE_OPTIONS.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormField>
                </div>
              </div>
            ) : null}

            {currentStep.id === "project" ? (
              <div className="space-y-5">
                <FormField
                  label="What do you need help with?"
                  error={form.formState.errors.services?.message}
                >
                  <Controller
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <RadioGroup
                        className="grid gap-3 md:grid-cols-2"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <label
                            key={option}
                            htmlFor={option}
                            className={cn(
                              "flex cursor-pointer items-start gap-3 rounded-[1.1rem] bg-white/[0.03] p-4 transition-colors",
                              field.value === option
                                ? "bg-yellow-500/[0.1] shadow-[inset_0_0_0_1px_rgba(245,184,0,0.22)]"
                                : "hover:bg-white/[0.05]",
                            )}
                          >
                            <RadioGroupItem id={option} value={option} className="mt-1" />
                            <span className="text-sm leading-6 text-white/[0.72]">
                              {option}
                            </span>
                          </label>
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormField>

                <FormField
                  label="Project details"
                  htmlFor="projectDescription"
                  description="What are you building or fixing?"
                  error={form.formState.errors.projectDescription?.message}
                >
                  <div className="space-y-2">
                    <Textarea
                      id="projectDescription"
                      placeholder="We’re redesigning an internal workflow platform and need a cleaner, faster experience for our operations team."
                      maxLength={500}
                      className={FIELD_SURFACE_CLASS}
                      {...form.register("projectDescription")}
                    />
                    <div className="flex items-center justify-between text-xs text-white/[0.38]">
                      <span>Short and clear is enough.</span>
                      <span>{projectDescription.length}/500</span>
                    </div>
                  </div>
                </FormField>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            {currentStepIndex > 0 ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={goToPreviousStep}
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
            ) : null}

            {isLastStep ? (
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending request..." : "Schedule a call"}
                <ArrowUpRight className="text-yellow-600" />
              </Button>
            ) : (
              <Button type="button" size="lg" onClick={() => void goToNextStep()}>
                Continue
                <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
