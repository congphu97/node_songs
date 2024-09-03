import { Component } from '@angular/core';
import { IAudio } from '../interfaces/audio.interface';
import { SongService } from '../services/song.services';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashBoardHeaderComponent {
  public search!: string;
  public audioItems: IAudio[] = [];

  constructor(private _songService: SongService) {}

  ngOnInit(): void {}

  searchChange(event: any) {
    this._songService
      .getListAudio(event.target.value)
      .subscribe((rs) => (this.audioItems = rs));
  }
}
