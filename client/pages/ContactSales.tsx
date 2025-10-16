import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  attendeeCount: string;
  message: string;
}

const faqs = [
  {
    icon: CheckCircle2,
    title: "Quick questions",
    description:
      "Get answers and keep momentum on your project management or collaboration needs.",
  },
  {
    icon: CheckCircle2,
    title: "Personal help",
    description:
      "A live representative will set up tailor you to switch with you its personalized feedback and assistance.",
  },
  {
    icon: CheckCircle2,
    title: "Need a demo?",
    description:
      "Discover how we can help save a demo of Figma, host & we handle project management software that you've",
  },
];

export default function ContactSales() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    workEmail: "",
    phoneNumber: "",
    companyName: "",
    attendeeCount: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      attendeeCount: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50/80 to-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - FAQ Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-valasys-gray-900 mb-2">
                Have a question?
              </h2>
              <p className="text-valasys-gray-600">
                We're here to help and answer any question you might have.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-valasys-blue mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-valasys-gray-900 mb-1">
                      {faq.title}
                    </h3>
                    <p className="text-sm text-valasys-gray-600">
                      {faq.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-valasys-gray-900 mb-1">
                Talk with our sales team
              </h3>
              <p className="text-sm text-valasys-gray-600">
                Let's schedule a chat.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                    First name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                    Last name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="h-10"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                    Work email
                  </label>
                  <Input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                    Phone number
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0123"
                    className="h-10"
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                  Company name
                </label>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="h-10"
                />
              </div>

              {/* Attendee Count */}
              <div>
                <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                  How many people will attend our chat?
                </label>
                <Select value={formData.attendeeCount} onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Please provide the required info" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 person</SelectItem>
                    <SelectItem value="2-3">2-3 people</SelectItem>
                    <SelectItem value="4-5">4-5 people</SelectItem>
                    <SelectItem value="6+">6+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-valasys-gray-700 mb-2">
                  How can our team help you?
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type message here..."
                  className="resize-none"
                  rows={4}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 h-10 border-valasys-blue text-valasys-blue hover:bg-blue-50"
                >
                  Schedule meeting
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-10 bg-valasys-blue hover:bg-blue-700 text-white"
                >
                  Let's talk
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
