import type { MoviesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

//const API_URL =
//"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

export function useMovies(query?: string, page: number = 1) {
  return useQuery({
    queryKey: query ? ["movies", query, page] : ["popular-movies", page],
    queryFn: async (): Promise<MoviesResponse> => {
      const API_URL = query
        ? `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${encodeURIComponent(query)}&page=${page}`
        : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;
      const response = await fetch(API_URL, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      return {
        results: data.results,
        page: data.page,
        total_pages: data.total_pages,
      }; // <-- This is what the other components will use
    },
    // Data stays fresh for 5 minutes → prevents refetching and improves performance
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
  });
}
