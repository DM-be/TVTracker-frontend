# Movietracker-frontend

## Description

Application built in ionic v4 that integrates with a backend server. 
It's use is to discover new movies/tvshows and adding them to a "collection" for later viewing.
It uses a local CouchDB (PouchDB) that synchronizes to a remote CouchDB, usually hosted on the same devices as the backend. 
The remote backend server listens to synchronisation events. On adding a new movie or TV show it communicates with the 
<a href="https://sonarr.tv/"> Sonarr</a> and <a href="https://radarr.video/"> Radarr</a> API.

The collection can be connected to a streaming application such as Kodi. 
It uses the TMDB API to get information about in cinema movies, upcoming movies, popular TV shows,...

The goal of this application is to release it for open source development in collaboration with maintainers of Radarr and Sonarr. 

## Features
* view upcoming/now playing in cinema movies
* get suggestions based on the movie/TV show you are viewing
* add new movies and TV shows and let Radarr and Sonarr handle the rest!
* automatically turns on wi-fi and checks for a connection with your local backend server 
* skeleton placeholders when loading components
* lazy loading images
* optimized infinite scroll collection (only movies/shows in view are loaded and rendered)

## Recommended use
As of this moment this application is designed to support a device hosted in your local network running both a PouchDB server and a backend server on the same device. 
A configure script will be provided on release to enter details such as SSID and IP addresses.

## Installation and building
Coming soon

## Upcoming features and functionality
* add TV shows on a per episode basis
* database conversion to Firebase (eliminates the need for a backend in your local network)
* rating collection filtering option
* search movies/TV shows based on title
* search movies/TV shows based on a keyword ('animated', 'bigfoot',...)


#### Discover movies

![lazy loading images](https://media.giphy.com/media/VbyRnlifzthMOQ6h2j/giphy.gif) ![dl movies](https://media.giphy.com/media/IciueVTEN7IsDyly5j/giphy.gif) 

#### Discover TV shows 

![dl shows](https://media.giphy.com/media/Y3wjYbSVJhJSWPkw1J/giphy.gif) ![dl shows detail](https://media.giphy.com/media/JmOWoSHLyITcNTJm1a/giphy.gif)

#### Real time collection overview with infinite scrolling and filtering 

![collection-overview](https://media.giphy.com/media/dzCmi9PqA6Bf3Vj24L/giphy.gif) ![collection-filter](https://media.giphy.com/media/h1oUfnkGzqNGJYjvCY/giphy.gif) ![collection-add-example](https://media.giphy.com/media/cjykHOKy1eOqA6T10Q/giphy.gif)




