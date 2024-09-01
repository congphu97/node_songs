import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { IAudio } from '../interfaces/audio.interface';

@Component({
  selector: 'app-visualization-album',
  templateUrl: './visualization-album.component.html',
  styleUrls: ['./visualization-album.component.scss']
})
export class VisualizationAlbumComponent implements OnInit {

  @Input() public audio!: IAudio;
  @Input() public audioItems: IAudio[] = [];

  constructor(private modalCtrl: ModalController) {
    console.log(this.audio)
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss(null, 'confirm');
  }
  ngOnInit(): void {}
  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }
}
