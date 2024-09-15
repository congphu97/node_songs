// main-view.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IAudio } from '../interfaces/audio.interface';
import { VisualizationAlbumComponent } from '../visualization-album/visualization-album.component';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
})
export class MainViewComponent {
  @Input() public audioItems: IAudio[] = [];

  constructor() {}

  ngOnInit(): void {}
}
