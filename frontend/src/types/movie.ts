export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
  release_date?: string;
  vote_average?: number;
  trailerKey?: string;
  genre_ids?: number[];
  watchTime?: number;
}

export interface WatchHistory {
  user_id: number;
  movie_id: number;
  watchTime: number;
  timestamp: string;
  movie: Movie;
}
