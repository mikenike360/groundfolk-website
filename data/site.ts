import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "ground folk",
  tagline: "A hand-drawn cartoon about a messy apartment and the weird places past the path.",
  description:
    "ground folk follows Wizard, Bug, Horn, and Worm from the couch to a can in the weeds, a nest in a tree, and a sky with a dinosaur in it.",
  creator: {
    name: "Matthew Venema",
    bio: "Matthew Venema draws ground folk by hand: thick outlines, flat color, and whatever is on the floor.",
  },
  contactEmail: "hello@example.com",
  social: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    tiktok: "https://tiktok.com",
    discord: "https://discord.com",
  },
};

export const navLinks = [
  { href: "/watch", label: "Watch" },
  { href: "/characters", label: "Characters" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
] as const;
