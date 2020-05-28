import { PouchDataLayer } from './PouchDataLayer';
import { DataLayerFactory } from './DataLayerFactory';
import { DataLayer } from './DataLayer';

export class ConcreteDataLayerFactory extends DataLayerFactory {

    createDataLayer(type: string): DataLayer {
        if (type === 'pouchdb') {
            return new PouchDataLayer();
        }
    }

}