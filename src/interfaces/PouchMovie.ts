// import { TmdbMovie } from 'src/interfaces/TmdbMovie';
// import { Movie } from './Movie';
// import { RadarrImage } from "./RadarrImage";
// import { PouchMovieDTO } from './PouchMovieDTO';


// export class PouchMovie extends TmdbMovie {
//     title: string;
//     tmdbId: number;
//     overview: string;
//     poster: string;
//     backDrop: string;

//     downloaded: boolean;
//     monitored: boolean;
//     grabbed?: boolean;
//     radarrId: number;
//     _id: string;
//     _rev: string;
//     images: RadarrImage [];

//     constructor(pouchMovieDto: PouchMovieDTO) {
//         this.title = pouchMovieDto.title;
//         this.overview = pouchMovieDto.overview;
//         this.downloaded = pouchMovieDto.downloaded;
//         this.monitored = pouchMovieDto.monitored;
//         this.radarrId = pouchMovieDto.radarrId;
//         this.tmdbId = pouchMovieDto.tmdbId;
//         this.images = pouchMovieDto.images;
//         this.setPoster();
//         this.setBackDrop();
//     }

//     setPoster() {
//         const originalPosterRadarrImage = this.images.filter(i => i.coverType === "poster")[0] as RadarrImage;
//         if(originalPosterRadarrImage)
//         {
//             const filePath = originalPosterRadarrImage.url.split("/").pop();
//             this.poster_path = filePath;
//             this.poster = `https://image.tmdb.org/t/p/w185/${this.poster_path}`;
//         }
//     }

//     setBackDrop() {
//         const originalBackdropRadarrImage = this.images.filter(i => i.coverType === "fanart")[0] as RadarrImage;
//         if(originalBackdropRadarrImage)
//         {
//             const filePath = originalBackdropRadarrImage.url.toString().split("/").pop();
//             this.backdrop_path = filePath;
//             this.backdrop = `https://image.tmdb.org/t/p/w154/${this.poster_path}`;
//         }
//     }

//     public getMonitoredIcon() {
//         if(this.monitored)
//         {
//           return "eye";
//         }
//         return "eye-off"
//       }
//      public getDownloadColor() {
//           if(this.downloaded)
//           {
//               return "success"
//           }
//           return "";
//       }
    
    
 

// }