var PouchMovie = /** @class */ (function () {
    function PouchMovie(pouchMovieDto) {
        this.title = pouchMovieDto.title;
        this.overview = pouchMovieDto.overview;
        this.downloaded = pouchMovieDto.downloaded;
        this.monitored = pouchMovieDto.monitored;
        this.id = pouchMovieDto.id;
        this.tmdbId = pouchMovieDto.tmdbId;
        this.images = pouchMovieDto.images;
        this.setPoster();
        this.setBackdrop();
    }
    PouchMovie.prototype.setPoster = function () {
        var originalPosterRadarrImage = this.images.filter(function (i) { return i.coverType === "poster"; })[0];
        if (originalPosterRadarrImage) {
            var filePath = originalPosterRadarrImage.url.split("/").pop();
            this.poster_path = filePath;
            this.poster = "https://image.tmdb.org/t/p/w154/" + this.poster_path;
        }
    };
    PouchMovie.prototype.setBackdrop = function () {
        var originalBackdropRadarrImage = this.images.filter(function (i) { return i.coverType === "fanart"; })[0];
        if (originalBackdropRadarrImage) {
            var filePath = originalBackdropRadarrImage.url.toString().split("/").pop();
            this.backdrop_path = filePath;
            this.backdrop = "https://image.tmdb.org/t/p/w154/" + this.poster_path;
        }
    };
    PouchMovie.prototype.getBackdrop = function () {
        return this.backdrop;
    };
    PouchMovie.prototype.getPoster = function () {
        return this.poster;
    };
    PouchMovie.prototype.getMonitoredIcon = function () {
        if (this.monitored) {
            return "eye";
        }
        return "eye-off";
    };
    PouchMovie.prototype.getDownloadColor = function () {
        if (this.downloaded) {
            return "success";
        }
        return "";
    };
    return PouchMovie;
}());
export { PouchMovie };
//# sourceMappingURL=PouchMovie.js.map