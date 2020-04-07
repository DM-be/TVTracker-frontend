import { Component, OnInit, Input } from '@angular/core';
import { TmdbTvShowSeason } from 'src/interfaces/TmdbTvShowSeason';
import { TmdbTvShowEpisode } from 'src/interfaces/TmdbTvShowEpisode';
import { TmdbService } from 'src/services/tmdb/tmdb.service';

@Component({
  selector: 'app-tvshow-seasons-card',
  templateUrl: './tvshow-seasons-card.component.html',
  styleUrls: ['./tvshow-seasons-card.component.scss'],
})
export class TvshowSeasonsCardComponent implements OnInit {


  @Input() seasons: TmdbTvShowSeason [];
  @Input() tv_id: number;
  public episodes: TmdbTvShowEpisode [];
  selectedSeasonNumber: number;

  constructor(private tmdbService: TmdbService) { }

  async ngOnInit() {
    this.selectedSeasonNumber = this.seasons[0].season_number;
    await this.setEpisodes();
  }

  public getSelectedSeasonPoster() {
    const season = this.seasons.filter(s => s.season_number == this.selectedSeasonNumber)[0];
    return `https://image.tmdb.org/t/p/w200/${season.poster_path}`;
  }

  private async setEpisodes() {
    const detailedSeason = await this.tmdbService.getTvShowSeasonDetailed(this.tv_id, this.selectedSeasonNumber);
    this.episodes = detailedSeason.episodes;
  }

  async updateSelectedSeasonNumber(season_number: number) {
    this.selectedSeasonNumber = season_number;
    await this.setEpisodes();
  }
}
