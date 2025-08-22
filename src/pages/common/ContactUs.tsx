import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const cards = [
  {
    id: "email",
    title: "Email",
    subtitle: "Get a response within 24 hours",
    detail: "hello@company.com",
    Icon: Mail,
  },
  {
    id: "chat",
    title: "Live Chat",
    subtitle: "Instant support available now",
    detail: "Start chatting",
    Icon: MessageCircle,
  },
  {
    id: "phone",
    title: "Phone",
    subtitle: "Mon-Fri 9AM-6PM EST",
    detail: "+1 (555) 123-4567",
    Icon: Phone,
  },
  {
    id: "office",
    title: "Office",
    subtitle: "Schedule an in-person meeting",
    detail: "123 Innovation St, Tech City",
    Icon: MapPin,
  },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Message sent successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ready to start your next project? Our team is here to help you succeed. Reach out and let's discuss how we
            can bring your ideas to life.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Contact Methods (rendered dynamically) */}
          <div className="space-y-6">
            {/* define an array of contact methods and map over it */}
            {cards.map((method) => {
              const Icon = method.Icon as React.ComponentType<React.SVGProps<SVGSVGElement>>;
              return (
                <Card key={method.id} className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-white p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                        {method.subtitle && <p className="text-sm text-gray-600 mb-2">{method.subtitle}</p>}
                        <p className="text-gray-900 font-medium">{method.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Send us a message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <Input placeholder="John" className="bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <Input placeholder="Doe" className="bg-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <Input placeholder="john@company.com" className="bg-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <Input placeholder="Subject" className="bg-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <Textarea
                  placeholder="Tell us about your project, goals, or how we can help..."
                  className="bg-white min-h-[100px]"
                />
              </div>

              <Button disabled={isLoading} type="submit" className="w-full bg-primary  cursor-pointer text-white">
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </form>
            <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-gray-200 text-sm mt-10">
              {/* Office Hours */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="text-sm">
                <h3 className=" font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-900">hello@OopsiPAY.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone</span>
                    <span className="text-gray-900">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address</span>
                    <span className="text-gray-900">123 Innovation St, Tech City</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
      </div>
    </div>
  );
}
