import MovieList from "./MovieList";

import MOVIE_DATA from "../data/mockdata.json";

const Popular = () => {
  return (
    <div className="px-10 mt-6">
      <h3 className="text-xl font-bold">Popular now:</h3>
      <div>
        {MOVIE_DATA.results.length > 0 ? (
          <MovieList movies={MOVIE_DATA.results}></MovieList>
        ) : (
          <div>No movies were founded</div>
        )}
      </div>
    </div>
  );
};

export default Popular;
