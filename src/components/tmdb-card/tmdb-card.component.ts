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

  constructor(private movieService: MovieService) {}

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

  async addToCollection(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    try {
    const addMovieCommandOptions: AddMovieCommandOptions = {
      addOptions: {
        searchForMovie: true,
      },
      monitored: false,
      qualityProfileId: 6,
      tmdbId: this.tmdbResult.tmdbId,
    };
    if(this.tmdbResult instanceof TmdbMovie)
    {
      await this.movieService.addMovie(addMovieCommandOptions, this.tmdbResult);
    }
    // add tvshow! (first episode command)
    this.inCollection = true;
    } catch (error) {
      console.log(error);
    }
  }

}
