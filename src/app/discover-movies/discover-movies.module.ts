import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrailerSliderModule } from 'src/components/trailer-slider/trailer-slider.module';
import { TmdbScrollingCardsModule } from 'src/components/tmdb-scrolling-cards/tmdb-scrolling-cards.module';
import { DiscoverMoviesPage } from './discover-movies.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TmdbScrollingCardsModule,
    TrailerSliderModule,

    RouterModule.forChild([{ path: '', component: DiscoverMoviesPage }])
    
  ],
  declarations: [DiscoverMoviesPage]
})
export class DiscoverMoviesPageModule {}
