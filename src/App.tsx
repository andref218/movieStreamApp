import "./App.css";
import Hero from "./components/Hero";
import Popular from "./components/Movies";
import { useSearchStore } from "./store/searchStore";

function App() {
  const results = useSearchStore((state) => state.results);
  console.log("Results", results);
  return (
    <div>
      <Hero />
      <Popular />
    </div>
  );
}

export default App;
