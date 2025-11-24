import type { Movie, MovieListProps } from "../types";
import MovieCard from "./MovieCard";
const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="relative">
      <ul className="flex overflow-x-scroll overflow-y-visible space-x-11 px-4 md:px-6 py-4 scrollbar-hide relative">
        {movies.map((movie: Movie, index) => (
          <li key={movie.id} className="relative">
            <MovieCard movie={movie} position={index + 1} />
            {/* Position number of the movie */}
            <span
              className="
                absolute -left-3 bottom-0
                text-black text-[4.4rem] font-extrabold leading-none
                select-none pointer-events-none
                z-30
            "
              style={{
                textShadow: `
                    -3px -3px 0 #fff,
                    3px -3px 0 #fff,
                    -3px 3px 0 #fff,
                    3px 3px 0 #fff,
                    0 -3px 0 #fff,
                    0 3px 0 #fff,
                    -3px 0 0 #fff,
                     3px 0 0 #fff
                `,
              }}
            >
              {index + 1}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
