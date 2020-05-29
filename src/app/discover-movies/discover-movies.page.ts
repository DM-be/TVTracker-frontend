import { AddMovieCommand } from './../../patterns/command/AddMovieCommand';
import { MovieService } from './../../services/movie/movie.service';
import { Component } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { AddMovieCommandOptions } from 'src/interfaces/AddMovieCommandOptions';
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

  constructor(private tmdbService: TmdbService, private movieService: MovieService, private loadingController: LoadingController) {
  }

  async ngOnInit() {
    await this.initializeTmdbMovies();
  }

  async addMovieToCollection(tmdbMovie: TmdbMovie) {

    const addMovieCommandOptions: AddMovieCommandOptions = {
      addOptions: {searchForMovie: false},
      monitored: false,
      qualityProfileId: 6,
      tmdbId: tmdbMovie.tmdbId
    };
    const command = new AddMovieCommand(this.movieService, addMovieCommandOptions, tmdbMovie );
    command.execute();
    console.log("added movie!")
  }
  

  private async initializeTmdbMovies() {
    try {
      if(await this.movieService.dataLayerInitialisation())
      {
        this.nowPlayingMovies = await this.tmdbService.getNowPlayingTmdbMovies();
        this.upComingMovies = await this.tmdbService.getUpcomingTmdbMovies();
      }
    } catch (error) {
      console.log(error);
    }
  }

}
