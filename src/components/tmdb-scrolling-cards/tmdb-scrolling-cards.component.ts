import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';

@Component({
  selector: 'app-tmdb-scrolling-cards',
  templateUrl: './tmdb-scrolling-cards.component.html',
  styleUrls: ['./tmdb-scrolling-cards.component.scss'],
})
export class TmdbScrollingCardsComponent implements OnInit {

  @Input() tmdbResults: TmdbMovie [];
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
