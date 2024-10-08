import { Component, EventEmitter, Output } from '@angular/core';
import { IAudio } from '../interfaces/audio.interface';
import { SongService } from '../services/song.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashBoardHeaderComponent {
  public search!: string;
  @Output() audioItems = new EventEmitter<IAudio[]>();
  constructor(private _songService: SongService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  searchChange(event: any) {
    console.log(' =======>>>', this._songService
      .getListAudio(event.target.value)
      .subscribe((result) => (this.audioItems.emit(result))))
  }

  goToUserDetail() {
    this.router.navigate(['user-detail']);
  }

}
