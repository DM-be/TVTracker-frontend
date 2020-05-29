
import { MovieService } from './../../services/movie/movie.service';
import { RadarrMovie } from './../../interfaces/RadarrMovie';
import { Component } from '@angular/core';


@Component({
  selector: 'app-collection',
  templateUrl: 'collection.page.html',
  styleUrls: ['collection.page.scss']
})
export class CollectionPage  {


  public movies: Array<RadarrMovie> = [];

  public filters: string [] = [];
  public possibleFilters: string [] = ['Downloaded', 'Grabbed', 'Monitored'];
  public filterObject = {};
  public filterType: string;

  constructor(private movieService: MovieService) {}

  async ngOnInit() {
   this.movies = this.movieService.getMoviesSubject().getValue();
   this.movieService.getMoviesSubject().subscribe(x => this.movies = [...x]);
    // workaround because of failed change detection --> create new array;
  // see https://github.com/ionic-team/ionic/issues/17371
  }

  public calculateApproxHeight() {
    return ((window.innerWidth / 4.5) * 1.5 + 11);
  }

  public addFilter(filter: string) {
    this.filters.push(filter);
    const i = this.possibleFilters.findIndex(f => f.toLowerCase() === filter.toLowerCase());
    this.possibleFilters.splice(i, 1);
    this.filterObject = {...this.filterObject, ...{[filter.toLowerCase()]: true}};
    this.filterWithFilterObject();
  }

  public filterWithFilterObject() {
    this.movies = this.movies.filter((item) => {
      for (const key in this.filterObject) {
        if (item[key] === undefined || item[key] !== this.filterObject[key]) {
          return false;
        }
      }
      return true;
    });
  }

  public addTypeFilter(type: string) {
    this.filterType = type;
    this.filterByType();
  }

  public resetFilterType() {
    this.filterType = undefined;
    this.filters = [];
  }

  public filterByType() {
    this.movies = this.movies.filter((item) => {

        if (this.filterType === 'movies') {
        //  return ((item instanceof RadarrMovie)
        }

    });
  }
  public removeFilter(i: number) {
    const property = this.filters[i];
    delete this.filterObject[property.toLowerCase()];
    this.possibleFilters.push(property);
    this.filters.splice(i, 1);
    this.filterWithFilterObject();
  }


}
