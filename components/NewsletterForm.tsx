"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <form
      className="flex w-full flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("done");
        setEmail("");
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@email.com"
        className="min-h-12 flex-1 rounded-full border border-border bg-card px-5 text-base text-foreground placeholder:text-muted-foreground"
      />
      <Button type="submit" variant="accent" size="lg">
        Join the list
      </Button>
      {status === "done" ? (
        <p className="sr-only" role="status">
          Thanks — newsletter signup placeholder received.
        </p>
      ) : null}
      {status === "done" ? (
        <p className="basis-full text-sm text-primary" aria-live="polite">
          Thanks! This is a placeholder form — connect your email provider later.
        </p>
      ) : null}
    </form>
  );
}
