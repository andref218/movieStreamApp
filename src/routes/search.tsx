import { createFileRoute } from "@tanstack/react-router";
import type { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";
import { useSearchStore } from "../store/searchStore";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
});

function SearchComponent() {
  const { movie } = Route.useSearch();
  console.log("Search Query", movie);

  const results = useSearchStore((state) => state.results);
  console.log("Search Results", results);
  return (
    <div>
      {results.length > 0 ? (
        <ul className="mt-4 p-4 md:p-16 ml-8 grid grid-cols-fluid gap-6">
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
