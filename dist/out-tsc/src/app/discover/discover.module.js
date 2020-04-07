import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';
import { NowPlayingModule } from 'src/components/now-playing/now-playing.module';
var DiscoverPageModule = /** @class */ (function () {
    function DiscoverPageModule() {
    }
    DiscoverPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                NowPlayingModule,
                RouterModule.forChild([{ path: '', component: DiscoverPage }])
            ],
            declarations: [DiscoverPage]
        })
    ], DiscoverPageModule);
    return DiscoverPageModule;
}());
export { DiscoverPageModule };
//# sourceMappingURL=discover.module.js.map