import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
var NowPlayingComponent = /** @class */ (function () {
    function NowPlayingComponent() {
    }
    NowPlayingComponent.prototype.ngOnInit = function () { };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Array)
    ], NowPlayingComponent.prototype, "tmdbMovies", void 0);
    NowPlayingComponent = tslib_1.__decorate([
        Component({
            selector: 'app-now-playing',
            templateUrl: './now-playing.component.html',
            styleUrls: ['./now-playing.component.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NowPlayingComponent);
    return NowPlayingComponent;
}());
export { NowPlayingComponent };
//# sourceMappingURL=now-playing.component.js.map