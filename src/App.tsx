import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MovieCard from "./components/MovieCard";
import Popular from "./components/Movies";
import { useSearchStore } from "./store/searchStore";
import type { Movie } from "./types";

function App() {
  const results = useSearchStore((state) => state.results);
  console.log("Results", results);
  return (
    <div>
      <Header />
      {results.length > 0 ? (
        results.map((movie: Movie, index) => (
          <li
            key={movie.id}
            className="relative mt-8 p-8 px-6 md:px-25 grid grid-cols-fluid gap-6 "
          >
            <MovieCard movie={movie} position={index + 1} />
          </li>
        ))
      ) : (
        <div>
          <Hero />
          <Popular />
        </div>
      )}
    </div>
  );
}

export default App;
