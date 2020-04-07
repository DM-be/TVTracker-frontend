import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


// const routes: Routes = [
//   { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
//   { path: 'movie-detail', loadChildren: './movie-detail/movie-detail.module#MovieDetailPageModule' }
// ];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'discoverMovies',
    pathMatch: 'full'
  },
  {
    path: 'discoverMovies',
    loadChildren:  "./discover-movies/discover-movies.module#DiscoverMoviesPageModule"
  },
  {
    path: 'discoverTv',
    loadChildren:  "./discover-tv/discover-tv.module#DiscoverTvPageModule"
  },
  {
    path: 'collection',
    loadChildren: './collection/collection.module#CollectionPageModule'
  },
  { path: 'movie-detail', loadChildren: './movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'tvshow-detail', loadChildren: './tvshow-detail/tvshow-detail.module#TvshowDetailPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules} )
  ],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule {}
