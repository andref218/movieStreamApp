import { LucideSearch } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useSearchStore } from "../store/searchStore";
import { router } from "../routes/router";

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Query and setter from Zustand
  const query = useSearchStore((state) => state.query);
  const setQuery = useSearchStore((state) => state.setQuery);

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log("Search Query", query);
    setQuery(value);

    if (value.trim() === "") {
      router.navigate({ to: "/" });
      return;
    }

    router.navigate({
      to: "/search",
      search: { query: value },
    });
  };

  //If user click outside the input box, box disappear
  //If there's text in the input box, the input stays on the Screen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside =
        containerRef.current &&
        !containerRef.current.contains(event.target as Node);

      const hasText = inputRef.current && inputRef.current.value.trim() !== "";

      if (clickedOutside && !hasText) {
        // Only closes if input is empty
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
          <div className="flex items-center bg-gray-800 text-white rounded overflow-hidden shadow flex-1 ml-2 min-w-0 max-w-full">
            <LucideSearch className="ml-2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              ref={inputRef}
              value={query}
              onChange={handleChangeQuery}
              placeholder="Movie Title..."
              className="flex-1 bg-transparent px-2 py-1 text-white outline-none"
              autoFocus
            />
          </div>
        )}

        {query.trim().length === 0 && (
          <button
            className="p-2 rounded text-white hover:bg-gray-800 active:scale-95 active:opacity-50 transition-transform cursor-pointer"
            aria-label="Toggle search input"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          >
            <LucideSearch size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
