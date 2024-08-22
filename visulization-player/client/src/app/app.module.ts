import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AudioVisualizerComponent,
    StickyPlayerComponent,
    VisualizationSpacemanComponent,
    MusicItemsComponent,
    DashBoardComponent,
    VisualizationControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
