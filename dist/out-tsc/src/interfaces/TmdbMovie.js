var TmdbMovie = /** @class */ (function () {
    function TmdbMovie(tmdbMovieDto) {
        this.title = tmdbMovieDto.title;
        this.id = tmdbMovieDto.id;
        this.overview = tmdbMovieDto.overview;
        this.poster_path = tmdbMovieDto.poster_path;
        this.backdrop_path = tmdbMovieDto.backdrop_path;
        this.video = tmdbMovieDto.video;
        this.vote_average = tmdbMovieDto.vote_average;
        this.vote_count = tmdbMovieDto.vote_count;
        this.genre_ids = tmdbMovieDto.genre_ids;
        this.popularity = tmdbMovieDto.popularity;
        this.setPoster();
        this.setBackdrop();
    }
    // todo: add further logic depending on screensize etc if needed (maybe later for tablets?)
    // https://www.themoviedb.org/talk/5a5bf3860e0a260d9d0013c5
    TmdbMovie.prototype.setPoster = function () {
        if (this.poster_path) {
            this.poster = "https://image.tmdb.org/t/p/w154/" + this.poster_path;
        }
    };
    TmdbMovie.prototype.setBackdrop = function () {
        if (this.backdrop_path) {
            this.backdrop = "https://image.tmdb.org/t/p/w300/" + this.backdrop_path;
        }
    };
    TmdbMovie.prototype.getPoster = function () {
        return this.poster;
    };
    TmdbMovie.prototype.getBackdrop = function () {
        return this.backdrop;
    };
    return TmdbMovie;
}());
export { TmdbMovie };
//# sourceMappingURL=TmdbMovie.js.map