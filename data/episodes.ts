import type { Episode } from "@/types";

export const episodes: Episode[] = [
  {
    id: "ep-s1e1",
    slug: "the-first-spark",
    title: "The First Spark",
    season: 1,
    episodeNumber: 1,
    description:
      "A quiet town wakes up when a glowing seed of light falls into the Hollow. Pip discovers something strange — and the universe begins.",
    thumbnail: "/placeholders/ep-01.svg",
    videoProvider: "youtube",
    videoId: "aqz-KE-bpKQ",
    duration: "11:24",
    releaseDate: "2025-03-14",
    featured: true,
  },
  {
    id: "ep-s1e2",
    slug: "moss-and-memory",
    title: "Moss and Memory",
    season: 1,
    episodeNumber: 2,
    description:
      "Moss remembers a song nobody else can hear. When the forest starts answering back, the crew has to choose what to keep and what to let grow.",
    thumbnail: "/placeholders/ep-02.svg",
    videoProvider: "youtube",
    videoId: "LXb3EKWsInQ",
    duration: "12:02",
    releaseDate: "2025-03-21",
    featured: false,
  },
  {
    id: "ep-s1e3",
    slug: "spark-in-the-rain",
    title: "Spark in the Rain",
    season: 1,
    episodeNumber: 3,
    description:
      "A storm rolls through Hollowmere and Spark's powers go haywire. Can friendship hold when the sky won't settle?",
    thumbnail: "/placeholders/ep-03.svg",
    videoProvider: "vimeo",
    videoId: "76979871",
    duration: "10:48",
    releaseDate: "2025-03-28",
    featured: false,
  },
  {
    id: "ep-s1e4",
    slug: "nori-night-market",
    title: "Nori's Night Market",
    season: 1,
    episodeNumber: 4,
    description:
      "Nori opens a midnight stall of oddities. One deal too many, and the market starts selling things that shouldn't exist.",
    thumbnail: "/placeholders/ep-04.svg",
    videoProvider: "youtube",
    videoId: "ScMzIvxBSi4",
    duration: "13:10",
    releaseDate: "2025-04-04",
    featured: false,
  },
  {
    id: "ep-s1e5",
    slug: "bolt-of-belonging",
    title: "Bolt of Belonging",
    season: 1,
    episodeNumber: 5,
    description:
      "Bolt races ahead of everyone — until a challenge forces the crew to move as one. Season one closes with a spark of what's next.",
    thumbnail: "/placeholders/ep-05.svg",
    videoProvider: "youtube",
    videoId: "dQw4w9WgXcQ",
    duration: "14:33",
    releaseDate: "2025-04-11",
    featured: false,
  },
];

export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((episode) => episode.slug === slug);
}

export function getFeaturedEpisode(): Episode {
  return episodes.find((episode) => episode.featured) ?? episodes[0];
}

export function getLatestEpisode(): Episode {
  return [...episodes].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  )[0];
}

export function getEpisodesBySeason(): Record<number, Episode[]> {
  return episodes.reduce<Record<number, Episode[]>>((acc, episode) => {
    const list = acc[episode.season] ?? [];
    list.push(episode);
    acc[episode.season] = list.sort((a, b) => a.episodeNumber - b.episodeNumber);
    return acc;
  }, {});
}

export function getAdjacentEpisodes(slug: string): {
  previous?: Episode;
  next?: Episode;
} {
  const ordered = [...episodes].sort((a, b) => {
    if (a.season !== b.season) return a.season - b.season;
    return a.episodeNumber - b.episodeNumber;
  });
  const index = ordered.findIndex((episode) => episode.slug === slug);
  if (index === -1) return {};
  return {
    previous: ordered[index - 1],
    next: ordered[index + 1],
  };
}

export function getRelatedEpisodes(slug: string, limit = 3): Episode[] {
  const current = getEpisodeBySlug(slug);
  if (!current) return episodes.slice(0, limit);
  return episodes
    .filter((episode) => episode.slug !== slug && episode.season === current.season)
    .slice(0, limit);
}
