import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as Moment from 'moment';
import Axios from 'axios';
import { TmdbMovie, RadarrMovie } from 'src/models/movie';
var MovieService = /** @class */ (function () {
    function MovieService() {
        this.TMDB_API_KEY = "4e60ba1292b6c1d4bbf05e0fe3542a92"; //todo: get from env file
        this.BACKEND_URL = "http://pi:7878/api/movie?apikey=9365d415a25043ecbccad5b5c13d47ce"; // 
    }
    MovieService.prototype.getNewlyReleasedMovies = function (page) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var pageNumber, now, aMonthAgo, url, axiosResponse, movieObjects, movies;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageNumber = page || 1;
                        now = Moment().format('YYYY-MM-DD');
                        aMonthAgo = Moment().subtract(1, 'months').format('YYYY-MM-DD');
                        url = "https://api.themoviedb.org/3/discover/movie?api_key=" + this.TMDB_API_KEY + "&primary_release_date.gte=" + aMonthAgo + "&primary_release_date.lte=" + now + "&page=" + pageNumber;
                        return [4 /*yield*/, Axios.get(url)];
                    case 1:
                        axiosResponse = _a.sent();
                        movieObjects = axiosResponse.data.results;
                        movies = [];
                        movieObjects.forEach(function (tmdbMovieDto) {
                            movies.push(new TmdbMovie(tmdbMovieDto));
                        });
                        return [2 /*return*/, movies];
                }
            });
        });
    };
    MovieService.prototype.getMoviesInCollection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var movies, axiosResponse, movieObjects;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        movies = [];
                        return [4 /*yield*/, Axios.get(this.BACKEND_URL)];
                    case 1:
                        axiosResponse = _a.sent();
                        movieObjects = axiosResponse.data;
                        movieObjects.forEach(function (radarrMovieDto) {
                            movies.push(new RadarrMovie(radarrMovieDto));
                        });
                        return [2 /*return*/];
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