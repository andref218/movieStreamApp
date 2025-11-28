import MovieList from "./MovieList";
import { useMovies } from "@/hooks/useMovies";

const Popular = () => {
  const { data: movies, isLoading, isError, error } = useMovies();

  return (
    <div className="px-10 mt-6">
      <h3 className="text-xl font-bold">Popular now:</h3>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : isError ? (
        <div className="text-red-500">Error: {error.message}</div>
      ) : movies && movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <div>No movies were found.</div>
      )}
    </div>
  );
};

export default Popular;
