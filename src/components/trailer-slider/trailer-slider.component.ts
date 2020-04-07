import { Component, OnInit, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { TmdbTvShow } from 'src/interfaces/TmdbTvShow';

@Component({
  selector: 'app-trailer-slider',
  templateUrl: './trailer-slider.component.html',
  styleUrls: ['./trailer-slider.component.scss'],
})
export class TrailerSliderComponent implements OnInit {


  @Input() tmdbResults: TmdbMovie [] | TmdbTvShow [];


  public loaded: boolean [] = [];
  constructor() { 

  }

  async ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.loaded.push(false);
    }
  }

}
