export interface TmdbTvShowResultDTO {
    id: number;
    overview: string;
    poster_path? : string;
    backdrop_path? : string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids?: number [];
    popularity: number;
    name: string;


}