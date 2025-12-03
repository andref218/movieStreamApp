import { createFileRoute } from "@tanstack/react-router";
import type { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/hooks/useMovies";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/Pagination";

export const Route = createFileRoute("/search")({
  component: SearchComponent,
});

function SearchComponent() {
  const { query } = Route.useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [page, setPage] = useState(1);

  console.log("Search Query", query);

  //Using to make debounce in search query (this prevents spam from reaching the server and improves performance)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 500); // 0.5s debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const { data, isLoading, error, isFetching } = useMovies(
    debouncedQuery || "",
    page
  );

  const results = data?.results ?? [];
  const totalPages = data?.total_pages ?? 1;

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
    <div className="w-full px-4 mt-4">
      {query && (
        <h2 className="text-xl font-semibold mb-4 ml-3">
          Search results for <span className="">"{debouncedQuery}"</span>
        </h2>
      )}
      {results.length > 0 ? (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 justify-items-center">
            {results.map((movie: Movie, index) => (
              <li key={movie.id} className="relative">
                <MovieCard movie={movie} position={index + 1} />
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
          {isFetching && page !== data?.page && (
            <p className="w-full h-48 flex items-center justify-center text-white text-xl">
              Loading next page...
            </p>
          )}
        </>
      ) : (
        <div className="w-full h-48 flex items-center justify-center text-white text-xl">
          No results found.
        </div>
      )}
    </div>
  );
}
