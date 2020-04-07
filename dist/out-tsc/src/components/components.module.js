import * as tslib_1 from "tslib";
import { NgModule } from "@angular/core";
import { PouchMovieComponent } from './pouch-movie/pouch-movie.component';
import { IonicModule } from '@ionic/angular';
import { TmdbMovieComponent } from './tmdb-movie/tmdb-movie.component';
import { TmdbMovieLargeComponent } from './tmdb-movie-large/tmdb-movie-large.component';
//todo split up in separate modules for increased performance and lazy loading
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                PouchMovieComponent,
                TmdbMovieComponent,
                TmdbMovieLargeComponent
            ],
            exports: [
                PouchMovieComponent,
                TmdbMovieComponent,
                TmdbMovieLargeComponent
            ],
            imports: [IonicModule]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
export { ComponentsModule };
//# sourceMappingURL=components.module.js.map