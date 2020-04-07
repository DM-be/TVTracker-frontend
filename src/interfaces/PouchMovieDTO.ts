import { RadarrImage } from './RadarrImage';

export interface PouchMovieDTO {
    title: string;
    overview: string;
    downloaded: boolean;
    monitored: boolean;
    tmdbId: number;
    id: number;
    _id: string;
    _rev: string;
    images: RadarrImage [];
    _deleted?: boolean;

}