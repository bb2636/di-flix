export interface WishlistItem {
    movie_id: number;
    movie: {
      title: string;
      description?: string;
      views: number;
    };
  }
  