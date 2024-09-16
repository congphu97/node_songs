import { Injectable } from '@angular/core';
import { IWishList } from '../interfaces/wish-list.interface';
@Injectable({
  providedIn: 'root'
})
export class WishListService {

  wishList: IWishList[] =[ 
    {
        image: 'https://avatarfiles.alphacoders.com/189/thumb-1920-189957.jpg',
        title: 'title musuc',
        author: 'hieuthuhai',
        like: 99999,
        repost: 99999,
        comments: 100000,
        views: 1000000,
    },
    {
        image: 'https://avatarfiles.alphacoders.com/189/thumb-1920-189957.jpg',
        title: 'title musuc',
        author: 'hieuthuhai',
        like: 99999,
        repost: 99999,
        comments: 100000,
        views: 1000000,
    },
    {
        image: 'https://avatarfiles.alphacoders.com/189/thumb-1920-189957.jpg',
        title: 'title musuc',
        author: 'hieuthuhai',
        like: 99999,
        repost: 99999,
        comments: 100000,
        views: 1000000,
    },{
        image: 'https://avatarfiles.alphacoders.com/189/thumb-1920-189957.jpg',
        title: 'title musuc',
        author: 'hieuthuhai',
        like: 99999,
        repost: 99999,
        comments: 100000,
        views: 1000000,
    }
    
  ]
 
}