import { Component } from '@angular/core';
import { IAudio } from '../components/interfaces/audio.interface';
import { SongService } from '../components/services/song.services';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent {

  public search!: string;
  public audioItems: IAudio[] = [];

  constructor(private _songService: SongService) { }

  ngOnInit(): void {
  }

  searchChange(event: any) {
    this._songService.getListAudio(event.target.value).subscribe((rs) => this.audioItems = rs );
  }

  onSearchResults(audioItems: IAudio[]) {
    console.log('========>>> audioItems', audioItems)
    this.audioItems = audioItems;
  }
  
}