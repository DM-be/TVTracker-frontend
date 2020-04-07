import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { PouchService } from 'src/services/pouch/pouch.service';
import { AddMovieDTO } from 'src/interfaces/AddMovieDTO';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
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

  constructor(private pouchService: PouchService, private activatedRoute: ActivatedRoute) {
    

    this.activatedRoute.url.subscribe(x => {
      if(this.tmdbResult)
      {
        this.inCollection = this.pouchService.isInCollectionOrBufferedMovieCollection(this.tmdbResult.id);
      }
     
    });
    
   }

  ngOnInit() {
    this.inCollection = this.pouchService.isInCollectionOrBufferedMovieCollection(this.tmdbResult.id);
    if(this.tmdbResult instanceof TmdbMovie)
    {
      this.routerLink = `/movie-detail/${this.tmdbResult.id}`;
    } 
    else {
      this.routerLink = `/tvshow-detail/${this.tmdbResult.id}`;
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
    const addMovieDto: AddMovieDTO = {
      addOptions: {searchForMovie: false},
      monitored: false,
      qualityProfileId: 6,
      tmdbId: this.tmdbResult.id
    };


    const bufferedPouchMovie = new BufferedPouchMovie(this.tmdbResult as TmdbMovieResultDTO, addMovieDto);
    await this.pouchService.addBufferedMovieToBufferedMovieCollection(bufferedPouchMovie);
    this.inCollection = this.pouchService.isInCollectionOrBufferedMovieCollection(this.tmdbResult.id);
    console.log("added buffered movie!")
    
  }

}
