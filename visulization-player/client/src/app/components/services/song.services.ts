import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SongService {
    public url = "http://localhost:3000";
    private apiKey = '985f273150e7119200350e8806fa2e15';
    private apiUrl = 'https://ws.audioscrobbler.com/2.0/';
  

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
      return this.http.get<string[]>(`${this.url}/api/songs`);
    }

    getSong(songTitle: string) {
      return this.http.get<any[]>(`${this.url}/api/search?keywork=${songTitle}`);
    }
}