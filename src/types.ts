// 1. Define o tipo do Movie
export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

// 2. Tipar as props do componente
export interface MovieListProps {
  movies: Movie[];
}

export interface MovieCardProps {
  movie: Movie;
  position: number;
}
