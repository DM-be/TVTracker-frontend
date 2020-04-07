import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
var TmdbMovieComponent = /** @class */ (function () {
    function TmdbMovieComponent() {
    }
    TmdbMovieComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TmdbMovie)
    ], TmdbMovieComponent.prototype, "tmdbMovie", void 0);
    TmdbMovieComponent = tslib_1.__decorate([
        Component({
            selector: 'app-tmdb-movie',
            templateUrl: './tmdb-movie.component.html',
            styleUrls: ['./tmdb-movie.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TmdbMovieComponent);
    return TmdbMovieComponent;
}());
export { TmdbMovieComponent };
//# sourceMappingURL=tmdb-movie.component.js.map