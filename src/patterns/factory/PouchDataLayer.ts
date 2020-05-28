import { environment } from './../../environments/environment.prod';
import { PouchDB } from 'pouchdb';
import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { BehaviorSubject } from 'rxjs';
import { DataLayer } from './DataLayer';
import { Movie } from 'src/interfaces/Movie';

export class PouchDataLayer extends DataLayer {
 

    private movieCollection: PouchDB;
    private tvShowCollection: PouchDB;
    private BACKEND_URL = environment.BACKEND_URL;
    private POUCH_LIVE_RETRY = { live: true};
  
    initializeTvShows(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    onInit(): void {
        throw new Error("Method not implemented.");
    }
  
    initializeMovies(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addMovie(tmdbId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    removeMovie(tmdbId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateMovie(tmdbId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public getMovie(tmdbId: number): RadarrMovie {
        const movies = this.movies$.getValue();
        const i = movies.findIndex(m => m.tmdbId === tmdbId);
        if(i !== -1)
        {
          return movies[i];
        }
    }
    getMovies(): BehaviorSubject<RadarrMovie[]> {
        return this.movies$;
    }


    movieIsInCollection(tmdbId: number): boolean {
        const movie = this.getMovie(tmdbId);
        if (movie)
        {
            return true;
        }
        return false;
    }

}
