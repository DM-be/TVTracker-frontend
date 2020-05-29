import { NetworkService } from 'src/services/network/network.service';
import { environment } from './../../environments/environment';
import { ConcreteDataLayerFactory } from './../../patterns/factory/ConcreteDataLayerFactory';
import { DataLayer } from 'src/patterns/factory/DataLayer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatalayerService {

  private _dataLayer: DataLayer;

  constructor(private networkService: NetworkService) {
    const dataLayerFactory = new ConcreteDataLayerFactory();
    this._dataLayer = dataLayerFactory.createDataLayer(environment.selectedDataLayer, networkService);
  }

  get dataLayer()
  {
    return this._dataLayer;
  }
}
