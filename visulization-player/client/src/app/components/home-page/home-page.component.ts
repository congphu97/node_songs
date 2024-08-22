import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SongService } from '../services/song.services';
import { AudioVisualizerComponent } from '../visualization-player/audio-visualizer';
import { IAudio } from '../interfaces/audio.interface';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @ViewChildren('audio') audioPlayers!: QueryList<ElementRef<HTMLAudioElement>>;
  @ViewChild('rendererContainer') rendererContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('visualizer') visualizer!: AudioVisualizerComponent;

  duration = 0;
  currentTime = 0;
  isPlaying = false;
  volume = 100;
  mp3Files: string[] = [];
  test!:string;
  public stream!: string;
  public audio!: IAudio;

  get audioVisualize(): any {
    const audioElement = this.visualizer.audioElement;
    if (audioElement instanceof HTMLAudioElement) {
      return audioElement;
    }
  }
  constructor(private _songService: SongService) { }

  ngOnInit(): void {
    this._songService.currentAudio$.pipe()
    .subscribe((audio) => {
      console.log({audio})
      if (audio) {
        this.stream = `http://localhost:3000/api/play?url=${audio.url}`;
        this.audio = audio;
        this.duration = 0;
        this.currentTime = 0;
      }
    });
  }

  playAudio(): void {
    this.audioVisualize?.play();
  }

  pauseAudio(): void {
    this.audioVisualize?.pause();
  }

  stopAudio(): void {
    this.audioPlayers.forEach(audioPlayerRef => {
      const audioElement = audioPlayerRef.nativeElement;
      if (audioElement instanceof HTMLAudioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    });
    if (this.audioVisualize) {
      this.audioVisualize.pause();
      this.audioVisualize.currentTime = 0;
    }

  }

  updateProgress(): void {
    if (this.audioVisualize) {
      this.currentTime = this.audioVisualize.currentTime;
    }
  }

  initializeProgress(): void {
    if (this.audioVisualize) {
      console.log(this.audioVisualize.duration)
      this.duration = this.audioVisualize.duration;
    }
  }

  seekAudio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = Number(input.value);

    if (this.audioVisualize) {
      this.audioVisualize.currentTime = time;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  togglePlay() {
    this.isPlaying ? this.pauseAudio() : this.playAudio();
    this.isPlaying = !this.isPlaying;
  }

  nextTrack() { }
  prevTrack() { }

  setVolume() {
    // this.audioPlayers.forEach(audioPlayerRef => {
    //   const audioElement = audioPlayerRef.nativeElement;
    //   if (audioElement instanceof HTMLAudioElement) {
    //     audioElement.volume = this.volume / 100;
    //   }
    // });
    if (this.audioVisualize) {
      this.audioVisualize.volume = this.volume / 100;
    }
  }


}
