import { TmdbMovieSmallComponent } from './tmdb-movie-small.component';
import { ComponentsModule } from '../components.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [

        TmdbMovieSmallComponent
    ],
    exports: [
        TmdbMovieSmallComponent
    ],
    imports: [IonicModule, CommonModule]

  })
  export class TmdbMovieSmallModule {}
  