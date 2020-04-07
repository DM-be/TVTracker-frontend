import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { PouchMovie } from 'src/interfaces/PouchMovie';
var PouchMovieComponent = /** @class */ (function () {
    function PouchMovieComponent() {
    }
    PouchMovieComponent.prototype.ngOnInit = function () { };
    PouchMovieComponent.prototype.getEyeIcon = function () {
        if (this.pouchMovie.monitored) {
            return "eye";
        }
        return "eye-off";
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", PouchMovie)
    ], PouchMovieComponent.prototype, "pouchMovie", void 0);
    PouchMovieComponent = tslib_1.__decorate([
        Component({
            selector: 'app-pouch-movie',
            templateUrl: './pouch-movie.component.html',
            styleUrls: ['./pouch-movie.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PouchMovieComponent);
    return PouchMovieComponent;
}());
export { PouchMovieComponent };
//# sourceMappingURL=pouch-movie.component.js.map