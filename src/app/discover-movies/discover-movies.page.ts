import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { LoadingController } from '@ionic/angular';
import { TmdbService } from 'src/services/tmdb/tmdb.service';


@Component({
  selector: 'app-discover-movies',
  templateUrl: 'discover-movies.page.html',
  styleUrls: ['discover-movies.page.scss']
})
export class DiscoverMoviesPage implements OnInit {

  public nowPlayingMovies: TmdbMovie [];
  public upComingMovies: TmdbMovie [];

  constructor(private tmdbService: TmdbService, private movieService: MovieService, private loadingController: LoadingController) {}

  ngOnInit() {
    this.initializeTmdbMovies();
  }

  private async initializeTmdbMovies() {
    try {
      this.movieService.dataLayerInitialisation().subscribe(async initialized => {
        if(initialized)
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
