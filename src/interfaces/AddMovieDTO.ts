import { AddOptions } from "./AddOptions";

export interface AddMovieDTO {
    tmdbId: number;
    monitored: boolean;
    qualityProfileId: number;
    addOptions: AddOptions
    _id?: string;
}

/*

{
  "_id": "8a552cc5-66d8-4894-97ee-d6db77cd8e96",
  "tmdbId": 348350,
  "monitored": false,
  "qualityProfileId": 6,
  "addOptions" : { "searchForMovie": false}
}

*/