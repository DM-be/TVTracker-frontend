import { AddMovieCommandOptions } from './../../interfaces/AddMovieCommandOptions';
import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import {  TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';
import { ActivatedRoute } from '@angular/router';
import { TmdbTvShow } from 'src/interfaces/TmdbTvShow';


@Component({
  selector: 'app-tmdb-card',
  templateUrl: './tmdb-card.component.html',
  styleUrls: ['./tmdb-card.component.scss'],
})
export class TmdbCardComponent implements OnInit {


  public loaded = false;
  public routerLink: string;
  @Input() tmdbResult: TmdbMovie | TmdbTvShow;
  public inCollection: boolean;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
    

    this.activatedRoute.url.subscribe(x => {
      if(this.tmdbResult)
      {
        this.inCollection = this.movieService.isInCollection(this.tmdbResult.tmdbId);// aslo check with tvshow service!
      }
     
    });
    
   }

  ngOnInit() {
    this.inCollection = this.movieService.isInCollection(this.tmdbResult.tmdbId); // aslo check with tvshow service!
    if(this.tmdbResult instanceof TmdbMovie)
    {
      this.routerLink = `/movie-detail/${this.tmdbResult.tmdbId}`;
    } 
    else {
      this.routerLink = `/tvshow-detail/${this.tmdbResult.tmdbId}`;
    }
  }


  log(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    console.log("click")
  }

  async addToBufferedMovies(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const addMovieDto: AddMovieCommandOptions = {
      addOptions: {searchForMovie: false},
      monitored: false,
      qualityProfileId: 6,
      tmdbId: this.tmdbResult.tmdbId
    };

    this.inCollection = true;
    console.log("added buffered movie!")
    
  }

}
