import { Injectable } from '@angular/core';
import * as Moment from 'moment';
import Axios, { AxiosResponse } from 'axios';
import { TmdbMovie } from 'src/interfaces/TmdbMovie';
import { TmdbResponse } from 'src/interfaces/TmdbResponse';
import { TmdbMovieDetailsDTO } from 'src/interfaces/TmdbMovieDetailsDTO';
import { TmdbMovieResultDTO } from 'src/interfaces/TmdbMovieResultDTO';
import { TmdbTvShow } from 'src/interfaces/TmdbTvShow';
import { TmdbTvShowResultDTO } from 'src/interfaces/TmdbTvShowResultDTO';
import { TmdbTvShowDetailsDTO } from 'src/interfaces/TmdbTvShowDetailsDTO';
import { TmdbTvShowSeasonDetailed } from 'src/interfaces/TmdbTvShowSeasonDetailed';


@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private TMDB_API_KEY: string = "4e60ba1292b6c1d4bbf05e0fe3542a92"; //todo: move to nestjs container env!

  constructor() { }


  async getTvdbId(id: number): Promise<string> {
    const url = `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    return axiosResponse.data.tvdb_id;
  } 

  async getUpcomingTmdbMovies(): Promise<TmdbMovie []>{

    const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    let movies: TmdbMovie [] = [];
    tmdbResponse.results.forEach((tmdbMovieResultDto: TmdbMovieResultDTO ) => {
      movies.push(new TmdbMovie(tmdbMovieResultDto));
    });
    return movies;
  }

  async getNowPlayingTmdbMovies(): Promise<TmdbMovie []>{

    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    const movies: TmdbMovie [] = [];
    tmdbResponse.results.forEach((tmdbMovieResultDto: TmdbMovieResultDTO ) => {
      movies.push(new TmdbMovie(tmdbMovieResultDto));
    });
    return movies;
  }

  async getOnTheAirTmdbTvShows(): Promise<TmdbTvShow []> {
    const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    const tvShows: TmdbTvShow [] = [];
    tmdbResponse.results.forEach((tmdbTvShowResultDto: TmdbTvShowResultDTO ) => {
      tvShows.push(new TmdbTvShow(tmdbTvShowResultDto));
    });
    return tvShows;
  }

// /tv/popular

async getPopularTmdbTvShows(): Promise<TmdbTvShow []> {
  const url = `https://api.themoviedb.org/3/tv/popular?api_key=${this.TMDB_API_KEY}`;
  const axiosResponse: AxiosResponse<any> = await Axios.get(url);
  const tmdbResponse = axiosResponse.data as TmdbResponse;
  const tvShows: TmdbTvShow [] = [];
  tmdbResponse.results.forEach((tmdbTvShowResultDto: TmdbTvShowResultDTO ) => {
    tvShows.push(new TmdbTvShow(tmdbTvShowResultDto));
  });
  return tvShows;
} 

  public async getMovieDetails(tmdbId: number): Promise<TmdbMovieDetailsDTO>
  {
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}}?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    return axiosResponse.data as TmdbMovieDetailsDTO;
  }

  public async getTvShowDetails(tmdbId: number): Promise<TmdbTvShowDetailsDTO>
  {
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}}?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    return  axiosResponse.data as TmdbTvShowDetailsDTO;
  }
  
  public async getSimilarMovies(tmdbId: number): Promise<TmdbMovie []> {
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}}/similar?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    let movies: TmdbMovie [] = [];
    tmdbResponse.results.forEach((tmdbMovieResultDto: TmdbMovieResultDTO ) => {
      movies.push(new TmdbMovie(tmdbMovieResultDto));
    });
    return movies;
  }

  public async getSimilarTvShows(tmdbId: number): Promise<TmdbTvShow []> {
    const url = `https://api.themoviedb.org/3/tv/${tmdbId}}/similar?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    let tvshows: TmdbTvShow [] = [];
    tmdbResponse.results.forEach((tmdbTvShowResultDto: TmdbTvShowResultDTO ) => {
      tvshows.push(new TmdbTvShow(tmdbTvShowResultDto));
    });
    return tvshows;
  }
  
  public async getMovieRecommendations(tmdbId: number): Promise<TmdbMovie []> {
    const url = `https://api.themoviedb.org/3/movie/${tmdbId}}/recommendations?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    const tmdbResponse = axiosResponse.data as TmdbResponse;
    const movies: TmdbMovie [] = [];
    tmdbResponse.results.forEach((tmdbMovieResultDto: TmdbMovieResultDTO ) => {
      movies.push(new TmdbMovie(tmdbMovieResultDto));
    });
    return movies;
  }

  public async getTvShowSeasonDetailed(tv_id: number, season_number: number): Promise<TmdbTvShowSeasonDetailed>
  {
    const url = `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}?api_key=${this.TMDB_API_KEY}`;
    const axiosResponse: AxiosResponse<any> = await Axios.get(url);
    return axiosResponse.data as TmdbTvShowSeasonDetailed;
  }
  


  // async getImages(raddarrMovie: RadarrMovie): Promise<RadarrMovie>
  // {
  //   const url = `https://api.themoviedb.org/3/movie/${raddarrMovie.tmdbId}/images?api_key=${this.TMDB_API_KEY}`;
  //   try {
  //     const axiosResponse: AxiosResponse<any> = await Axios.get(url);
  //     const imagesDto = axiosResponse.data as ImagesDTO;
  //     raddarrMovie.setBackdrop(imagesDto.backdrops[0].file_path);
  //     raddarrMovie.setPoster(imagesDto.posters[0].file_path);
  //     return raddarrMovie;
  //   } catch (error) {
  //     console.log("could not retrieve images")
  //   }

  // }


}
