import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-movies-collection',
  templateUrl: './movies-collection.component.html',
  styleUrls: ['./movies-collection.component.scss'],
})
export class MoviesCollectionComponent implements OnInit {

  @Input() movies: RadarrMovie [];
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
