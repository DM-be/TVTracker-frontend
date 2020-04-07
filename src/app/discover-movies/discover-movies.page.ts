import { Component } from '@angular/core';
import { PouchService } from 'src/services/pouch/pouch.service';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { AddMovieDTO } from 'src/interfaces/AddMovieDTO';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TmdbService } from 'src/services/tmdb/tmdb.service';
import { TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';

@Component({
  selector: 'app-discover-movies',
  templateUrl: 'discover-movies.page.html',
  styleUrls: ['discover-movies.page.scss']
})
export class DiscoverMoviesPage {

  public nowPlayingMovies: TmdbMovie [];
  public upComingMovies: TmdbMovie [];

  private pouchInitialisationSubscription: Subscription;
  

  constructor(private tmdbService: TmdbService, private pouchService: PouchService, private loadingController: LoadingController) {
  }

  async ngOnInit() {
    this.pouchInitialisationSubscription = this.pouchService.initialisation$.subscribe(async initialized => {
      if(initialized)
      {
        this.nowPlayingMovies = await this.tmdbService.getNowPlayingTmdbMovies();
        this.upComingMovies = await this.tmdbService.getUpcomingTmdbMovies();
      }
    });
    
  }

  ngOnDestroy() {
    this.pouchInitialisationSubscription.unsubscribe();
  }



  async addToBufferedMovies(movie: TmdbMovie) {
    const addMovieDto: AddMovieDTO = {
      addOptions: {searchForMovie: false},
      monitored: false,
      qualityProfileId: 6,
      tmdbId: movie.id
    };
    
    const bufferedPouchMovie = new BufferedPouchMovie(movie as TmdbMovieResultDTO, addMovieDto);
    await this.pouchService.addBufferedMovieToBufferedMovieCollection(bufferedPouchMovie);
    console.log("added buffered movie!")



  }
  
}
