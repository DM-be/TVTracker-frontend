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
  PouchMovie
} from 'src/interfaces/PouchMovie';
import {
  BufferedPouchMovie
} from 'src/interfaces/BufferedPouchMovie';
import {
  PouchService
} from 'src/services/pouch/pouch.service';
import {
  ActionSheetController
} from '@ionic/angular';
import {
  AddMovieDTO
} from 'src/interfaces/AddMovieDTO';

import { TmdbService } from 'src/services/tmdb/tmdb.service';
import { TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';
import { TmdbGenre } from 'src/interfaces/TmdbGenre';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {


  public tmdbMovieDetailsDto: TmdbMovieDetailsDTO;
  public similarMovies: TmdbMovie[];
  public pouchMovie: PouchMovie | BufferedPouchMovie;

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private pouchService: PouchService, private actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    const tmdbId = this.route.snapshot.params.id;
    console.log(tmdbId);
    this.pouchMovie = this.pouchService.getMovie(Number(tmdbId));
    console.log(this.tmdbMovieDetailsDto);
    this.tmdbMovieDetailsDto = await this.tmdbService.getMovieDetails(tmdbId);
    this.similarMovies = await this.tmdbService.getSimilarMovies(tmdbId);
  
  }

  public isBufferedPouchMovie() {
    return (this.pouchMovie instanceof BufferedPouchMovie);
  }

  public isPouchMovie() {
    return (this.pouchMovie instanceof PouchMovie);
  }

  //replace with trailer thumbnail or? ...
  getBackdrop() {
    if (this.tmdbMovieDetailsDto) {

      return `https://image.tmdb.org/t/p/w780${this.tmdbMovieDetailsDto.backdrop_path}`;
    }
  }

  getPoster() {
    if (this.tmdbMovieDetailsDto) {

      return `https://image.tmdb.org/t/p/w154${this.tmdbMovieDetailsDto.poster_path}`;
    }
  }

 
//todo: think about download grabbed icons etc etc
  getCloudIconName() {
    if (this.pouchMovie.downloaded) {
      return "cloud-done";
    }
    else if(this.pouchMovie.grabbed)
    {
      return "cloud-download";
    }
  }


  async removeFromBufferedMovies() {
    try {
      this.pouchService.deleteMovieFromPouchAndLocal(this.pouchMovie);
      this.pouchMovie = undefined;
    } catch (error) {
    }


  }
  generateReleaseDateRuntimeGenreString() {
    let string = ``;
    const date = new Date(this.tmdbMovieDetailsDto.release_date);
    string += date.getFullYear().toString();
    string += "  "
    string += this.timeConvert(this.tmdbMovieDetailsDto.runtime);
    string += "  "
    for (let i = 0; i < this.tmdbMovieDetailsDto.genres.length; i++) {
      const genre = this.tmdbMovieDetailsDto.genres[i] as TmdbGenre;
      string += genre.name;
      if (i != this.tmdbMovieDetailsDto.genres.length - 1) {
        string += ", ";
      }

    }
    return string;
  }

  private timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "min";
  }


  async presentActionSheet() {
    const addButtons = [{
      text: 'Add to collection',
      icon: 'add',
      handler: async () => 
       await this.addToBufferedMovies(false)
    }, {
      text: 'Add and download',
      icon: 'cloud-download',
      handler: async () => await this.addToBufferedMovies(true)
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
    const actionSheet = await this.actionSheetController.create({
      header: this.tmdbMovieDetailsDto.tagline || this.tmdbMovieDetailsDto.title,
      buttons: addButtons
    });
    await actionSheet.present();
  }

  async addToBufferedMovies(searchForMovie: boolean) {
    const addMovieDto: AddMovieDTO = {
      addOptions: {
        searchForMovie: searchForMovie
      },
      monitored: false,
      qualityProfileId: 6,
      tmdbId: this.tmdbMovieDetailsDto.id
    };
    this.pouchMovie = new BufferedPouchMovie(this.tmdbMovieDetailsDto as TmdbMovieResultDTO, addMovieDto);
    await this.pouchService.addBufferedMovieToBufferedMovieCollection(this.pouchMovie);
   // this.bufferedPouchMovie = this.pouchService.getBufferedPouchMovie(this.tmdbMovieDetailsDto.id);
    return Promise.resolve(true);

  }



}