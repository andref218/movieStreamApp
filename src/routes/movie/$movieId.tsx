import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
const token = import.meta.env.VITE_TMDB_AUTH_TOKEN;
import type { Video } from "@/types";

export const Route = createFileRoute("/movie/$movieId")({
  component: MoviePage,
});

function MoviePage() {
  const { movieId } = Route.useParams(); //use the URL param movieID and put here
  const [showTrailer, setShowTrailer] = useState(false);
  const trailerRef = useRef<HTMLDivElement>(null);

  const {
    data: movie,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch movie");

      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  // Fetch movie videos (trailers)
  const { data: videos } = useQuery<Video[]>({
    queryKey: ["movie-videos", movieId],
    queryFn: async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      return data.results;
    },
    enabled: !!movieId,
  });

  // Get first YouTube trailer
  const trailer = videos?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );

  //If user click outside the trailer box, trailer box disappear
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        trailerRef.current &&
        !trailerRef.current.contains(event.target as Node)
      ) {
        setShowTrailer(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="relative w-full min-h-[40vh]">
      {/* Blurry background */}
      {movie.backdrop_path && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px) brightness(50%)",
            zIndex: 0,
          }}
        />
      )}

      {/* Main*/}
      <div className="relative z-10 max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-6 md:items-center">
        {/* Movie Poster */}
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/4 lg:w-1/5 rounded-lg shadow-lg object-cover transition-all 
    duration-300 hover:scale-101"
          />
        )}

        {/* Movie Info */}
        <div className="flex-1 flex flex-col justify-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {movie.title}
            </h1>

            <p className=" mb-4 line-clamp-5 md:line-clamp-6">
              {movie.overview}
            </p>

            <p className="text-lg mb-4">
              Rating: <span className=" font-bold">{movie.vote_average}</span>
            </p>
          </div>

          {/* Trailer Button */}
          {trailer && (
            <div className="mt-5 flex justify-center md:justify-start">
              <button
                className="bg-red-600 hover:bg-red-700 border-0 rounded-md text-white px-5 py-2 w-max text-lg 
              font-semibold cursor-pointer inline-flex items-center gap-2 transition-all duration-300 
              ease-out shadow-lg shadow-red-600/30 justify-center hover:-translate-y-0.5 
              hover:shadow-xl hover:shadow-red-600/50 focus-visible:outline-2 
              focus-visible:outline-white/80 focus-visible:outline-offset-2 active:translate-y-0 group"
                onClick={() => setShowTrailer(true)}
              >
                Watch Trailer
              </button>
            </div>
          )}

          {/* Modal Trailer */}
          {showTrailer && trailer && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
              <div ref={trailerRef} className="relative w-full max-w-4xl p-4">
                <button
                  className="absolute top-3 right-3 text-white text-3xl font-bold hover:text-gray-300 transition cursor-pointer"
                  onClick={() => setShowTrailer(false)}
                >
                  &times;
                </button>
                <iframe
                  className="w-full aspect-video rounded-lg shadow-2xl"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
