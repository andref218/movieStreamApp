import { create } from "zustand";
import type { Movie } from "@/types";
import MOVIE_DATA from "@/data/mockdata.json";

export interface SearchStore {
  query: string;
  results: Movie[];
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  results: [],
  setQuery: (q: string) => {
    // Filter results when the query changes
    const results =
      q.trim().length === 0
        ? []
        : MOVIE_DATA.results.filter((movie: Movie) =>
            movie.title.toLowerCase().includes(q.toLowerCase())
          );

    set({ query: q, results: results });
    console.log("Results", results);
  },
}));
