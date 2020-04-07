import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  DiscoverTvPage } from './discover-tv.page';
import { TmdbScrollingCardsModule } from 'src/components/tmdb-scrolling-cards/tmdb-scrolling-cards.module';
import { TrailerSliderModule } from 'src/components/trailer-slider/trailer-slider.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TmdbScrollingCardsModule,
    TrailerSliderModule,
    RouterModule.forChild([{ path: '', component: DiscoverTvPage }])
  ],
  declarations: [DiscoverTvPage]
})
export class DiscoverTvPageModule {}
