import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../components.module';
import { IonicModule } from '@ionic/angular';
import { NowPlayingComponent } from './now-playing.component';
import { CommonModule } from '@angular/common';
var NowPlayingModule = /** @class */ (function () {
    function NowPlayingModule() {
    }
    NowPlayingModule = tslib_1.__decorate([
        NgModule({
            declarations: [
                NowPlayingComponent
            ],
            exports: [
                NowPlayingComponent
            ],
            imports: [IonicModule, ComponentsModule, CommonModule]
        })
    ], NowPlayingModule);
    return NowPlayingModule;
}());
export { NowPlayingModule };
//# sourceMappingURL=now-playing.module.js.map