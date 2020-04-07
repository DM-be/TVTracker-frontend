import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
import { MovieService } from '../movie/movie.service';
import { NetworkService } from 'src/services/network/network.service';
import { PouchMovie } from 'src/interfaces/PouchMovie';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
PouchDB.plugin(cordovaSqlitePlugin);
var PouchService = /** @class */ (function () {
    function PouchService(movieService, networkService) {
        this.movieService = movieService;
        this.networkService = networkService;
        this.BACKEND_URL = "http://192.168.0.186:5984/";
        this.POUCH_LIVE_NORETRY = { live: true, retry: true };
        this.setupMovieCollection();
        this.setupBufferedMovieCollection();
        this.subscribeToNetwork();
    }
    PouchService.prototype.getMovies = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.movies];
            });
        });
    };
    PouchService.prototype.getBufferedMovies = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.bufferedMovies];
            });
        });
    };
    //todo:naming
    PouchService.prototype.setupMovieCollection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.movieCollection = new PouchDB('movieCollection.db'); //{adapter:'cordova-sqlite'})
                        _a = this;
                        return [4 /*yield*/, this.getMoviesInMovieCollection()];
                    case 1:
                        _a.movies = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //todo:naming
    PouchService.prototype.setupBufferedMovieCollection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.bufferedMovieCollection = new PouchDB('syncdb.db');
                        _a = this;
                        return [4 /*yield*/, this.getBufferedMoviesInBufferedMovieCollection()];
                    case 1:
                        _a.bufferedMovies = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PouchService.prototype.handleChangesFromRemotePouch = function (info) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var changedDocsFromRemote;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                changedDocsFromRemote = info.docs;
                changedDocsFromRemote.forEach(function (pouchMovieDto) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var removedIndex, updatedMovieIndex;
                    return tslib_1.__generator(this, function (_a) {
                        if (pouchMovieDto._deleted) {
                            removedIndex = this.movies.findIndex(function (m) { return m._id === pouchMovieDto._id; });
                            this.movies.splice(removedIndex, 1);
                            return [2 /*return*/];
                        }
                        updatedMovieIndex = this.movies.findIndex(function (m) { return m.tmdbId === pouchMovieDto.tmdbId; });
                        if (updatedMovieIndex !== -1) {
                            this.movies[updatedMovieIndex] = new PouchMovie(pouchMovieDto);
                        }
                        else {
                            this.movies.push(new PouchMovie(pouchMovieDto));
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    PouchService.prototype.subscribeToNetwork = function () {
        var _this = this;
        this.networkService
            .getNetworkStatus()
            .subscribe(function (connectedToProvidedSSID) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log(connectedToProvidedSSID);
                //todo: update after testing
                if (connectedToProvidedSSID) {
                    this.syncMovieCollection();
                    console.log("subscribe sync called");
                }
                if (!connectedToProvidedSSID && this.moviesLiveReplication !== undefined) {
                    console.log("cancelled the live replication because we lost ssid access");
                    this.moviesLiveReplication.cancel();
                }
                return [2 /*return*/];
            });
        }); });
    };
    PouchService.prototype.syncMovieCollection = function () {
        var _this = this;
        this.moviesLiveReplication = this.movieCollection.replicate.from(this.BACKEND_URL + 'movies', this.POUCH_LIVE_NORETRY).on('change', function (info) {
            _this.handleChangesFromRemotePouch(info);
        });
    };
    PouchService.prototype.syncBufferedMovieCollection = function () {
        this.bufferedMovieCollection = this.bufferedMovieCollection.replicate.to(this.BACKEND_URL + 'bufferedMovies', this.POUCH_LIVE_NORETRY);
    };
    // backend handles conversion to full radarrmovie when connected
    PouchService.prototype.addBufferedMovieToBufferedMovieCollection = function (bufferedPouchMovie) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.bufferedMovieCollection.put(bufferedPouchMovie)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.bufferedMovies.push(bufferedPouchMovie)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("unable to add buffered movie to collection: " + error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PouchService.prototype.deleteBufferedPouchMovie = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bufferedMovieCollection.remove(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PouchService.prototype.getMoviesInMovieCollection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allDocs, pouchMovies_1, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.movieCollection.allDocs({ include_docs: true })];
                    case 1:
                        allDocs = _a.sent();
                        pouchMovies_1 = [];
                        allDocs.rows.forEach(function (doc) {
                            var pouchMovieDto = doc.doc;
                            pouchMovies_1.push(new PouchMovie(pouchMovieDto));
                        });
                        return [2 /*return*/, pouchMovies_1];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PouchService.prototype.getBufferedMoviesInBufferedMovieCollection = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var allDocs, bufferedPouchMovies_1, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.bufferedMovieCollection.allDocs({ include_docs: true })];
                    case 1:
                        allDocs = _a.sent();
                        bufferedPouchMovies_1 = [];
                        allDocs.rows.forEach(function (doc) {
                            var bufferedMovieDto = doc.doc;
                            var addMovieDto = bufferedMovieDto;
                            var tmdbMovie = bufferedMovieDto;
                            var bufferedPouchMovie = new BufferedPouchMovie(tmdbMovie, addMovieDto);
                            bufferedPouchMovies_1.push(bufferedPouchMovie);
                        });
                        return [2 /*return*/, bufferedPouchMovies_1];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PouchService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [MovieService, NetworkService])
    ], PouchService);
    return PouchService;
}());
export { PouchService };
//# sourceMappingURL=pouch.service.js.map