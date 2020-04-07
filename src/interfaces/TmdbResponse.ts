import { TmdbMovieResultDTO } from './TmdbMovieResultDTO';
import { TmdbTvShowResultDTO } from './TmdbTvShowResultDTO';



export interface TmdbResponse {
    page: number;
    results: any;
    total_results: number;
    total_pages: number;
} 