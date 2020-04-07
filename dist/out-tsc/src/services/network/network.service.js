import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
var NetworkService = /** @class */ (function () {
    function NetworkService(network, platform) {
        var _this = this;
        this.network = network;
        this.platform = platform;
        this.SSID = "AndroidWifi";
        this.connectedWithProvidedSSID$ = new BehaviorSubject(false);
        this.network.onConnect().subscribe(function (x) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("on connect fired!");
                        _a = this.network.type === 'wifi';
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.SSIDEqualsProvidedSSID()];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a) {
                            this.connectedWithProvidedSSID$.next(true);
                        }
                        else {
                            this.connectedWithProvidedSSID$.next(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
        this.network.onDisconnect().subscribe(function (x) {
            _this.connectedWithProvidedSSID$.next(false);
        });
    }
    NetworkService.prototype.getNetworkStatus = function () {
        return this.connectedWithProvidedSSID$;
    };
    NetworkService.prototype.SSIDEqualsProvidedSSID = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WifiWizard2.getConnectedSSID()];
                    case 1: return [2 /*return*/, (_a.sent()) === this.SSID];
                }
            });
        });
    };
    NetworkService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        })
        // https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2
        ,
        tslib_1.__metadata("design:paramtypes", [Network, Platform])
    ], NetworkService);
    return NetworkService;
}());
export { NetworkService };
//# sourceMappingURL=network.service.js.map