import * as tslib_1 from "tslib";
import { TmdbMovie } from './TmdbMovie';
var BufferedPouchMovie = /** @class */ (function (_super) {
    tslib_1.__extends(BufferedPouchMovie, _super);
    function BufferedPouchMovie(tmdbMovieDto, addMovieDto) {
        var _this = _super.call(this, tmdbMovieDto) || this;
        _this.tmdbId = tmdbMovieDto.id;
        _this.monitored = addMovieDto.monitored;
        _this.qualityProfileId = addMovieDto.qualityProfileId;
        _this.addOptions = addMovieDto.addOptions;
        _this._id = tmdbMovieDto.id.toString();
        return _this;
    }
    return BufferedPouchMovie;
}(TmdbMovie));
export { BufferedPouchMovie };
//# sourceMappingURL=BufferedPouchMovie.js.map