import { AddMovieCommand } from './../../patterns/command/AddMovieCommand';
import { MovieService } from './../../services/movie/movie.service';
import { Movie } from './../../interfaces/Movie';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  TmdbMovieDetailsDTO,
} from 'src/interfaces/TmdbMovieDetailsDTO';

import {
  TmdbMovie
} from 'src/interfaces/TmdbMovie';

import {
  ActionSheetController
} from '@ionic/angular';
import {
  AddMovieCommandOptions
} from 'src/interfaces/AddMovieCommandOptions';

import { TmdbService } from 'src/services/tmdb/tmdb.service';
import { TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';
import { TmdbGenre } from 'src/interfaces/TmdbGenre';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {

  public similarMovies: TmdbMovie[];
  public movie: TmdbMovie;
  public isInCollection: boolean;


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private movieService: MovieService, private actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    const tmdbId = this.route.snapshot.params.id;
    const movieDetails = await this.tmdbService.getMovieDetails(tmdbId);
    this.movie = new TmdbMovie(movieDetails as TmdbMovieResultDTO);
    this.movie.movieDetails = movieDetails;
    this.similarMovies = await this.tmdbService.getSimilarMovies(tmdbId);
    this.isInCollection = await this.movieService.isInCollection(tmdbId as number)
    this.init();
  }

  public init() {



  }

 
//todo: think about download grabbed icons etc etc
  getCloudIconName() {
    if (this.isInCollection) {
      return "cloud-done";
    }
    // else if(this.pouchMovie.grabbed)
    // {
    //   return "cloud-download";
    // }
  }


  async removeFromBufferedMovies() {
    try {
    } catch (error) {
      console.log(error);
    }


  }
  generateReleaseDateRuntimeGenreString() {
    let str = ``;
    const date = new Date(this.movie.movieDetails.release_date);
    str += date.getFullYear().toString();
    str += "  "
    str += this.timeConvert(this.movie.movieDetails.runtime);
    str += "  "
    for (let i = 0; i < this.movie.movieDetails.genres.length; i++) {
      const genre = this.movie.movieDetails.genres[i] as TmdbGenre;
      str += genre.name;
      if (i != this.movie.movieDetails.genres.length - 1) {
        str += ", ";
      }

    }
    return str;
  }


  // move to helper class
  private timeConvert(n): string {
    const num = n;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "min";
  }


  public async presentActionSheet(): Promise<void> {
    const addButtons = [{
      text: 'Add to collection',
      icon: 'add',
      handler: async () => await this.addMovieToCollection(false)
    }, {
      text: 'Add and download',
      icon: 'cloud-download',
      handler: async () => await this.addMovieToCollection(true)
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
      }
    }]
    const actionSheet = await this.actionSheetController.create({
      header: this.movie.movieDetails.tagline || this.movie.movieDetails.title,
      buttons: addButtons
    });
    await actionSheet.present();
  }


  
  async addMovieToCollection(searchForMovie: boolean): Promise<boolean> {

    try {
      const addMovieCommandOptions: AddMovieCommandOptions = {
        addOptions: {
          searchForMovie
        },
        monitored: false,
        qualityProfileId: 6,
        tmdbId: this.movie.tmdbId,
      };
      await this.movieService.addMovie(addMovieCommandOptions, this.movie);
      return Promise.resolve(true);
      console.log("added movie!")
    } catch (error) {
      console.log(error);
    }
  
  }
  


}