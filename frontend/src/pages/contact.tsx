import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: replace with your backend email API or Web3 message handler
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-4 text-neutral-800">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 text-neutral-800">
              Get in Touch
            </h2>
            <p className="text-neutral-600 mb-6">
              Have a question about our tokenized hotels, platform integrations,
              or partnership opportunities? Reach out — we’d love to hear from you.
            </p>

            <div className="space-y-3 text-neutral-700">
              <p>
                📍 <strong>Address:</strong> 88 Token Street, Singapore 048583
              </p>
              <p>
                ✉️ <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@x402platform.com"
                  className="text-blue-600 hover:underline"
                >
                  support@x402platform.com
                </a>
              </p>
              <p>
                🌐 <strong>Website:</strong>{" "}
                <a
                  href="https://digirealassets.io"
                  className="text-blue-600 hover:underline"
                >
                    digirealassets.io
                </a>
              </p>
            </div>

            <div className="mt-6 flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                className="text-neutral-600 hover:text-blue-600"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                className="text-neutral-600 hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href="https://discord.gg/"
                target="_blank"
                className="text-neutral-600 hover:text-blue-600"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
