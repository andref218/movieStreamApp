export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
};

export interface MovieListProps {
  movies: Movie[];
}

export interface MovieCardProps {
  movie: Movie;
  position: number;
}

export type MoviesResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
};
