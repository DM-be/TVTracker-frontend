import { TmdbGenre } from './TmdbGenre';
import { TmdbTvShowSeason } from './TmdbTvShowSeason';

export interface TmdbTvShowDetailsDTO {
    backdrop_path?: string;
    episode_run_time: number [];
    first_air_date: string;
    in_production: boolean;
    last_air_date: string;
    name: string;
    seasons: TmdbTvShowSeason [];
    status: string;
    type:string;
    poster_path?: string;
    budget: number;
    genres: TmdbGenre [];
    id: number; 
    popularity: number;
    overview: string;
    vote_average: number;
    vote_count: number;
    next_episode_to_air?: any;

}
