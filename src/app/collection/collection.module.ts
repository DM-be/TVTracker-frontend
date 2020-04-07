import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MoviesCollectionModule } from 'src/components/movies-collection/movies-collection.module';
import { TmdbScrollingCardsModule } from 'src/components/tmdb-scrolling-cards/tmdb-scrolling-cards.module';
import { CollectionPage } from './collection.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MoviesCollectionModule,
    TmdbScrollingCardsModule,
    RouterModule.forChild([{ path: '', component: CollectionPage }])
  ],
  declarations: [CollectionPage]
})
export class CollectionPageModule {}
