import { RadarrImage } from './RadarrImage';

export interface PouchMovieDTO {
    title: string;
    overview: string;
    downloaded: boolean;
    monitored: boolean;
    tmdbId: number;
    radarrId: number; // TODO set in backend
    _id: string;
    _rev: string;
    images: RadarrImage [];
    _deleted?: boolean;

}