import { createFileRoute } from "@tanstack/react-router";
import type { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/hooks/useMovies";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
});

function SearchComponent() {
  const { query } = Route.useSearch();
  console.log("Search Query", query);

  const { data: results = [], isLoading, error } = useMovies(query || "");

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-white text-xl">
        Error fetching movies.
      </div>
    );
  }

  console.log("Search Results", results);
  return (
    <div>
      {results.length > 0 ? (
        <ul className="flex overflow-x-scroll overflow-y-visible space-x-11 px-4 md:px-6 py-4 scrollbar-hide relative">
          {results.map((movie: Movie, index) => (
            <li key={movie.id} className="relative">
              <MovieCard movie={movie} position={index + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-48 flex items-center justify-center text-white text-xl">
          No results found.
        </div>
      )}
    </div>
  );
}
