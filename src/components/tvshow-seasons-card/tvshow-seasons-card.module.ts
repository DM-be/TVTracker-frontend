import { NgModule } from '@angular/core';
import { TvshowSeasonsCardComponent } from './tvshow-seasons-card.component';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      TvshowSeasonsCardComponent
    ],
    exports: [
        TvshowSeasonsCardComponent
    ],
    imports: [IonicModule, ComponentsModule, CommonModule] 

  })
  export class TvshowSeasonsCardModule {}
  