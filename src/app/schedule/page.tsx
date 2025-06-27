"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";
import { Seo } from "@/components/seo";
import { useFormspark } from "@formspark/use-formspark";

type ScheduleFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  location: string;
  services: string;
  projectDescription: string;
  _honeypot: string;
  submissionTime: number;
};

export default function SchedulePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ScheduleFormData, string>>>({});

  const [formData, setFormData] = useState<ScheduleFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    companySize: "",
    location: "",
    services: "",
    projectDescription: "",
    _honeypot: "",
    submissionTime: 0,
  });

  const [submit, submitting] = useFormspark({
    formId: process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID || "",
  });

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ScheduleFormData, string>> = {};
    
    if (!/^[A-Za-z]{2,24}$/.test(formData.firstName)) {
      errors.firstName = "First name must be 2-24 letters only";
    }
    if (!/^[A-Za-z]{2,24}$/.test(formData.lastName)) {
      errors.lastName = "Last name must be 2-24 letters only";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!/^(\+251[97]\d{8}|0[97]\d{8})$/.test(formData.phone)) {
      errors.phone = "Please enter a valid Ethiopian phone number";
    }

    if (formData.company.length < 2 || formData.company.length > 50) {
      errors.company = "Company name must be between 2 and 50 characters";
    }

    if (!formData.industry) errors.industry = "Please select an industry";
    if (!formData.companySize) errors.companySize = "Please select company size";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.services) errors.services = "Please select a service";
    if (!formData.projectDescription) errors.projectDescription = "Project description is required";
    if (formData.projectDescription.length > 350) {
      errors.projectDescription = "Project description must not exceed 350 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData._honeypot) {
      console.log("Bot detected");
      return;
    }

    const timeSinceFormLoad = Date.now() - formData.submissionTime;
    if (timeSinceFormLoad < 3000) {
      console.log("Submission too quick - likely a bot");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const { _honeypot, submissionTime: formLoadTime, ...submitData } = formData;
    await submit(submitData);
    setFormSubmitted(true);
  };

  useState(() => {
    setFormData(prev => ({ ...prev, submissionTime: Date.now() }));
  });

  if (formSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white relative">
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(64,64,64,0.1),transparent_60%)]"></div>
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(64,64,64,0.1),transparent_60%)]"></div>
        <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          <Seo
            title="Thank You"
            description="Thank you for scheduling a call with YOLET Labs. We'll be in touch shortly to confirm your appointment."
          />

          <main className="flex-1 pt-24 pb-20">
            <div className="container px-4 md:px-6">
              <div className="mx-auto max-w-2xl text-center">
                <div className="rounded-xl border border-white/10 bg-gray-900/30 p-8 md:p-12">
                  <div className="flex flex-col items-center justify-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-6" />
                    <h1 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
                      Thank You for Scheduling a Call
                    </h1>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      We've received your information and will be in touch shortly
                      to confirm your appointment.
                    </p>
                    <Button
                      className="bg-yellow-500 text-black transition-all duration-300 hover:bg-yellow-600"
                      onClick={() => (window.location.href = "/")}
                    >
                      Return to Home
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(64,64,64,0.1),transparent_60%)]"></div>
      <div className="fixed inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <Seo
          title="Schedule a Call"
          description="Schedule a call with YOLET Labs to discuss how we can help you achieve your business goals with custom software solutions."
        />

        <main className="flex-1 pt-24 pb-20 mt-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-2 text-center">
                Schedule a Call
              </h1>
              <p className="text-gray-400 text-center mb-12">
                Let's discuss how we can help you achieve your business goals.
              </p>

              <div className="rounded-xl border border-white/10 bg-gray-900/30 p-6 md:p-8">
                <form
                  action="https://submit-form.com/P2vM5bH8i"
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  <input
                    type="text"
                    name="_honeypot"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                  />

                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Your Information</h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          required
                          minLength={2}
                          maxLength={24}
                          pattern="^[A-Za-z]{2,24}$"
                          title="Please enter a valid first name (2-24 letters only)"
                          className="bg-gray-800/50 border-gray-700"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {formErrors.firstName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          required
                          minLength={2}
                          maxLength={24}
                          pattern="^[A-Za-z]{2,24}$"
                          title="Please enter a valid last name (2-24 letters only)"
                          className="bg-gray-800/50 border-gray-700"
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                        />
                        {formErrors.lastName && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+251xxxxxxxxx"
                        pattern="^(\+251[97]\d{8}|0[97]\d{8})$"
                        title="Please enter a valid Ethiopian phone number (+2519/7xxxxxxxx or 09/7xxxxxxxx)"
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Company Information</h2>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Inc."
                        required
                        minLength={2}
                        maxLength={50}
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                      {formErrors.company && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Select
                          name="industry"
                          required
                          onValueChange={(value) =>
                            setFormData({ ...formData, industry: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-700">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.industry && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Company Size</Label>
                        <Select
                          name="companySize"
                          required
                          onValueChange={(value) =>
                            setFormData({ ...formData, companySize: value })
                          }
                        >
                          <SelectTrigger className="bg-gray-800/50 border-gray-700">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-500">201-500 employees</SelectItem>
                            <SelectItem value="501+">501+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors.companySize && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.companySize}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Company Location</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        required
                        minLength={2}
                        maxLength={100}
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                      {formErrors.location && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Project Details</h2>

                    <div className="space-y-2">
                      <Label>What services are you interested in?</Label>
                      <RadioGroup
                        defaultValue="enterprise"
                        name="services"
                        required
                        className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2 [&_[data-state=checked]]:border-yellow-500"
                        onValueChange={(value) => {
                          const serviceLabels: { [key: string]: string } = {
                            enterprise: "Enterprise Software",
                            app: "Full App Development",
                            redesign: "System Redesign",
                            consulting: "Strategic Consulting",
                          };
                          setFormData({
                            ...formData,
                            services: serviceLabels[value],
                          });
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="enterprise"
                            id="enterprise"
                            className="border-gray-400 text-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="enterprise" className="font-normal">
                            Enterprise Software
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="app"
                            id="app"
                            className="border-gray-400 text-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="app" className="font-normal">
                            Full App Development
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="redesign"
                            id="redesign"
                            className="border-gray-400 text-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="redesign" className="font-normal">
                            System Redesign
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="consulting"
                            id="consulting"
                            className="border-gray-400 text-yellow-500 focus:ring-yellow-500"
                          />
                          <Label htmlFor="consulting" className="font-normal">
                            Strategic Consulting
                          </Label>
                        </div>
                      </RadioGroup>
                      {formErrors.services && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.services}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        name="projectDescription"
                        placeholder="Tell us about your project and what you're looking to achieve..."
                        required
                        maxLength={350}
                        className="min-h-[120px] bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            projectDescription: e.target.value,
                          })
                        }
                      />
                      {formErrors.projectDescription && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.projectDescription}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
                    disabled={submitting}
                  >
                    {submitting ? "Scheduling..." : "Schedule Your Call"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
