import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPage } from './movie-detail.page';
import { TmdbScrollingCardsModule } from 'src/components/tmdb-scrolling-cards/tmdb-scrolling-cards.module';

const routes: Routes = [
  {
    path: ':id',
    component: MovieDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TmdbScrollingCardsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovieDetailPage]
})
export class MovieDetailPageModule {}
