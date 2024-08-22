import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IAudio } from '../interfaces/audio.interface';
@Injectable({
  providedIn: 'root',
})
export class SongService {

    public currentAudio$: Subject<IAudio> = new Subject();
    public url = environment.songApi;

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
      return this.http.get<string[]>(`${this.url}/api/songs`);
    }

    getListAudio(songTitle: string) {
      return this.http.get<any[]>(`${this.url}/api/search?keyword=${songTitle}`);
    }

    getAudio(url: string) {
      return this.http.get<any[]>(`${this.url}/api/play?url=${url}`);
    }
}