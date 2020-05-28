import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { NetworkService } from 'src/services/network/network.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from 'src/interfaces/Movie';
export abstract class DataLayer {

    private _movies$: BehaviorSubject<RadarrMovie []>;
    private _tvShows$: BehaviorSubject<object []>;
    private _connectedToLocalNetwork$?: Observable<boolean>;
    private _initializedDataLayer$: BehaviorSubject<boolean>;

    abstract initializeMovies(): Promise<BehaviorSubject<RadarrMovie []>>;
    abstract initializeTvShows(): Promise<BehaviorSubject<object []>>;


    constructor(private networkService?: NetworkService) {
        if(networkService)
        {
            this._connectedToLocalNetwork$ = this.networkService.getNetworkStatus();
        }
        this.initializeDatalayer();
    }

    get movies$(): BehaviorSubject<RadarrMovie []> {
        return this._movies$;
    }

    get tvShows$(): BehaviorSubject<object []> {
        return this._tvShows$;
    }

    get connectedToLocalNetwork$(): BehaviorSubject<boolean> {
        return this.connectedToLocalNetwork$;
    }

    get initializedDataLayer$(): BehaviorSubject<boolean> {
        return this._initializedDataLayer$;
    }

    private async initializeDatalayer(): Promise<void> {
        try {
            this._movies$ = await this.initializeMovies();
            this._tvShows$ = await this.initializeTvShows();
            this.emitInitializedDataLayer$();
            this.onInit();
        } catch (error) {
            console.log(error);
        }
    }
    onInit() {}

    private emitInitializedDataLayer$() {
        this.initializedDataLayer$.next(true);
    }

    abstract addMovie(tmdbId: number): Promise<void>;
    abstract removeMovie(tmdbId: number): Promise<void>;
    abstract updateMovie(tmdbId: number): Promise<void>;
    abstract getMovie(tmdbId: number): RadarrMovie;
    abstract getMovies(): BehaviorSubject<RadarrMovie []>;
    abstract movieIsInCollection(tmdbId: number): boolean;
}