import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Hollowmere",
  tagline: "An independent animated series about light, friendship, and strange little towns.",
  description:
    "Hollowmere is a handcrafted cartoon universe following Pip and friends as a glowing spark remakes their quiet town. New episodes, character lore, and official merch — built for an independent series.",
  creator: {
    name: "Studio Placeholder",
    bio: "An independent animation team building Hollowmere episode by episode. Replace this with your real studio story, process, and links.",
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
