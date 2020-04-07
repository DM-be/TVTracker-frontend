import { TmdbTvShowEpisode } from './TmdbTvShowEpisode';

export interface TmdbTvShowSeasonDetailed {
    air_date: string;
    episodes: TmdbTvShowEpisode [];
    id: number;
    poster_path?: string;
    season_number: number;
}