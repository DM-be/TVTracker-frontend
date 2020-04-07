import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/services/tmdb/tmdb.service';
import { PouchService } from 'src/services/pouch/pouch.service';
import { ActionSheetController } from '@ionic/angular';
import { TmdbTvShow } from 'src/interfaces/TmdbTvShow';
import { TmdbTvShowDetailsDTO } from 'src/interfaces/TmdbTvShowDetailsDTO';
import { TmdbGenre } from 'src/interfaces/TmdbGenre';
import { AddTvShowDTO } from 'src/interfaces/AddTvShowDTO';
import { TmdbTvShowSeason } from 'src/interfaces/TmdbTvShowSeason';
import { SonarrSeason } from 'src/interfaces/SonarrSeason';

@Component({
  selector: 'app-tvshow-detail',
  templateUrl: './tvshow-detail.page.html',
  styleUrls: ['./tvshow-detail.page.scss'],
})
export class TvshowDetailPage implements OnInit {

  public tmdbTvShowDetailsDto: TmdbTvShowDetailsDTO;
  public similarTvShows: TmdbTvShow [];
  public pouchTvShow: any; // pouchtvshow // bufferedpouchtvshow (check for icons etc etc)

  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private pouchService: PouchService, private actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    const tmdbId = this.route.snapshot.params.id;
    this.tmdbTvShowDetailsDto = await this.tmdbService.getTvShowDetails(tmdbId);
    console.log(this.tmdbTvShowDetailsDto)
    this.similarTvShows = await this.tmdbService.getSimilarTvShows(tmdbId);
  
  }

  // public isBufferedPouchMovie() {
  //   return (this.pouchMovie instanceof BufferedPouchMovie);
  // }

  // public isPouchMovie() {
  //   return (this.pouchMovie instanceof PouchMovie);
  // }

  //replace with trailer thumbnail or? ...
  getBackdrop() {
    if (this.tmdbTvShowDetailsDto) {

      return `https://image.tmdb.org/t/p/w780${this.tmdbTvShowDetailsDto.backdrop_path}`;
    }
  }

  getPoster() {
    if (this.tmdbTvShowDetailsDto) {

      return `https://image.tmdb.org/t/p/w154${this.tmdbTvShowDetailsDto.poster_path}`;
    }
  }

  private generateSubtitleString() {
    const firstAirDate = new Date(this.tmdbTvShowDetailsDto.first_air_date);
    const lastAirDate = new Date(this.tmdbTvShowDetailsDto.last_air_date);
    let string = ``;
    string += firstAirDate.getFullYear().toString();
    string += '-';
    if(!this.tmdbTvShowDetailsDto.next_episode_to_air)
    {
      string += lastAirDate.getFullYear().toString();
    }
    string += '\t'
    string += this.timeConvert(this.tmdbTvShowDetailsDto.episode_run_time[0]);
    string += '\t'
    for (let i = 0; i < this.tmdbTvShowDetailsDto.genres.length; i++) {
      const genre = this.tmdbTvShowDetailsDto.genres[i] as TmdbGenre;
      string += genre.name;
      if (i != this.tmdbTvShowDetailsDto.genres.length - 1) {
        string += ", ";
      }
    }
    return string;
  }

  private timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if(rhours === 0)
    {
      return rminutes + "min";
    }
    if(rhours === 1 && minutes == 0)
      {  
        return "1h";
      }
    return rhours + "h " + rminutes + "min";

  }

  async presentActionSheet() {
    const addButtons = [{
      text: 'Download first episode',
      icon: 'add',
      handler: async () => 
       await this.addFirstEpisodeToBufferedTvShows()
    }, {
      text: 'Download first season',
      icon: 'cloud-download',
      handler: async () => await this.addToBufferedTvShows()
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
    const actionSheet = await this.actionSheetController.create({
      header: "test",
      buttons: addButtons
    });
    await actionSheet.present();
  }

  public async addToBufferedTvShows() {
    
    
    try {
      // build seasons



      const tvdbIdExternal = await this.tmdbService.getTvdbId(this.tmdbTvShowDetailsDto.id);
      const addTvShowDto: AddTvShowDTO = {
      addOptions: {
        ignoreEpisodesWithFiles: false,
        ignoreEpisodesWithoutFiles: false,
        searchForMissingEpisodes: false, 
      },
      qualityProfileId: 1,
      seasons: [{monitored: true,seasonNumber: 1}],
      title: this.tmdbTvShowDetailsDto.name,
      tvdbId: tvdbIdExternal, 
    }
      await this.pouchService.addBufferedTvShowToBufferedTvShowCollection(addTvShowDto);
    } catch (error) {
      console.log(error);
    }
    


    return Promise.resolve(true);
  }

  //refactor into something nice
  private generateSonarrSeasons(seasons: TmdbTvShowSeason [], first: boolean, last: boolean): SonarrSeason [] {
    
    const sonarrSeasons: SonarrSeason [] = [];
    seasons.forEach(s => {
      if(s.season_number === 1 && first)
      {
        sonarrSeasons.push({seasonNumber: s.season_number, monitored: true})
      }
      else {
        sonarrSeasons.push({seasonNumber: s.season_number, monitored: false});
      }
    });
    if(last)
    {
      sonarrSeasons[sonarrSeasons.length -1].monitored = true;
    }
    return sonarrSeasons;
  }


  public async addFirstEpisodeToBufferedTvShows() {
    try {
      const tvdbIdExternal = await this.tmdbService.getTvdbId(this.tmdbTvShowDetailsDto.id);
      const addTvShowDto: AddTvShowDTO = {
      addOptions: {
        ignoreEpisodesWithFiles: false,
        ignoreEpisodesWithoutFiles: false,
        searchForMissingEpisodes: false, 
      },
      qualityProfileId: 1,
      seasons: this.generateSonarrSeasons(this.tmdbTvShowDetailsDto.seasons, false, false),
      title: this.tmdbTvShowDetailsDto.name,
      tvdbId: tvdbIdExternal,
      episodes: [{seasonNumber: 1, episodeNumber: 1}]
    }
      await this.pouchService.addBufferedTvShowToBufferedTvShowCollection(addTvShowDto);
    } catch (error) {
      console.log(error);
    }
    return Promise.resolve(true);
  }



}
