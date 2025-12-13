"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawPrint } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-background">
            <PawPrint className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-bold md:text-3xl text-balance">
            Subscribe & Get Updates
          </h2>
          <p className="mx-auto mt-3 max-w-md text-primary-foreground/90 leading-relaxed">
            Join our newsletter for exclusive pet care tips, new breed
            announcements, and special offers for FurFam members.
          </p>

          {subscribed ? (
            <div className="mt-6 rounded-lg bg-background/10 p-4">
              <p className="font-medium">
                Thanks for subscribing! Check your inbox for a welcome gift.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 flex-1 border-0 bg-background text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="h-12 bg-foreground text-background hover:bg-foreground/90"
              >
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
