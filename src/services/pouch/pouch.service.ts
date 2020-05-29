// import { Movie } from './../../interfaces/Movie';
// import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb';  
// import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
// import { NetworkService } from 'src/services/network/network.service';
// import { PouchMovie } from 'src/interfaces/PouchMovie';
// import { PouchMovieDTO } from 'src/interfaces/PouchMovieDTO';
// import { BufferedPouchMovie } from 'src/interfaces/BufferedPouchMovie';
// import { AddMovieDTO } from 'src/interfaces/AddMovieCommandOptions';
// import { BufferedPouchMovieDTO } from 'src/interfaces/BufferedPouchMovieDTO';
// import { BehaviorSubject } from 'rxjs';
// import { TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';
// import { PouchTvShow } from 'src/interfaces/PouchTvShow';
// import { PouchTvShowDTO } from 'src/interfaces/PouchTvShowDTO';
// import { AddTvShowDTO } from 'src/interfaces/AddTvShowDTO';
// PouchDB.plugin(cordovaSqlitePlugin);


// @Injectable({
//   providedIn: 'root'
// })
// export class PouchService {





//   private moviesLiveReplication: any;
//   private bufferedMoviesLiveReplicationTo: any;
//   private bufferedMoviesLiveReplicationFrom: any;

//   public initialisation$: BehaviorSubject<boolean>;

//   public moviesInView: Array<Movie> = [];

  
//   constructor(private networkService: NetworkService) { 
//     this.initialisation$ = new BehaviorSubject<boolean>(undefined);
//     this.initialize();
//   }


//   public async initialize(): Promise<void> {
//     try { 
//       //todo: refactor
//       const inFullCollectionMovies = await this.setupMovieCollection();
//       const inBufferCollectionMovies = await this.setupBufferedMovieCollection();
//       const pouchTvShows = await this.setupTvShowCollection();
//       const bufferedTvShows =  await this.setupBufferedTvShowsCollection();

//       this.moviesInView = this.setupMoviesInView(inBufferCollectionMovies, inFullCollectionMovies);
//       await this.networkService.emitConnectedToNetworkOnInitialize();
//       await this.subscribeToNetworkStatus();
//       this.initialisation$.next(true);
//     } catch (error) {
//       console.log(error);
//     }
//   }


//   //todo:naming
//   private async setupMovieCollection(): Promise<PouchMovie []> {
//     this.movieCollection = new PouchDB('movieCollection.db', {adapter:'cordova-sqlite'}) //{adapter:'cordova-sqlite'})
//     return await this.getMoviesInMovieCollection();
//   }

//   //todo:naming
//   private async setupBufferedMovieCollection(): Promise<BufferedPouchMovie []> {
//     this.bufferedMovieCollection = new PouchDB('syncdb.db', {adapter:'cordova-sqlite'});
//     return await this.getBufferedMoviesInBufferedMovieCollection();
//   }

//   private async setupTvShowCollection() {
//     this.tvShowCollection = new PouchDB('tvShowCollection.db', {adapter:'cordova-sqlite'});
//     return await this.getTvShowsInTvShowCollection();
//   }

//   private async setupBufferedTvShowsCollection(): Promise<void> {
//     this.bufferedTvShowCollection = new PouchDB("tvShowSyncdb.db", {adapter:'cordova-sqlite'});
//     return await this.getBufferedTvShowsInBufferedTvShowCollection();
//   }

//   private setupMoviesInView(bufferedMovies: BufferedPouchMovie [], pouchMovies: PouchMovie[]): Array<Movie> {
//     return [].concat(bufferedMovies, pouchMovies);
//   }

//   private async handleChangesFromRemotePouch(info: any) {
//     const changedDocsFromRemote = info.docs as PouchMovieDTO [];
//     changedDocsFromRemote.forEach( async (pouchMovieDto: PouchMovieDTO) => {

//       if(pouchMovieDto._deleted) {
//         const removedIndex = this.moviesInView.findIndex(m => m._id === pouchMovieDto._id);
//         this.moviesInView.splice(removedIndex, 1);
//         return;
//       }
      
//       const updatedMovieIndex = this.moviesInView.findIndex(m => m.tmdbId === pouchMovieDto.tmdbId);
//       if(updatedMovieIndex !== -1) 
//       {
//         this.moviesInView[updatedMovieIndex].downloaded =  pouchMovieDto.downloaded;
//         this.moviesInView[updatedMovieIndex].monitored =  pouchMovieDto.monitored;
//         // add grabbed
//       }
//       else {
//         this.moviesInView.unshift(new PouchMovie(pouchMovieDto));
//       }

//     });
//   }

