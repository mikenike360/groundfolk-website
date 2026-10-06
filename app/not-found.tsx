import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">404</p>
      <h1 className="mt-4 font-display text-4xl">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        That episode, character, or product doesn&apos;t exist yet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Home</Button>
        <Button href="/watch" variant="outline">
          Watch
        </Button>
      </div>
      <p className="mt-8 text-sm">
        <Link href="/store" className="text-primary hover:underline">
          Or browse the store
        </Link>
      </p>
    </div>
  );
}
