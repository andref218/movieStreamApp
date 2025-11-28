import type { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";

const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;

//const API_URL =
//"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

export function useMovies(query?: string) {
  return useQuery({
    queryKey: query ? ["movies", query] : ["popular-movies"],
    queryFn: async (): Promise<Movie[]> => {
      const API_URL = query
        ? `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${encodeURIComponent(query)}`
        : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
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
      return data.results; // <-- This is what the other components will use
    },
    // Data stays fresh for 5 minutes → prevents refetching and improves performance
    staleTime: 1000 * 60 * 5,
  });
}
