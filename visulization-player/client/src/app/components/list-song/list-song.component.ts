import { Component } from '@angular/core';
import { WishListService } from '../services/wish-list.service';
@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.html',
  styleUrls: ['./list-song.scss'],
})
export class ListSongComponent {
  public isOpenMenuMore: boolean = false;

  wishList: any[] = []

  constructor(private wishListService: WishListService) {}

  ngOnInit(): void{
    this.wishList = this.wishListService.wishList
    console.log('=======???',this.wishList)
  }

  handleClickOpenMenu() {
    this.isOpenMenuMore = !this.isOpenMenuMore;
  }

  handleUnitThousand(value: number){
    // 100000 -> 100.000 -> 100k
    // 4000 -> 4.000 -> 4k
    if(value >= 1000 && value < 1000000){
      return Math.floor(value / 1000) + 'K'
    } else if( value >= 1000000){
      return Math.floor(value / 1000000) + 'M'
    } else {
      return value
    }
  }
  
}
