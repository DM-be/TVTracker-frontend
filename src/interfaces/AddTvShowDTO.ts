import { AddOptions } from './AddOptions';
import { RadarrImage } from './RadarrImage';
import { SonarrSeason } from './SonarrSeason';
import { AddTvShowEpisode } from './AddTvShowEpisode';

export interface AddTvShowDTO {
    tvdbId: number; //used to lookup
    title: string;
    qualityProfileId: number;
    seasons: SonarrSeason []; 
    addOptions: AddOptions;
    episodes?: AddTvShowEpisode [];

    _deleted?: boolean;
    _id?: string;
}