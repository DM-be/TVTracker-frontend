import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TvshowDetailPage } from './tvshow-detail.page';
import { TmdbScrollingCardsModule } from 'src/components/tmdb-scrolling-cards/tmdb-scrolling-cards.module';
import { TvshowSeasonsCardModule } from 'src/components/tvshow-seasons-card/tvshow-seasons-card.module';

const routes: Routes = [
  {
    path: ':id',
    component: TvshowDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmdbScrollingCardsModule,
    TvshowSeasonsCardModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [TvshowDetailPage]
})
export class TvshowDetailPageModule {}
