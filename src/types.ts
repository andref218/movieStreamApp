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

export type Video = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string; // The YouTube or other platform video code
  name: string; // Name of the video/trailer
  site: string; // "YouTube", "Vimeo", etc.
  size: number; // Video resolution/size (e.g., 1080)
  type: string; // "Trailer", "Teaser", etc.
  official: boolean; // Whether the video is official
  published_at: string;
};
