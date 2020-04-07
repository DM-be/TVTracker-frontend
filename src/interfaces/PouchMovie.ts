import { RadarrImage } from "./RadarrImage";
import { PouchMovieDTO } from './PouchMovieDTO';


export class PouchMovie {
    title: string;
    overview: string;
    downloaded: boolean;
    monitored: boolean;
    grabbed?: boolean;
    tmdbId: number;
    id: number;
    _id: string;
    _rev: string;
    images: RadarrImage [];


    poster_path: string;
    backdrop_path: string;

    poster: string;
    backdrop: string;

    constructor(pouchMovieDto: PouchMovieDTO) {
        this.title = pouchMovieDto.title;
        this.overview = pouchMovieDto.overview;
        this.downloaded = pouchMovieDto.downloaded;
        this.monitored = pouchMovieDto.monitored;
        this.id = pouchMovieDto.id;
        this.tmdbId = pouchMovieDto.tmdbId;
        this.images = pouchMovieDto.images;
        this.setPoster();
        this.setBackdrop();

    }

    private setPoster() {
        const originalPosterRadarrImage = this.images.filter(i => i.coverType === "poster")[0] as RadarrImage;
        if(originalPosterRadarrImage)
        {
            const filePath = originalPosterRadarrImage.url.split("/").pop();
            this.poster_path = filePath;
            this.poster = `https://image.tmdb.org/t/p/w185/${this.poster_path}`;
        }
    
    }

    private setBackdrop() {
        const originalBackdropRadarrImage = this.images.filter(i => i.coverType === "fanart")[0] as RadarrImage;
        if(originalBackdropRadarrImage)
        {
            const filePath = originalBackdropRadarrImage.url.toString().split("/").pop();
            this.backdrop_path = filePath;
            this.backdrop = `https://image.tmdb.org/t/p/w154/${this.poster_path}`;
        }
        
    }

    public getBackdrop() {
        return this.backdrop;
    }

    public getPoster() {
        return this.poster;
    }

    getMonitoredIcon() {
        if(this.monitored)
        {
          return "eye";
        }
        return "eye-off"
      }
    
      getDownloadColor() {
          if(this.downloaded)
          {
              return "success"
          }
          return "";
      }
    
    
 

}