//   private async handleChangesFromRemoteTvShowsPouch(info: any) {

//   }

//   private replicationIsUndefined() {
//     return this.bufferedMoviesLiveReplicationFrom === undefined && this.bufferedMoviesLiveReplicationTo === undefined && this.moviesLiveReplication === undefined;
//   }

//   private async cancelReplication(): Promise<void> {
//     try {
//       await this.bufferedMoviesLiveReplicationTo.cancel();
//       await this.bufferedMoviesLiveReplicationFrom.cancel();
//       await this.moviesLiveReplication.cancel();
//       console.log("cancelled the live replication because we lost ssid access");
//     } catch (error) {
//       console.log(error);
//     }
  
//   }

//   private subscribeToNetworkStatus() {
//     this.networkService
//     .getNetworkStatus()
//     .subscribe(async (connectedToProvidedSSID: boolean) => {
//       if(connectedToProvidedSSID)
//       {
//         this.syncMovieCollection();
//         this.syncBufferedMovieCollection();
//         this.syncTvShowCollection();
//         this.syncBufferedTvShowCollection();
//       }

//       if(!connectedToProvidedSSID && !this.replicationIsUndefined())
//       {
//         await this.cancelReplication();
//         try {
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     });
//   }


//   private syncTvShowCollection() {
//     this.tvShowsLiveReplication = this.tvShowCollection.replicate.from(this.BACKEND_URL + 'tvShows', this.POUCH_LIVE_RETRY).on('change', (info) => {
//       this.handleChangesFromRemoteTvShowsPouch(info);
//     });

//   }

//   private syncBufferedTvShowCollection() {
//     this.bufferedTvShowsLiveReplicationFrom = this.bufferedTvShowCollection.replicate.from(this.BACKEND_URL + 'bufferedTvShows', this.POUCH_LIVE_RETRY).on('change', (info) => {
//       console.log(info);
//     });;
//     this.bufferedTvShowsLiveReplicationTo = this.bufferedTvShowCollection.replicate.to(this.BACKEND_URL + 'bufferedTvShows', this.POUCH_LIVE_RETRY);
//   }



//   private syncMovieCollection() {
//     this.moviesLiveReplication = this.movieCollection.replicate.from(this.BACKEND_URL + 'movies', this.POUCH_LIVE_RETRY).on('change', (info) => {
//       this.handleChangesFromRemotePouch(info);
//     });
//   }

//   private syncBufferedMovieCollection() {
//     this.bufferedMoviesLiveReplicationFrom = this.bufferedMovieCollection.replicate.from(this.BACKEND_URL + 'bufferedMovies', this.POUCH_LIVE_RETRY).on('change', (info) => {
//       const changedDocsFromRemote = info.docs as BufferedPouchMovieDTO [];
//       changedDocsFromRemote.forEach( async (bufferedPouchMovieDto: BufferedPouchMovieDTO) => {
//         if(bufferedPouchMovieDto._deleted) {
//           const removedIndex = this.moviesInView.findIndex(m => m._id === bufferedPouchMovieDto._id);
//           this.moviesInView.splice(removedIndex, 1);
//           return;
//         }})
//     });;
//     this.bufferedMoviesLiveReplicationTo = this.bufferedMovieCollection.replicate.to(this.BACKEND_URL + 'bufferedMovies', this.POUCH_LIVE_RETRY);
//   }

  


//   // backend handles conversion to full radarrmovie when connected
//   async addBufferedMovieToBufferedMovieCollection(bufferedPouchMovie: BufferedPouchMovie)
//   {
//     try {
//     await this.bufferedMovieCollection.put(bufferedPouchMovie);
//     this.moviesInView.unshift(bufferedPouchMovie);
//     } catch (error) {
//       console.log(`unable to add buffered movie to collection: ${error}`)
//     }
//   }

//   async addBufferedTvShowToBufferedTvShowCollection(bufferedPouchTvShow: AddTvShowDTO)
//   {
//     try {
//       bufferedPouchTvShow._id = bufferedPouchTvShow.tvdbId.toString();
//       await this.bufferedTvShowCollection.put(bufferedPouchTvShow);
 
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   public async updateBufferedMovieInBufferedMovieCollection(bufferedPouchMovie: BufferedPouchMovie) 
//   {
//     try {
//       const doc: BufferedPouchMovie = await this.bufferedMovieCollection.get(bufferedPouchMovie.tmdbId.toString());
//       bufferedPouchMovie._rev = doc._rev;
//       await this.bufferedMovieCollection.put(bufferedPouchMovie);
      
//     } catch (error) {
//       console.log(error);
//       console.log("error updating buffered movie");
//     }
//   }

