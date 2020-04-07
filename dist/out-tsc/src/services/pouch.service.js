import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
var PouchService = /** @class */ (function () {
    function PouchService() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this.createCollectionPouchDB();
        this.createSyncPouchDB();
        this.emptyCollectionPouchDB();
    }
    PouchService.prototype.createCollectionPouchDB = function () {
        this.collectiondb = new PouchDB('collectiondb', { adapter: 'cordova-sqlite' });
    };
    PouchService.prototype.createSyncPouchDB = function () {
        this.syncdb = new PouchDB('syncdb', { adapter: 'cordova-sqlite' });
    };
    PouchService.prototype.emptyCollectionPouchDB = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var docs;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collectiondb.allDocs()];
                    case 1:
                        docs = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PouchService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], PouchService);
    return PouchService;
}());
export { PouchService };
//# sourceMappingURL=pouch.service.js.map