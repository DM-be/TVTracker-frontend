import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';

@Component({
  selector: 'app-tmdb-movie',
  templateUrl: './tmdb-movie.component.html',
  styleUrls: ['./tmdb-movie.component.scss'],
})
export class TmdbMovieComponent implements OnInit {


  @Input() public tmdbMovie: TmdbMovie;
  
  constructor() { }

  ngOnInit() {}

}
