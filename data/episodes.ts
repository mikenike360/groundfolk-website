import type { Episode } from "@/types";

export const episodes: Episode[] = [
  {
    id: "ep-s1e1",
    slug: "the-path",
    title: "The Path",
    season: 1,
    episodeNumber: 1,
    description:
      "A dirt path cuts through the tall grass and ends at a can with a door. There's a little mailbox. Nobody is on the path.",
    thumbnail: "/art/path.png",
    videoProvider: "youtube",
    videoId: "aqz-KE-bpKQ",
    duration: "11:24",
    releaseDate: "2025-03-14",
    featured: true,
  },
  {
    id: "ep-s1e2",
    slug: "can-house",
    title: "Can House",
    season: 1,
    episodeNumber: 2,
    description:
      "The can lies on its side in the weeds. A wooden step leads to a dark door. The label is peeling. Someone lives here.",
    thumbnail: "/art/can-house.png",
    videoProvider: "youtube",
    videoId: "LXb3EKWsInQ",
    duration: "12:02",
    releaseDate: "2025-03-21",
    featured: false,
  },
  {
    id: "ep-s1e3",
    slug: "the-nest",
    title: "The Nest",
    season: 1,
    episodeNumber: 3,
    description:
      "A pink worm stands in a twig nest, tied to the branch. The sky is empty and blue. The field below does not look helpful.",
    thumbnail: "/art/bird-nest.png",
    videoProvider: "vimeo",
    videoId: "76979871",
    duration: "10:48",
    releaseDate: "2025-03-28",
    featured: false,
  },
  {
    id: "ep-s1e4",
    slug: "dinosaur-era",
    title: "Dinosaur Era",
    season: 1,
    episodeNumber: 4,
    description:
      "Orange sun, purple palms, a long-neck dinosaur, and a cliff. It is not the apartment.",
    thumbnail: "/art/dinosaur-era.png",
    videoProvider: "youtube",
    videoId: "ScMzIvxBSi4",
    duration: "13:10",
    releaseDate: "2025-04-04",
    featured: false,
  },
  {
    id: "ep-s1e5",
    slug: "the-field",
    title: "The Field",
    season: 1,
    episodeNumber: 5,
    description:
      "A knight stands in the mud with a sword planted nearby. A cottage, a castle, and a sign about pints are all farther away than they look.",
    thumbnail: "/art/knight.png",
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
