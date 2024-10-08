import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AudioVisualizerComponent } from './components/visualization-player/audio-visualizer';
import { StickyPlayerComponent } from './components/sticky-player/sticky-player.component';
import { VisualizationSpacemanComponent } from './components/visualization-spaceman/visualization-spaceman.component';
import { MusicItemsComponent } from './components/music-items/music-items.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { VisualizationControlsComponent } from './components/visualization-controls/visualization-controls.component';
import { VisualizationYoutubeComponent } from './components/visualization-youtube/visualization-youtube.component';
import { VisualizationAlbumComponent } from './components/visualization-album/visualization-album.component';
import { IonicModule } from '@ionic/angular';
import { DashBoardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { ListSongComponent } from './components/list-song/list-song.component';
import { BottomComponent } from './components/bottom/bottom.component';
import { TabMenuMobile } from './components/tab-bottom/tab-menu.component';
import { NewTrackComponent } from './components/new-track/new-track.component';
import { RecentlyPlayedComponent } from './components/recently-played/recently-played.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AudioVisualizerComponent,
    StickyPlayerComponent,
    VisualizationSpacemanComponent,
    MusicItemsComponent,
    DashBoardComponent,
    DashBoardHeaderComponent,
    VisualizationControlsComponent,
    VisualizationYoutubeComponent,
    VisualizationAlbumComponent,
    MainViewComponent,
    ListSongComponent,
    BottomComponent,
    TabMenuMobile,
    RecentlyPlayedComponent,
    NewTrackComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(), // Initialize Ionic,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
