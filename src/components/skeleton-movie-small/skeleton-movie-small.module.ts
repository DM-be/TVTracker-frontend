import { NgModule } from '@angular/core';
import { SkeletonMovieSmallComponent } from './skeleton-movie-small.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [

        SkeletonMovieSmallComponent
    ],
    exports: [
        SkeletonMovieSmallComponent
    ],
    imports: [IonicModule]

  })
  export class SkeletonMovieSmallModule {}
  