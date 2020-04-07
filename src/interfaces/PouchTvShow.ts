import { RadarrImage } from './RadarrImage';
import { SonarrSeason } from './SonarrSeason';

export interface PouchTvShow {
    title: string;
    seasonCount: number;
    status: string;
    overview: string;
    seasons: SonarrSeason [];
    year: number;
    tvdbId: number;
    runTime: number;
    firstAired: string;
    genres: string [];
    images: RadarrImage [];
    id: number;

    _id: string;
    _rev?: string;
    grabbed?: boolean; // gets set by webhook
}