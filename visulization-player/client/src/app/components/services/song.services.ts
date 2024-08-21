import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SongService {
    public url = "https://visualization-api.netlify.app";

    constructor(private http: HttpClient) { }

    getData(): Observable<any> {
      return this.http.get<string[]>(`${this.url}/api/songs`);
    }

    getSong(songTitle: string) {
      return this.http.get<any[]>(`${this.url}/api/search?keyword=${songTitle}`);
    }
}