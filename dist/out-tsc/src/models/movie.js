var TmdbMovie = /** @class */ (function () {
    function TmdbMovie(tmdbMovieDto) {
        this.tmdb_id = tmdbMovieDto.id;
        this.title = tmdbMovieDto.title;
        if (tmdbMovieDto.poster_path) {
            this.poster = "https://image.tmdb.org/t/p/w200" + tmdbMovieDto.poster_path;
        }
        else {
            this.poster = "./assets/imgs/no-poster.png";
        }
        this.overview = tmdbMovieDto.overview;
    }
    return TmdbMovie;
}());
export { TmdbMovie };
var RadarrMovie = /** @class */ (function () {
    function RadarrMovie(radarrMovieDto) {
        this.title = radarrMovieDto.title;
        this.overview = radarrMovieDto.overview;
        this.downloaded = radarrMovieDto.downloaded;
        this.tmdbId = radarrMovieDto.tmdbId;
        this.id = radarrMovieDto.id;
    }
    RadarrMovie.prototype.setPoster = function (url) {
        this.poster = url;
    };
    return RadarrMovie;
}());
export { RadarrMovie };
//# sourceMappingURL=movie.js.map