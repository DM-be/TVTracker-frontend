import { Component, OnInit, Input } from '@angular/core';
import { TmdbTvShowEpisode } from 'src/interfaces/TmdbTvShowEpisode';

@Component({
  selector: 'app-tvshow-episodes-list',
  templateUrl: './tvshow-episodes-list.component.html',
  styleUrls: ['./tvshow-episodes-list.component.scss'],
})
export class TvshowEpisodesListComponent implements OnInit {


  @Input() episodes: TmdbTvShowEpisode [];
  constructor() { }

  ngOnInit() {
    console.log(this.episodes)
  }

  

}
