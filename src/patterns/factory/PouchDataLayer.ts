import { environment } from './../../environments/environment.prod';
import { PouchDB } from 'pouchdb';
import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { BehaviorSubject } from 'rxjs';
import { DataLayer } from './DataLayer';
import { Movie } from 'src/interfaces/Movie';

export class PouchDataLayer extends DataLayer {


    private movieCollection: PouchDB;
    private movieReplication: any;

    private BACKEND_URL = environment.BACKEND_URL;
    private POUCH_LIVE_RETRY = { live: true};


    public async addMovie(radarrMovie: RadarrMovie): Promise<void> {
      try {
        radarrMovie._id = radarrMovie.tmdbId.toString();
        await this.movieCollection.put(radarrMovie);
        const movies = this.movies$.getValue();
        movies.unshift(radarrMovie);
        this.movies$.next(movies);
        } catch (error) {
          console.log(`unable to add movie to collection: ${error}`);
        }
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

    public movieIsInCollection(tmdbId: number): boolean {
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
    this.connectedToLocalNetwork$.subscribe((connected) => {
        if(connected)
        {
        this.movieReplication = this.movieCollection.sync(this.BACKEND_URL + 'movies', this.POUCH_LIVE_RETRY)
        .on('change', info => this.handleRemoteMovieChanges(info));
        }
         else if (!connected) { // ignore the first undefined --> refactor with rxjs course (take first defined value)
            this.cancelReplication();
         }

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
        const updatedMovie = Object.assign(movies[updatedMovieIndex], radarrMovie) as RadarrMovie;
        movies[updatedMovieIndex] = updatedMovie;
        this.movies$.next(movies);
      } else {
        movies.unshift(radarrMovie);
        this.movies$.next(movies);
      }
    });
  }


  private async cancelReplication(): Promise<void> {
    try {
      await this.movieReplication.cancel();
      console.log("cancelled the live replication because we lost ssid access");
    } catch (error) {
      console.log(error);
    }
  }

}




