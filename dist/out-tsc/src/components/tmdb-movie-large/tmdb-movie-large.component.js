import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
var TmdbMovieLargeComponent = /** @class */ (function () {
    function TmdbMovieLargeComponent() {
    }
    TmdbMovieLargeComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", TmdbMovie)
    ], TmdbMovieLargeComponent.prototype, "tmdbMovie", void 0);
    TmdbMovieLargeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-tmdb-movie-large',
            templateUrl: './tmdb-movie-large.component.html',
            styleUrls: ['./tmdb-movie-large.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], TmdbMovieLargeComponent);
    return TmdbMovieLargeComponent;
}());
export { TmdbMovieLargeComponent };
//# sourceMappingURL=tmdb-movie-large.component.js.map