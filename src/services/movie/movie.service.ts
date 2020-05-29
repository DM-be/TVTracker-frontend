import { DatalayerService } from './../datalayer/datalayer.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { ConcreteDataLayerFactory } from '../../patterns/factory/ConcreteDataLayerFactory';
import { Injectable } from '@angular/core';
import { DataLayer } from 'src/patterns/factory/DataLayer';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { Movie } from 'src/interfaces/Movie';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {



    constructor(private dataLayerService: DatalayerService) {

    }

    public async addMovie(radarrMovie: RadarrMovie): Promise<void> {
        try {
            await this.dataLayerService.dataLayer.addMovie(radarrMovie);
        } catch (error) {
            console.log(error);
        }
       
    }

    public getMoviesSubject(): BehaviorSubject<RadarrMovie []> {
        return this.dataLayerService.dataLayer.movies$;
    }

    public getMovie(tmdbId: number): RadarrMovie {
        return this.dataLayerService.dataLayer.getMovie(tmdbId);
    }

    public async dataLayerInitialisation(): Promise<boolean> {
        return await this.dataLayerService.dataLayer.initializedDataLayer$.toPromise();
    }

    public isInCollection(tmdbId: number): boolean {
        return this.dataLayerService.dataLayer.movieIsInCollection(tmdbId);
    }



}
