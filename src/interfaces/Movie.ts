

export interface Movie {
    title: string;
    tmdbId: number;
    overview: string;
    poster: string;
    backDrop: string;
    setPoster(posterPath: string): void;
    setBackDrop(backDropPath: string): void;
}