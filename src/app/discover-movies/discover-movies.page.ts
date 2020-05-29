import { AddMovieCommand } from './../../patterns/command/AddMovieCommand';
import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
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
export class DiscoverMoviesPage implements OnInit {

  public nowPlayingMovies: TmdbMovie [];
  public upComingMovies: TmdbMovie [];

  constructor(private tmdbService: TmdbService, private movieService: MovieService, private loadingController: LoadingController) {
  }

  ngOnInit() {
    console.log('init called')
    this.initializeTmdbMovies();
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
      this.movieService.dataLayerInitialisation().subscribe(async x => {
        if(x)
        {
          this.nowPlayingMovies = await this.tmdbService.getNowPlayingTmdbMovies();
          this.upComingMovies = await this.tmdbService.getUpcomingTmdbMovies();
        }
   
      
      })
      
        
    } catch (error) {
      console.log(error);
    }
  }

}
