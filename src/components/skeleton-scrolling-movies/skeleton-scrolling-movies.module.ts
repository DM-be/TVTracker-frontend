import { SkeletonScrollingMoviesComponent } from './skeleton-scrolling-movies.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [

        SkeletonScrollingMoviesComponent
    ],
    exports: [
        SkeletonScrollingMoviesComponent
    ],
    imports: [IonicModule, CommonModule]

  })
  export class SkeletonScrollingMoviesModule {}
  