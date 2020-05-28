import { AddOptions } from './AddOptions';
import { RadarrImage } from './RadarrImage';
export interface RadarrMovie {


    _id?: string; // maybe decorate the class with per data layer specifics????
    _deleted?: boolean;


    grabbed: boolean; // custom
    downloaded: boolean; 
    monitored: boolean;
    overview: string;
    title: string;
    images: RadarrImage [];
    addOptions: AddOptions; // delete property after successfull addding


   
 //   sortTitle: string;
 //   sizeOnDisk: number;
    status?: string;
   
    inCinemas?: string;
 
 //   website: string;
   
    year?: number;
    hasFile?: boolean;
    youTubeTrailerId?: string;
    studio?: string;
    path?: string;
    profileId?: number;
 
//    minimumAvailability: string;
 //   runtime: number;
    lastInfoSync?: string;
    cleanTitle?: string;
    imdbId?: string;
    tmdbId: number;
    titleSlug?: string;
    genres?: string [];
    tags?: [];
    added?: string;
    ratings?: {
        votes: number;
        value: number;
    };
    alternativeTitles?: string []
    qualityProfileId?: number;
    id?: number;
    rootFolderPath?: string;

}