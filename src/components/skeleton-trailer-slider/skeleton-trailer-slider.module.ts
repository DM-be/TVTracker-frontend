import { NgModule } from '@angular/core';
import { SkeletonTrailerSliderComponent } from './skeleton-trailer-slider.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SkeletonMovieSmallModule } from '../skeleton-movie-small/skeleton-movie-small.module';

@NgModule({
    declarations: [

        SkeletonTrailerSliderComponent
    ],
    exports: [
        SkeletonTrailerSliderComponent
    ],
    imports: [IonicModule, SkeletonMovieSmallModule, CommonModule]

  })
  export class SkeletonTrailerSliderModule {}