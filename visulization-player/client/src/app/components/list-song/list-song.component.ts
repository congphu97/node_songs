import { Component } from '@angular/core';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.html',
  styleUrls: ['./list-song.scss'],
})
export class ListSong {
  isOpenMenuMore: boolean = false;

  handleClickOpenMenu() {
    this.isOpenMenuMore = !this.isOpenMenuMore;
  }
}
