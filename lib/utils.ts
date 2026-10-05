import type { Money } from "@/types";

export function formatEpisodeCode(season: number, episodeNumber: number): string {
  return `S${String(season).padStart(2, "0")}E${String(episodeNumber).padStart(2, "0")}`;
}

export function formatReleaseDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatPrice(money: Money): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: money.currencyCode,
  }).format(Number(money.amount));
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
