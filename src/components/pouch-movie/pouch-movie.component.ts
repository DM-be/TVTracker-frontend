import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-pouch-movie',
  templateUrl: './pouch-movie.component.html',
  styleUrls: ['./pouch-movie.component.scss'],
})
export class PouchMovieComponent implements OnInit {


  public loaded = false;
  @Input() public movie: RadarrMovie;
  constructor() { }

  ngOnInit() {
    
  }

  isBufferedPouchMovie() {
    return this.movie._id !== undefined;
  }




}
