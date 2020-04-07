import { Component, OnInit, Input } from '@angular/core';
import { PouchMovie } from 'src/interfaces/PouchMovie';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';

@Component({
  selector: 'app-movies-collection',
  templateUrl: './movies-collection.component.html',
  styleUrls: ['./movies-collection.component.scss'],
})
export class MoviesCollectionComponent implements OnInit {

  @Input() pouchMovies: PouchMovie | BufferedPouchMovie [];
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
