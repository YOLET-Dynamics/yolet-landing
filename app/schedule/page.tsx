"use client";

import type React from "react";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
};

export default function SchedulePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

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
  });

  const [submit, submitting] = useFormspark({
    formId: process.env.NEXT_PUBLIC_FORMSPARK_FORM_ID || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(formData);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-black text-white">
        <Seo
          title="Thank You"
          description="Thank you for scheduling a call with YOLET Labs. We'll be in touch shortly to confirm your appointment."
        />
        <Navigation />

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

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Seo
        title="Schedule a Call"
        description="Schedule a call with YOLET Labs to discuss how we can help you achieve your business goals with custom software solutions."
      />
      <Navigation />

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
                        pattern="^[A-Za-z]+$"
                        title="Please enter a valid first name (2-24 letters only)"
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
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
                        pattern="^[A-Za-z]+$"
                        title="Please enter a valid last name (2-24 letters only)"
                        className="bg-gray-800/50 border-gray-700"
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
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
                      className="bg-gray-800/50 border-gray-700"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
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
                      className="bg-gray-800/50 border-gray-700"
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select
                        name="industry"
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
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Select
                        name="companySize"
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
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Company Location</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, Country"
                      required
                      className="bg-gray-800/50 border-gray-700"
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-medium">Project Details</h2>

                  <div className="space-y-2">
                    <Label>What services are you interested in?</Label>
                    <RadioGroup
                      defaultValue="enterprise"
                      name="services"
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      name="projectDescription"
                      placeholder="Tell us about your project and what you're looking to achieve..."
                      maxLength={350}
                      className="min-h-[120px] bg-gray-800/50 border-gray-700"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectDescription: e.target.value,
                        })
                      }
                    />
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

      <Footer />
    </div>
  );
}
