export interface UpdateMovieDTO {
    monitored?: boolean;
    downloaded?: boolean;
    radarrId: number;
    tmdbId: number;
}