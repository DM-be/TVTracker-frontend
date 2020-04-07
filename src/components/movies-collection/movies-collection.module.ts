import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components.module';
import { CommonModule } from '@angular/common';
import { MoviesCollectionComponent } from './movies-collection.component';
import { NgModule } from '@angular/core';
import { CollectionListItemComponent } from '../collection-list-item/collection-list-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [

        MoviesCollectionComponent,
        CollectionListItemComponent,
    ],
    exports: [
        MoviesCollectionComponent,
        CollectionListItemComponent
    ],
    imports: [IonicModule, ComponentsModule, CommonModule, RouterModule]

  })
  export class MoviesCollectionModule {}