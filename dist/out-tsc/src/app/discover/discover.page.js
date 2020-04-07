import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MovieService } from 'src/services/movie/movie.service';
import { PouchService } from 'src/services/pouch/pouch.service';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
var DiscoverPage = /** @class */ (function () {
    function DiscoverPage(movieService, pouchService) {
        this.movieService = movieService;
        this.pouchService = pouchService;
    }
    DiscoverPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.movieService.getUpcomingTmdbMovies()];
                    case 1:
                        _a.tmdbMovies = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DiscoverPage.prototype.addToBufferedMovies = function (movie) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var addMovieDto, bufferedPouchMovie;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addMovieDto = {
                            addOptions: { searchForMovie: false },
                            monitored: false,
                            qualityProfileId: 6,
                            tmdbId: movie.id
                        };
                        return [4 /*yield*/, this.pouchService.deleteBufferedPouchMovie("420818")];
                    case 1:
                        _a.sent();
                        bufferedPouchMovie = new BufferedPouchMovie(movie, addMovieDto);
                        return [4 /*yield*/, this.pouchService.addBufferedMovieToBufferedMovieCollection(bufferedPouchMovie)];
                    case 2:
                        _a.sent();
                        console.log("added buffered movie!");
                        return [2 /*return*/];
                }
            });
        });
    };
    DiscoverPage = tslib_1.__decorate([
        Component({
            selector: 'app-discover',
            templateUrl: 'discover.page.html',
            styleUrls: ['discover.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [MovieService, PouchService])
    ], DiscoverPage);
    return DiscoverPage;
}());
export { DiscoverPage };
//# sourceMappingURL=discover.page.js.map