import { NetworkService } from 'src/services/network/network.service';
import { DataLayer } from './DataLayer';
export abstract class DataLayerFactory {

    private getDataLayer(type: string): DataLayer {
        return this.createDataLayer(type);
    }
    abstract createDataLayer(type: string, networkService?: NetworkService): DataLayer;

}
