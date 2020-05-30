import { TmdbMovie } from './../../interfaces/TmdbMovie';
import { AddMovieCommandOptions } from './../../interfaces/AddMovieCommandOptions';
import { DatalayerService } from './../datalayer/datalayer.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { ConcreteDataLayerFactory } from '../../patterns/factory/ConcreteDataLayerFactory';
import { Injectable } from '@angular/core';
import { DataLayer } from 'src/patterns/factory/DataLayer';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { Movie } from 'src/interfaces/Movie';
import { first } from 'rxjs/operators';
import { AddMovieCommand } from 'src/patterns/command/AddMovieCommand';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


    private dataLayer: DataLayer;

    constructor(private dataLayerService: DatalayerService) {
        this.dataLayer = dataLayerService.dataLayer;
    }

    public async addMovie(addMovieCommandOptions: AddMovieCommandOptions, tmdbMovie: TmdbMovie): Promise<void> {
        try {
            const command = new AddMovieCommand(addMovieCommandOptions, tmdbMovie, this.dataLayer );
            await command.execute();
        } catch (error) {
            console.log(error);
        }
    }

    public getMoviesSubject(): BehaviorSubject<RadarrMovie []> {
        return this.dataLayer.movies$;
    }

    public getMovie(tmdbId: number): RadarrMovie {
        return this.dataLayer.getMovie(tmdbId);
    }

    public dataLayerInitialisation(): BehaviorSubject<boolean> {
        return this.dataLayer.initializedDataLayer$;
    }

    public isInCollection(tmdbId: number): boolean {
        return this.dataLayer.movieIsInCollection(tmdbId);
    }



}
