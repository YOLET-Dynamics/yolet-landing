"use client";

import type { FormEvent, ReactElement, ReactNode } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronLeft } from "lucide-react";
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
        <div className="flex flex-col items-start gap-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-400">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <h2 className="display-3">Request sent.</h2>
            <p className="body-base max-w-xl">
              We got it. We&rsquo;ll be in touch soon.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">Return home</Link>
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
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 lg:p-10"
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
        {serverError ? (
          <div className="rounded-lg bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {serverError}
          </div>
        ) : null}

        <div className="flex items-center gap-3">
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
                aria-label={`Step ${step.number}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  isActive
                    ? "bg-yellow-500"
                    : isComplete
                      ? "bg-white/40 hover:bg-white/60"
                      : "bg-white/10",
                  isFuture && "cursor-not-allowed",
                )}
              />
            );
          })}
        </div>

        <div>
          <div className="space-y-2 pb-6">
            <p className="section-eyebrow">{currentStep.title}</p>
            <h2 className="display-3 text-balance">{currentStep.heading}</h2>
            {currentStep.description ? (
              <p className="body-base max-w-xl">{currentStep.description}</p>
            ) : null}
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
                              "flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 p-4 transition-colors",
                              field.value === option
                                ? "border-white/30 bg-white/[0.04]"
                                : "hover:border-white/20",
                            )}
                          >
                            <RadioGroupItem id={option} value={option} className="mt-1" />
                            <span className="text-sm leading-6 text-white/75">
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
              </Button>
            ) : (
              <Button type="button" size="lg" onClick={() => void goToNextStep()}>
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
