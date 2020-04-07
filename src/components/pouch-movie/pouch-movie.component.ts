import { Component, OnInit, Input } from '@angular/core';
import { PouchMovie } from 'src/interfaces/PouchMovie';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';

@Component({
  selector: 'app-pouch-movie',
  templateUrl: './pouch-movie.component.html',
  styleUrls: ['./pouch-movie.component.scss'],
})
export class PouchMovieComponent implements OnInit {


  public loaded = false;
  @Input() public pouchMovie: PouchMovie | BufferedPouchMovie;
  constructor() { }

  ngOnInit() {
    
  }

  isBufferedPouchMovie() {
    return this.pouchMovie instanceof BufferedPouchMovie;
  }




}
