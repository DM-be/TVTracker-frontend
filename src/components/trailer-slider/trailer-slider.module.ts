import { TrailerSliderComponent } from './trailer-slider.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TmdbMovieSmallModule } from '../tmdb-movie-small/tmdb-movie-small.module';
import { SkeletonTrailerSliderModule } from '../skeleton-trailer-slider/skeleton-trailer-slider.module';

@NgModule({
    declarations: [

        TrailerSliderComponent
    ],
    exports: [
        TrailerSliderComponent
    ],
    imports: [IonicModule, TmdbMovieSmallModule, CommonModule, SkeletonTrailerSliderModule]

  })
  export class TrailerSliderModule {}
  