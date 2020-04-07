import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PouchService } from 'src/services/pouch/pouch.service';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(pouchService) {
        this.pouchService = pouchService;
    }
    Tab2Page.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.pouchService.getMovies()];
                    case 1:
                        _a.movies = _b.sent();
                        console.log(this.movies);
                        return [2 /*return*/];
                }
            });
        });
    };
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: 'tab2.page.html',
            styleUrls: ['tab2.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [PouchService])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map