import { NgModule } from "@angular/core";
import { PouchMovieComponent } from './pouch-movie/pouch-movie.component';
import { IonicModule } from '@ionic/angular';
import { TmdbMovieComponent } from './tmdb-movie/tmdb-movie.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TmdbCardComponent } from './tmdb-card/tmdb-card.component';
import { TvshowEpisodesListComponent } from './tvshow-episodes-list/tvshow-episodes-list.component';





//todo split up in separate modules for increased performance and lazy loading
@NgModule({
    declarations: [
        PouchMovieComponent,
        TmdbMovieComponent,
        TmdbCardComponent,
        PouchMovieComponent,
        TvshowEpisodesListComponent
        
        
        
        

    ],
    exports: [
        PouchMovieComponent,
        TmdbMovieComponent,
        TmdbCardComponent,
        PouchMovieComponent,
        TvshowEpisodesListComponent
        
    ],
    imports: [IonicModule, RouterModule, CommonModule]
})
 export class ComponentsModule {}