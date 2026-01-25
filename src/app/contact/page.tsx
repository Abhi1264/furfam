"use client";
import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { breeds } from "@/lib/breeds-data";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Main Road, Ranchi, Jharkhand", "Pincode: 834001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 99343 46312"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@furfam.com"],
  },
  {
    icon: Clock,
    title: "Opening Hours",
    details: ["Mon - Fri: 9am - 7pm", "Sat - Sun: 10am - 5pm"],
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Breed Information",
  "Adoption Process",
  "Health & Care",
  "Scheduling a Visit",
  "Services & Pricing",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    breedName: "",
    gender: "",
    colour: "",
    coat: "",
    size: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = "919934346312";
    let message =
      `*New Contact Form Submission*\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Email:* ${formData.email}\n` +
      `*Phone:* ${formData.phone || "Not provided"}\n` +
      `*Inquiry Type:* ${formData.inquiryType}\n`;

    // Add breed information if "Breed Information" is selected
    if (formData.inquiryType === "Breed Information") {
      message += `*Interested in Breed:* ${formData.breedName || "Not specified"}\n`;
      message += `*Preferred Gender:* ${formData.gender || "Not specified"}\n`;
      message += `*Preferred Colour:* ${formData.colour || "Not specified"}\n`;
      message += `*Preferred Coat:* ${formData.coat || "Not specified"}\n`;
      message += `*Preferred Size:* ${formData.size || "Not specified"}\n`;
    }

    message += `\n*Message:*\n${formData.message}`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Get In Touch
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
                We&apos;d Love to Hear From You
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Have questions about a specific breed? Ready to start your
                adoption journey? Our friendly team is here to help you every
                step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <h2 className="mb-6 font-serif text-2xl font-bold text-card-foreground">
                    Send Us a Message
                  </h2>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                        Thank You!
                      </h3>
                      <p className="mb-6 max-w-md text-muted-foreground">
                        We&apos;ve received your message and will get back to
                        you within 24 hours. In the meantime, feel free to
                        explore our available breeds.
                      </p>
                      <Button asChild>
                        <Link href="/#breeds">Explore Breeds</Link>
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="inquiryType">Inquiry Type *</Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) =>
                              setFormData({ ...formData, inquiryType: value })
                            }
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Conditional Breed Information Fields */}
                      {formData.inquiryType === "Breed Information" && (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                          <div className="space-y-2">
                            <Label htmlFor="breedName">Breed Name *</Label>
                            <Select
                              value={formData.breedName}
                              onValueChange={(value) =>
                                setFormData({ ...formData, breedName: value })
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select breed" />
                              </SelectTrigger>
                              <SelectContent>
                                {breeds.map((breed) => (
                                  <SelectItem key={breed.id} value={breed.name}>
                                    {breed.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender">Preferred Gender *</Label>
                            <Select
                              value={formData.gender}
                              onValueChange={(value) =>
                                setFormData({ ...formData, gender: value })
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="No Preference">
                                  No Preference
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="colour">Preferred Colour</Label>
                            <Input
                              id="colour"
                              name="colour"
                              placeholder="e.g., Golden, Black, White"
                              value={formData.colour}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="coat">Preferred Coat Type</Label>
                            <Select
                              value={formData.coat}
                              onValueChange={(value) =>
                                setFormData({ ...formData, coat: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select coat type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Short">Short</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Long">Long</SelectItem>
                                <SelectItem value="No Preference">
                                  No Preference
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="size">Preferred Size</Label>
                            <Select
                              value={formData.size}
                              onValueChange={(value) =>
                                setFormData({ ...formData, size: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Toy">Toy</SelectItem>
                                <SelectItem value="Small">Small</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Large">Large</SelectItem>
                                <SelectItem value="Giant">Giant</SelectItem>
                                <SelectItem value="No Preference">
                                  No Preference
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="message">Description *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex gap-4 rounded-xl bg-secondary p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Map Placeholder */}
                <div className="aspect-video overflow-hidden rounded-xl bg-secondary">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987368715491!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="FurFam Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-card p-8 text-center shadow-sm md:flex-row md:text-left">
              <div>
                <h2 className="font-serif text-2xl font-bold text-card-foreground">
                  Looking for Quick Answers?
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Check out our frequently asked questions for immediate help.
                </p>
              </div>
              <Button size="lg" variant="outline" asChild>
                <Link href="/faqs">View FAQs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
