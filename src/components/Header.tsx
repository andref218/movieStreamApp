import SearchBar from "./SearchBar";
import { router } from "../routes/router";
import { useSearchStore } from "@/store/searchStore";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

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
        <div className="flex items-center gap-4">
          <SignedOut>
            <SearchBar />
            <div
              className="
                px-4 py-2 rounded bg-red-600 text-white font-semibold
                hover:bg-red-500 hover:scale-105 cursor-pointer
                active:scale-95 transition-transform duration-150
                inline-block ml-2"
            >
              <SignInButton mode="modal">Sign In</SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <SearchBar />
            <div className="ml-2 flex items-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