//   private async deleteBufferedPouchMovieFromCollection(tmdbId: number) {
//     try {
//       const doc = await this.bufferedMovieCollection.get(tmdbId.toString());
//       await this.bufferedMovieCollection.remove(doc);
//     } catch (error) {
//       console.log(error);
//     }
//   }



//   private deleteMovieFromMoviesInView(tmdbId: number) {
//     const removedIndex = this.moviesInView.findIndex(m => m.tmdbId === tmdbId);
//     this.moviesInView.splice(removedIndex, 1);
//   }



//   public async deleteMovieFromPouchAndLocal(movie: Movie)
//   {
//     if(movie instanceof BufferedPouchMovie)
//     {
//       await this.deleteBufferedPouchMovieFromCollection(movie.tmdbId);
//     } else {
//       await this.deletePouchMovieFromCollection(movie.tmdbId);
//     }
//     this.deleteMovieFromMoviesInView(movie.tmdbId);
//   }


//   // needed? we only replicate FROM so... TODO
//   private async deletePouchMovieFromCollection(tmdbId: number) {
//     try {

      
//       await this.movieCollection.remove(tmdbId.toString());
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getMoviesInMovieCollection(): Promise<PouchMovie []> {
//     try {
//       const allDocs = await this.movieCollection.allDocs({include_docs: true});
//       let pouchMovies: PouchMovie [] = [];
//       allDocs.rows.forEach(doc => {
//         const pouchMovieDto = doc.doc as PouchMovieDTO;
//         pouchMovies.push(new PouchMovie(pouchMovieDto));
//       }); 
//       return pouchMovies;
      
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//   async getTvShowsInTvShowCollection(): Promise<PouchTvShow []> {
//     try {
//       const allDocs = await this.tvShowCollection.allDocs({include_docs: true});
//       let pouchTvShows: PouchTvShow [] = [];
//       allDocs.rows.forEach(doc => {
//         const pouchTvShowDto = doc.doc as PouchTvShowDTO;
//         pouchTvShows.push(pouchTvShowDto as PouchTvShow);
//       }); 
//       return pouchTvShows;
      
//     } catch (error) {
//       console.log(error);
      
//     }
//   }

//   async getBufferedMoviesInBufferedMovieCollection(): Promise<BufferedPouchMovie []>  {
//     try {
//       const allDocs = await this.bufferedMovieCollection.allDocs({include_docs: true});
//       const bufferedPouchMovies: BufferedPouchMovie [] = [];
//       allDocs.rows.forEach(doc => {
//         const bufferedMovieDto = doc.doc as BufferedPouchMovieDTO;
//         const addMovieDto = bufferedMovieDto as AddMovieDTO;
//         const tmdbMovie =  bufferedMovieDto as TmdbMovieResultDTO;
//         const bufferedPouchMovie = new BufferedPouchMovie(tmdbMovie, addMovieDto);
//         bufferedPouchMovies.push(bufferedPouchMovie);
//       });
//       return bufferedPouchMovies;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async getBufferedTvShowsInBufferedTvShowCollection() {
//     try {
//       const allDocs = await this.bufferedTvShowCollection.allDocs({include_docs: true});
     
//     } catch (err) {
//       console.log(err);
//     }
//   }


//    public isInCollectionOrBufferedMovieCollection(tmdbId: number): boolean {
//     //return (this.movies.findIndex(m => m.tmdbId == tmdbId) !== -1) ||(this.bufferedMovies.findIndex(m => m.tmdbId == tmdbId) !== -1);
//     return (this.moviesInView.findIndex(m => m.tmdbId == tmdbId) !== -1);
//   }


//   // async getCollectionMovies(): Promise<RadarrMovie []> {
//   //   try {
//   //     const allDocs = await this.collectiondb.allDocs({
//   //       include_docs: true,
//   //     });
//   //     let radarrMovies: RadarrMovie [] = [];
//   //     allDocs.rows.forEach(movie => {
//   //       radarrMovies.push(new RadarrMovie(movie.doc));
//   //     }); 
//   //     return radarrMovies;
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }



//   //used with difference or initial setup
//   // async addRadarrMoviesToCollectionPouchDB(radarrMovies: RadarrMovie []) {
//   //     try {
//   //       radarrMovies.forEach(async (radarrMovie: RadarrMovie) => {
//   //         const movieWithImages = await this.movieService.getImages(radarrMovie);
//   //         await this.addToCollectionPouchDB(movieWithImages);
//   //       });
//   //     } catch (error) {
//   //       console.log("could not access local backend")
//   //     }
//   // }



  
// }
