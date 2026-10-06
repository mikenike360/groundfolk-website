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
        className="min-h-12 flex-1 rounded-[var(--radius)] border-[3px] border-border bg-card px-5 text-base text-foreground placeholder:text-muted-foreground"
      />
      <Button type="submit" variant="accent" size="lg">
        Join the list
      </Button>
      {status === "done" ? (
        <p className="sr-only" role="status">
          Got it. We'll write when there's something new on the TV.
        </p>
      ) : null}
      {status === "done" ? (
        <p className="basis-full text-sm text-primary" aria-live="polite">
          Got it. We'll write when there's something new on the TV.
        </p>
      ) : null}
    </form>
  );
}
