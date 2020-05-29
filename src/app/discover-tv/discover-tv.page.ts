import { Component } from '@angular/core';
import { TmdbService } from 'src/services/tmdb/tmdb.service';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { Subscription } from 'rxjs';
import { TmdbTvShow } from 'src/interfaces/TmdbTvShow';

@Component({
  selector: 'app-discover-tv',
  templateUrl: 'discover-tv.page.html',
  styleUrls: ['discover-tv.page.scss']
})
export class DiscoverTvPage {
  public nowAiringTvShows: TmdbTvShow [];
  public popularTvShows: TmdbTvShow [];
  private pouchInitialisationSubscription: Subscription;

  constructor(private tmdbService: TmdbService) {}

  async ngOnInit() {
    // this.pouchInitialisationSubscription = this.pouchService.initialisation$.subscribe(async initialized => {
    //   if(initialized)
    //   {
    //     this.nowAiringTvShows = await this.tmdbService.getOnTheAirTmdbTvShows();
    //     this.popularTvShows = await this.tmdbService.getPopularTmdbTvShows();
    //   }
    // });
    
  }

  ngOnDestroy() {
    this.pouchInitialisationSubscription.unsubscribe();
  }


}
