import { Card } from "@/components/ui/card";
import type { MovieCardProps } from "@/types";
const TMDB_IMAGES_ASSET_URL = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all 
    duration-300 hover:scale-105 hover:shadow-xl outline-blue-200 p-0 border-0 
    w-[8rem] h-[11rem] sm:w-[11rem] sm:h-[15rem] rounded-sm "
    >
      <img
        src={
          movie?.poster_path
            ? TMDB_IMAGES_ASSET_URL + movie?.poster_path
            : "placeholder.svg"
        }
        alt={movie?.title}
        className="w-full h-full object-cover transition-transform 
        duration-300 group-hover:scale-100 z-10"
      />
      <div
        className="
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-black/50 to-transparent
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          z-20
          p-2
        "
      >
        <p className="text-white text-sm sm:text-base font-bold text-center">
          {movie?.title}
        </p>
      </div>
    </Card>
  );
};

export default MovieCard;
