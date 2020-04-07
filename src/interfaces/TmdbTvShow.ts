import { TmdbTvShowResultDTO } from './TmdbTvShowResultDTO';



export class TmdbTvShow {
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
    name: string; 

    constructor(tmdbTvShowResultDto: TmdbTvShowResultDTO) {
        this.id = tmdbTvShowResultDto.id;
        this.overview = tmdbTvShowResultDto.overview;
        this.poster_path = tmdbTvShowResultDto.poster_path;
        this.backdrop_path = tmdbTvShowResultDto.backdrop_path;
        this.video = tmdbTvShowResultDto.video;
        this.vote_average = tmdbTvShowResultDto.vote_average;
        this.vote_count = tmdbTvShowResultDto.vote_count;
        this.genre_ids = tmdbTvShowResultDto.genre_ids;
        this.popularity = tmdbTvShowResultDto.popularity;
        this.name = tmdbTvShowResultDto.name;
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