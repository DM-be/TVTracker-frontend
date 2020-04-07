import * as tslib_1 from "tslib";
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ComponentsModule } from 'src/components/components.module';
var Tab2PageModule = /** @class */ (function () {
    function Tab2PageModule() {
    }
    Tab2PageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                IonicModule,
                CommonModule,
                FormsModule,
                ComponentsModule,
                RouterModule.forChild([{ path: '', component: Tab2Page }])
            ],
            declarations: [Tab2Page]
        })
    ], Tab2PageModule);
    return Tab2PageModule;
}());
export { Tab2PageModule };
//# sourceMappingURL=tab2.module.js.map