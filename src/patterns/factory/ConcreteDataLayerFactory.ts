import { NetworkService } from 'src/services/network/network.service';
import { PouchDataLayer } from './PouchDataLayer';
import { DataLayerFactory } from './DataLayerFactory';
import { DataLayer } from './DataLayer';

export class ConcreteDataLayerFactory extends DataLayerFactory {

    createDataLayer(type: string, networkService: NetworkService): DataLayer {
        if (type === 'pouchdb') {
            return new PouchDataLayer(networkService);
        }
        else if(type === 'firestore')
        {

        }
        
    }

}