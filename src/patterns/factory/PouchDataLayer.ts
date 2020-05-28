import { environment } from './../../environments/environment.prod';
import { PouchDB } from 'pouchdb';
import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { BehaviorSubject } from 'rxjs';
import { DataLayer } from './DataLayer';
import { Movie } from 'src/interfaces/Movie';

export class PouchDataLayer extends DataLayer {


    private movieCollection: PouchDB;
    private moviesLiveReplication: any;

    private BACKEND_URL = environment.BACKEND_URL;
    private POUCH_LIVE_RETRY = { live: true};


    addMovie(tmdbId: number): Promise<void> {





        throw new Error('Method not implemented.'); 
    }
    removeMovie(tmdbId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updateMovie(tmdbId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }


    async initializeMovies(): Promise<BehaviorSubject<RadarrMovie[]>> {
        this.movieCollection = new PouchDB('movieCollection.db', {adapter: 'cordova-sqlite'}); // {adapter:'cordova-sqlite'})
        this.syncMovieCollection();
        return new BehaviorSubject(await this.getMoviesInMovieCollection());
    }

    initializeTvShows(): Promise<BehaviorSubject<object[]>> {
        throw new Error('Method not implemented.');
    }


    public getMovie(tmdbId: number): RadarrMovie {
        const movies = this.movies$.getValue();
        const i = movies.findIndex(m => m.tmdbId === tmdbId);
        if (i !== -1) {
          return movies[i];
        }
    }

    movieIsInCollection(tmdbId: number): boolean {
        const movie = this.getMovie(tmdbId);
        if (movie) {
            return true;
        }
        return false;
    }

  async getMoviesInMovieCollection(): Promise<RadarrMovie []> {
    try {
      const allDocs = await this.movieCollection.allDocs({include_docs: true});
      const radarrMovies: RadarrMovie [] = [];
      allDocs.rows.forEach(doc => radarrMovies.push(doc.doc as RadarrMovie));
      return radarrMovies;
    } catch (error) {
      console.log(error);
    }
  }

  private syncMovieCollection() {
    this.moviesLiveReplication = this.movieCollection.sync(this.BACKEND_URL + 'movies', this.POUCH_LIVE_RETRY).on('change', (info) => {
      this.handleRemoteMovieChanges(info);
    });
  }

  private async handleRemoteMovieChanges(info: any) {
    const changedDocsFromRemote = info.docs as RadarrMovie [];
    changedDocsFromRemote.forEach( async (radarrMovie: RadarrMovie) => {
    const movies = this.movies$.getValue();
    if (radarrMovie._deleted) {
        const removedIndex = movies.findIndex(m => m.tmdbId === radarrMovie.tmdbId);
        this.movies$.next(movies.splice(removedIndex, 1));
        return;
      }
    const updatedMovieIndex = movies.findIndex(m => m.tmdbId === radarrMovie.tmdbId);
    if (updatedMovieIndex !== -1) {
        Object.assign(movies[updatedMovieIndex], radarrMovie);
        this.movies$.next(movies);
      } else {
        movies.unshift(radarrMovie);
        this.movies$.next(movies);
      }
    });
  }



}
