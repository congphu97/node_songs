import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-visualization-album',
  templateUrl: './visualization-album.component.html',
  styleUrls: ['./visualization-album.component.scss']
})
export class VisualizationAlbumComponent implements OnInit {
  @ViewChild(IonModal) public modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  public name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  ngOnInit(): void {}
  onWillDismiss(event: Event) {
    // const ev = event as CustomEvent<OverlayEventDetail<string>>;
    // if (ev.detail.role === 'confirm') {
    //   this.message = `Hello, ${ev.detail.data}!`;
    // }
  }
}
