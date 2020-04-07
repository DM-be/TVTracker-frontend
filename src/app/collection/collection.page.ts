import { Component } from '@angular/core';
import { PouchService } from 'src/services/pouch/pouch.service';
import { PouchMovie } from 'src/interfaces/PouchMovie';
import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';


@Component({
  selector: 'app-collection',
  templateUrl: 'collection.page.html',
  styleUrls: ['collection.page.scss']
})
export class CollectionPage  {


  public moviesInView: Array<PouchMovie | BufferedPouchMovie>; // make new arrays instead of binding directly... issue in virtual list...

  public filters: string [] = [];
  public possibleFilters: string [] = ['Downloaded', 'Grabbed', 'Monitored'];
  public filterObject = {};
  public filterType: string;

  constructor(private pouchService: PouchService) {}

  async ngOnInit() {
   this.moviesInView = [...this.pouchService.getMoviesInView()];
  }

  async ionViewWillEnter() {
    if(this.moviesInView.length !== this.pouchService.getMoviesInView().length)
    {
      this.refreshMovies();
    }
  }

  private calculateApproxHeight() {
    return ((window.innerWidth/4.5) * 1.5 + 11);
  }

  // workaround because of failed change detection --> create new array;
  // see https://github.com/ionic-team/ionic/issues/17371
  async refreshMovies() {
    this.moviesInView = [...this.pouchService.getMoviesInView()]
  }



  public addFilter(filter: string) {
    this.filters.push(filter);
    const i = this.possibleFilters.findIndex(f => f.toLowerCase() === filter.toLowerCase());
    this.possibleFilters.splice(i, 1);
    this.filterObject = {...this.filterObject,...{[filter.toLowerCase()]: true}}
    this.filterWithFilterObject();


  }

  public filterWithFilterObject() {
    this.moviesInView = this.moviesInView.filter((item) => {
      for (var key in this.filterObject) {
        if (item[key] === undefined || item[key] != this.filterObject[key])
          return false;
      }
      return true;
    });
  }

  public addTypeFilter(type: string)
  {
    this.filterType = type;
    this.filterByType();
  }

  public resetFilterType() {
    this.filterType = undefined;
    this.filters = [];
    this.refreshMovies();
  }

  public filterByType() {

    this.moviesInView = this.moviesInView.filter((item) => {
     
        if(this.filterType === 'movies')
        {
          return ((item instanceof PouchMovie || item instanceof BufferedPouchMovie))
        }

    });
  }


  public removeFilter(i: number)
  {
    const property = this.filters[i];
    delete this.filterObject[property.toLowerCase()];
    this.possibleFilters.push(property);
    this.filters.splice(i, 1);
    this.refreshMovies();
    this.filterWithFilterObject();
  } 
  
 

}
