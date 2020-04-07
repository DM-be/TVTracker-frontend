import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PouchService } from 'src/services/pouch/pouch.service';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(pouchService) {
        this.pouchService = pouchService;
    }
    Tab3Page.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.pouchService.getBufferedMovies()];
                    case 1:
                        _a.movies = _b.sent();
                        console.log(this.movies);
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [PouchService])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map