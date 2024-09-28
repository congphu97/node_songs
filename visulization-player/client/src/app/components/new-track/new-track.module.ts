import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewTrackComponent } from './new-track.component';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: NewTrackComponent }]),
  ],
  declarations: [NewTrackComponent],
  exports: [NewTrackComponent],
})
export class NewTrackModule {}
