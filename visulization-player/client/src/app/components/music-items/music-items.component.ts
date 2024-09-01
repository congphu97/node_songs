import { Component, Input, OnInit } from '@angular/core';
import { SongService } from '../services/song.services';
import { IAudio } from '../interfaces/audio.interface';
import { ModalController } from '@ionic/angular';
import { VisualizationAlbumComponent } from '../visualization-album/visualization-album.component';

@Component({
  selector: 'app-music-items',
  templateUrl: './music-items.component.html',
  styleUrls: ['./music-items.component.scss']
})
export class MusicItemsComponent implements OnInit {

  @Input() public audioItems: IAudio[] = [];

  constructor(private _songService: SongService, private _modalCtrl: ModalController) { }

  ngOnInit(): void {

  }

  async playSong(audio: IAudio) {
    // this._songService.currentAudio$.next(audio);

    const modal = await this._modalCtrl.create({
      component: VisualizationAlbumComponent,
      componentProps: { audio, audioItems: this.audioItems },
    })

    modal.present();
  }

}
