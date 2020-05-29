import { MovieService } from './../../services/movie/movie.service';
import { RadarrMovie } from 'src/interfaces/RadarrMovie';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';


import { IonItemSliding } from '@ionic/angular';


@Component({
  selector: 'app-collection-list-item',
  templateUrl: './collection-list-item.component.html',
  styleUrls: ['./collection-list-item.component.scss'],
})
export class CollectionListItemComponent  {



  @Input() public item: RadarrMovie; // only movie for now but could also be tvshow | PouchTvShow
  @Output() deletedMovie = new EventEmitter<any>();
  public loaded = false;

  constructor(private movieService: MovieService) { }

  public isRadarrMovie() {
    return true;
  }

  public async updateMonitoredStatus() {
    if(this.isRadarrMovie())
    {
      this.item.monitored = !this.item.monitored;
    }
  }

  


  public async deleteMovie(item: IonItemSliding) {
    if(this.isRadarrMovie())
    {
      try {
        await item.close();
        this.deletedMovie.next();
      } catch (error) {
        console.log(error);
      }
    }
  }


}
