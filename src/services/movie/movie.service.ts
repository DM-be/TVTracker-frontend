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

    private dataLayer: DataLayer;

    constructor() {
        const dataLayerFactory = new ConcreteDataLayerFactory();
        this.dataLayer = dataLayerFactory.createDataLayer(environment.selectedDataLayer);
    }

    public addMovie(radarrMovie: RadarrMovie) {
        this.dataLayer.addMovie(radarrMovie);
    }

    public getMovies(): BehaviorSubject<RadarrMovie []> {
        return this.dataLayer.movies$;
    }

    public getMovie(tmdbId: number): RadarrMovie {
        return this.dataLayer.getMovie(tmdbId);
    }

    public async dataLayerInitialisation(): Promise<boolean> {
        return await this.dataLayer.initializedDataLayer$.toPromise();
    }


    private syncMovieCollection() {
        this.moviesLiveReplication = this.movieCollection.replicate.from(this.BACKEND_URL + 'movies', this.POUCH_LIVE_RETRY).on('change', (info) => {
          this.handleChangesFromRemotePouch(info);
        });
      }
}
