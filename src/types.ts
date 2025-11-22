// 1. Define o tipo do Movie
export type Movie = {
  id: number;
  title: string;
};

// 2. Tipar as props do componente
export interface MovieListProps {
  movies: Movie[];
}
