import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import Axios from 'axios';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
var MovieService = /** @class */ (function () {
    function MovieService() {
        this.TMDB_API_KEY = "4e60ba1292b6c1d4bbf05e0fe3542a92"; //todo: move to nestjs container env!
        this.BACKEND_URL = "http://192.168.0.163:7878/api/movie?apikey=9365d415a25043ecbccad5b5c13d47ce"; // replace with nestjs container url!
    }
    MovieService.prototype.getUpcomingTmdbMovies = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, axiosResponse, tmdbResponse, movies;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.themoviedb.org/3/movie/upcoming?api_key=" + this.TMDB_API_KEY;
                        return [4 /*yield*/, Axios.get(url)];
                    case 1:
                        axiosResponse = _a.sent();
                        tmdbResponse = axiosResponse.data;
                        movies = [];
                        tmdbResponse.results.forEach(function (tmdbMovieDto) {
                            movies.push(new TmdbMovie(tmdbMovieDto));
                        });
                        console.log(axiosResponse);
                        return [2 /*return*/, movies];
                }
            });
        });
    };
    MovieService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], MovieService);
    return MovieService;
}());
export { MovieService };
//# sourceMappingURL=movie.service.js.map