import { Component, Input, OnInit } from '@angular/core';
import { SongService } from '../services/song.services';
import { IAudio } from '../interfaces/audio.interface';

@Component({
  selector: 'app-music-items',
  templateUrl: './music-items.component.html',
  styleUrls: ['./music-items.component.scss']
})
export class MusicItemsComponent implements OnInit {

  @Input() public audioItems: IAudio[] = [];

  constructor(private _songService: SongService) { }

  ngOnInit(): void {

  }

  playSong(audio: IAudio) {
    this._songService.currentAudio$.next(audio);
  }

}
