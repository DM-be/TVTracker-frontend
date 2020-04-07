import { AddOptions } from './AddOptions';
import { TmdbMovie } from './TmdbMovie';
import { AddMovieDTO } from './AddMovieDTO';
import { TmdbMovieResultDTO } from './TmdbMovieResultDTO';


export class BufferedPouchMovie extends TmdbMovie {
    tmdbId: number;
    monitored: boolean;
    qualityProfileId: number;
    addOptions: AddOptions
    _id: string;
    _rev?: string;

    grabbed?: boolean;
    downloaded?: boolean; // remove

    constructor(tmdbMovieResultDto: TmdbMovieResultDTO, addMovieDto: AddMovieDTO) {
        super(tmdbMovieResultDto);
        this.tmdbId = tmdbMovieResultDto.id;
        this.monitored = addMovieDto.monitored;
        this.qualityProfileId = addMovieDto.qualityProfileId;
        this.addOptions = addMovieDto.addOptions;
        this._id = tmdbMovieResultDto.id.toString();
    }
    
}