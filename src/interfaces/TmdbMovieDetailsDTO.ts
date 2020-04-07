import { TmdbGenre } from './TmdbGenre';

export interface TmdbMovieDetailsDTO {

    backdrop_path?: string;
    poster_path?: string;
    budget: number;
    genres: TmdbGenre [];
    id: number; 
    popularity: number;
    imdb_id?: string;
    overview?: string;
    release_date: string;
    revenue: number;
    runtime?: number;
    tagline?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    title: string;

}

