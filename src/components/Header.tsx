import SearchBar from "./SearchBar";
import { router } from "../routes/router";
import { useSearchStore } from "@/store/searchStore";

const Header = () => {
  const setQuery = useSearchStore((state) => state.setQuery);

  const handleClickHome = () => {
    // Clears Search Input
    setQuery("");
    // Goes to HomePage
    router.navigate({ to: "/" });
  };
  return (
    <header
      className="relative top-0 left-0 right-0 z-[100] 
      py-5 bg-gradient-to-b from-black/70 via-black/30 
      to-transparent"
    >
      <div className="flex justify-between items-center px-10">
        <div className="flex-shrink-0">
          <h1
            onClick={handleClickHome}
            className="text-xl lg:text-4xl font-bold text-red-600 cursor-pointer"
          >
            CineFlow
          </h1>
        </div>
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
