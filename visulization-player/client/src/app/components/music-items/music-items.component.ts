import { Component, OnInit } from '@angular/core';
import { SongService } from '../services/song.services';
import { IAudio } from '../interfaces/audio.interface';

@Component({
  selector: 'app-music-items',
  templateUrl: './music-items.component.html',
  styleUrls: ['./music-items.component.scss']
})
export class MusicItemsComponent implements OnInit {

  public search!: string;
  public audioItems: IAudio[] = [];

  constructor(private _songService: SongService) { }

  ngOnInit(): void {

  }

  searchChange(event: any) {
    console.log(event)
    this._songService.getSong(event.target.value).subscribe((rs) => this.audioItems = rs );
  }
}
