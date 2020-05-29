import { AddMovieCommandOptions } from './../../interfaces/AddMovieCommandOptions';
import { TmdbMovie } from './../../interfaces/TmdbMovie';
import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { MovieService } from './../../services/movie/movie.service';
import { Command } from './Command';
import { RadarrImage } from 'src/interfaces/RadarrImage';
export class AddMovieCommand implements Command {

    
  
    constructor(private movieService: MovieService, private addMovieCommandOptions: AddMovieCommandOptions, private tmdbMovie: TmdbMovie) {
    }

    async execute(): Promise<void> {
        try {
            const radarrMovie = this.generateRaddarMovie(this.addMovieCommandOptions, this.tmdbMovie);
            await this.movieService.addMovie(radarrMovie);
        } catch (error) {
            console.log(error);
        }
        
    }

    generateRaddarMovie(addMovieCommandOptions: AddMovieCommandOptions, tmdbMovie: TmdbMovie): RadarrMovie {

        const { tmdbId, monitored, qualityProfileId, addOptions } = addMovieCommandOptions;
        const { overview, poster, backDrop } = tmdbMovie;
        const radarrImages: RadarrImage [] = [ {coverType: 'poster', url: '' } , {coverType: 'fanart', url: '' }];
        
        radarrImages[0].coverType = "poster";
        radarrImages[0].url = poster;
        radarrImages[1].coverType = "fanart"; // check backend if this is also backdrop
        radarrImages[1].url = backDrop;
        return {
            addOptions,
            downloaded: false,
            grabbed: false,
            images: radarrImages,
            monitored,
            tmdbId,
            qualityProfileId,
        } as RadarrMovie;
    }

}