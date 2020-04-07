import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SkeletonScrollingMoviesModule } from '../skeleton-scrolling-movies/skeleton-scrolling-movies.module';
import { TmdbScrollingCardsComponent } from './tmdb-scrolling-cards.component';

@NgModule({
    declarations: [
      TmdbScrollingCardsComponent
    ],
    exports: [
    TmdbScrollingCardsComponent
    ],
    imports: [IonicModule, ComponentsModule, CommonModule, SkeletonScrollingMoviesModule] 

  })
  export class TmdbScrollingCardsModule {}
  