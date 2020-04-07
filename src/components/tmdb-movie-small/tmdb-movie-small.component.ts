import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';

@Component({
  selector: 'app-tmdb-movie-small',
  templateUrl: './tmdb-movie-small.component.html',
  styleUrls: ['./tmdb-movie-small.component.scss'],
})
export class TmdbMovieSmallComponent implements OnInit {

  @Input() tmdbMovie: TmdbMovie;
  public loaded: boolean = false;

  constructor() { }

  ngOnInit() {}

}
