import { TmdbMovieResultDTO } from './TmdbMovieResultDTO';


export class TmdbMovie {
    title: string;
    id: number;
    overview: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    release_date: string;
    genre_ids: number [];
    popularity: number
    poster_path? : string;
    backdrop_path? : string;
    poster?: string;
    backdrop?: string;
    inCollectionOrInBuffered?: boolean;

    constructor(tmdbMovieResultDto: TmdbMovieResultDTO) {
        this.title = tmdbMovieResultDto.title;
        this.id = tmdbMovieResultDto.id;
        this.overview = tmdbMovieResultDto.overview;
        this.poster_path = tmdbMovieResultDto.poster_path;
        this.backdrop_path = tmdbMovieResultDto.backdrop_path;
        this.video = tmdbMovieResultDto.video;
        this.vote_average = tmdbMovieResultDto.vote_average;
        this.vote_count = tmdbMovieResultDto.vote_count;
        this.genre_ids = tmdbMovieResultDto.genre_ids;
        this.popularity = tmdbMovieResultDto.popularity;
        this.setPoster();
        this.setBackdrop();

    }


    // todo: add further logic depending on screensize etc if needed (maybe later for tablets?)
    // https://www.themoviedb.org/talk/5a5bf3860e0a260d9d0013c5

    private setPoster() {
        if(this.poster_path)
        {
            this.poster = `https://image.tmdb.org/t/p/w200${this.poster_path}`;
        }
    }

    private setBackdrop() {
        if(this.backdrop_path)
        {
            this.backdrop = `https://image.tmdb.org/t/p/w780${this.backdrop_path}`;
        }
    }

    public getPoster() {
        return this.poster;
    }

    public getBackdrop() {
        return this.backdrop;
    }

}