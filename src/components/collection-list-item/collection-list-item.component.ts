import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { PouchMovie } from 'src/interfaces/PouchMovie';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
import { PouchService } from 'src/services/pouch/pouch.service';
import { IonItemSliding } from '@ionic/angular';


@Component({
  selector: 'app-collection-list-item',
  templateUrl: './collection-list-item.component.html',
  styleUrls: ['./collection-list-item.component.scss'],
})
export class CollectionListItemComponent implements OnInit {



  @Input() public item: PouchMovie | BufferedPouchMovie// only movie for now but could also be tvshow | PouchTvShow
  @Output() deletedMovie = new EventEmitter<any>();
  public loaded = false;

  constructor(private pouchService: PouchService) { }

  ngOnInit() {
    console.log(this.item);
    
  }
  public isBufferedPouchMovie() {
    return (this.item instanceof BufferedPouchMovie);
  }

  public async updateMonitoredStatus() {
    if(this.isBufferedPouchMovie())
    {
      this.item.monitored = !this.item.monitored;
      await this.pouchService.updateBufferedMovieInBufferedMovieCollection(this.item as BufferedPouchMovie);
    }
  }

 

  public async deleteMovie(item: IonItemSliding) {
    if(this.isBufferedPouchMovie())
    {
      try {
        await this.pouchService.deleteMovieFromPouchAndLocal(this.item);
        await item.close();
        this.deletedMovie.next();
      } catch (error) {
        console.log(error);
      }
    
    }
  }


}
