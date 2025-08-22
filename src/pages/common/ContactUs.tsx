import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactUsValidationSchema } from "@/validations/contactUs.zod.validation";
import z from "zod";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useContactUsMutation } from "@/redux/features/auth/auth.api";

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
  const [contactUsFn, { isLoading }] = useContactUsMutation();
  const form = useForm<z.infer<typeof contactUsValidationSchema>>({
    resolver: zodResolver(contactUsValidationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactUsValidationSchema>) => {
    try {
      try {
        const res = await contactUsFn({ ...values }).unwrap();
        if (res.success) {
          toast.success("Message sent successfully!");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed to send message. Please try again later.");
      }
      form.reset();
    } catch {
      toast.error("Failed to send message. Please try again later.");
    }
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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@company.com" className="bg-white" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Subject" className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project, goals, or how we can help..."
                          className="bg-white min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit" className="w-full bg-primary cursor-pointer text-white">
                  {isLoading ? "Sending..." : "Submit"}
                </Button>
              </form>
            </Form>
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
