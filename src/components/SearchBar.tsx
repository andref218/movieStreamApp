import { LucideSearch, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MOVIE_DATA from "../data/mockdata.json";
import type { Movie } from "@/types";

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function searchQuery(query: string) {
    console.log("Searching for", query);
    const results = MOVIE_DATA.results.filter((movie: Movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Results", results);
  }

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log("Search Query", query);
    searchQuery(query);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-2">
        {isVisible && (
          <div className="flex items-center bg-gray-800 text-white rounded overflow-hidden shadow">
            <LucideSearch className="ml-2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              onChange={handleChangeQuery}
              placeholder="Movie Title..."
              className="flex-1 bg-transparent px-2 py-1 text-white outline-none"
              autoFocus
            />
          </div>
        )}
        <button
          className="p-2 rounded text-white hover:bg-gray-800 active:scale-95 active:opacity-50 transition-transform cursor-pointer"
          aria-label="Toggle search input"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <LucideSearch size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
