
import { TmdbMovieResultDTO } from './TmdbMovieResultDTO';
import { Movie } from './Movie';
import { TmdbMovieDetails } from './TmdbMovieDetails';


export class TmdbMovie implements Movie {
    title: string;
    tmdbId: number;
    overview: string;
    poster: string;
    backDrop: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    releaseDate: string;
    popularity: number;
    movieDetails?: TmdbMovieDetails;

    constructor(tmdbMovieResultDto: TmdbMovieResultDTO) {
        this.title = tmdbMovieResultDto.title;
        this.tmdbId = tmdbMovieResultDto.id;
        this.overview = tmdbMovieResultDto.overview;
        this.video = tmdbMovieResultDto.video;
        this.voteAverage = tmdbMovieResultDto.vote_average;
        this.releaseDate = tmdbMovieResultDto.release_date;
        this.voteCount = tmdbMovieResultDto.vote_count;
        this.popularity = tmdbMovieResultDto.popularity;
        this.setBackDrop(tmdbMovieResultDto.backdrop_path);
        this.setPoster(tmdbMovieResultDto.poster_path);

    }

    // todo: add further logic depending on screensize etc if needed (maybe later for tablets?)
    // https://www.themoviedb.org/talk/5a5bf3860e0a260d9d0013c5

    setPoster(posterPath: string): void {
        this.poster = `https://image.tmdb.org/t/p/w200${posterPath}`;
    }

    setBackDrop(backDropPath: string) {
        this.backDrop = `https://image.tmdb.org/t/p/w780${backDropPath}`;
    }

}