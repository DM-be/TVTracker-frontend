import { Injectable } from '@angular/core';
import { fromEvent, merge, of, Observable, BehaviorSubject } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { mapTo } from 'rxjs/operators';
declare let WifiWizard2: any; // a global that does not need importing


@Injectable({
  providedIn: 'root'
})

// https://forum.ionicframework.com/t/ionic-4-network-check-example-problem/157909/2
export class NetworkService {

  private connectedWithProvidedSSID$: BehaviorSubject<boolean>;
  private SSID = "Boeveriestraat 46"; // AndroidWifi

  constructor(public network: Network, public platform: Platform) {
      this.connectedWithProvidedSSID$ = new BehaviorSubject(undefined);
      this.emitConnectedToNetworkOnInitialize();
     

      this.network.onConnect().subscribe(async (x) => {
        if(this.network.type === 'wifi' && await this.SSIDEqualsProvidedSSID())
        {
          
          this.connectedWithProvidedSSID$.next(true);
        }
        else {
          this.connectedWithProvidedSSID$.next(false);
        }
        
      })

      this.network.onDisconnect().subscribe(x => {
        this.connectedWithProvidedSSID$.next(false);
      })

  }

  public getNetworkStatus(): BehaviorSubject<boolean> {
      return this.connectedWithProvidedSSID$;
  }


  private async SSIDEqualsProvidedSSID() {
    return await WifiWizard2.getConnectedSSID() === this.SSID; 
  }

  public async emitConnectedToNetworkOnInitialize(): Promise<void> {
    try {
      console.log(await WifiWizard2.getConnectedSSID())
      if(await this.SSIDEqualsProvidedSSID())
      {
        this.connectedWithProvidedSSID$.next(true);
      }
      else {
        this.connectedWithProvidedSSID$.next(false);
      }
    } catch (error) {
      console.log(error);
    }

  }

}
