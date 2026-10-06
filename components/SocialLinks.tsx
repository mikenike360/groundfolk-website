import Link from "next/link";
import { siteConfig } from "@/data/site";

const socialEntries = Object.entries(siteConfig.social).filter(
  (entry): entry is [string, string] => Boolean(entry[1]),
);

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {socialEntries.map(([network, href]) => (
        <li key={network}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-[var(--radius)] border-[3px] border-border bg-card px-4 py-2 text-sm font-medium capitalize text-foreground shadow-[var(--shadow-soft)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:text-accent hover:shadow-none"
          >
            {network}
          </Link>
        </li>
      ))}
    </ul>
  );
}
