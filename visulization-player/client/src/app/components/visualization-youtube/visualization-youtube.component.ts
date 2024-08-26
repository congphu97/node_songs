import { Component, Input } from '@angular/core';
import { IAudio } from '../interfaces/audio.interface';
import { SongService } from '../services/song.services';

@Component({
  selector: 'app-visualization-youtube',
  templateUrl: './visualization-youtube.component.html',
  styleUrls: ['./visualization-youtube.component.scss']
})
export class VisualizationYoutubeComponent {

  @Input() audioUrl: string | undefined;

  public duration: number | undefined = 0;
  public currentTime: number = 0;
  public isPlaying = false;
  public volume = 100;
  public audio!: IAudio;
  private player: YT.Player | undefined;
  private timer: any;

  constructor(private _songService: SongService) { }

  ngOnInit(): void {
    // Check if the YouTube API script is already loaded
    if (!YT) {
      this.onYouTubeIframeAPIReady();
    } else {
      // Load the YouTube API script
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
      script.onload = () => this.onYouTubeIframeAPIReady();
      script.onerror = () => console.error('Failed to load YouTube API script');
    }

    this._songService.currentAudio$.pipe()
      .subscribe((audio) => {
        console.log({ audio })
        if (audio) {
          this.audio = audio;
          this.duration = 0;
          this.currentTime = 0;
          if (this.player) {
            this.player.loadVideoById(this.audio.id);
            this.isPlaying = true;
          } else {
            this.onYouTubeIframeAPIReady();
          }
        }
      });
  }

  ngOnDestroy(): void {
    // Clean up the player instance
    if (this.player) {
      this.player.destroy();
    }
  }

  onYouTubeIframeAPIReady(): void {
    this.player = new YT.Player('youtube-player', {
      height: '390',
      width: '640',
      videoId: '', // Example video ID
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this),
      }
    });
  }

  onPlayerReady(event: YT.PlayerEvent): void {
    console.log('Player ready', event);

  }

  onPlayerStateChange(event: YT.OnStateChangeEvent): void {
    console.log('Player state changed: ', event);
    this.initializeProgress();
    setInterval(() => this.updateProgress());
  }

  playAudio(): void {
    if (this.player) {
      this.player.playVideo();
    }
  }

  pauseAudio(): void {
    if (this.player) {
      this.player.pauseVideo();
    };
  }

  initializeProgress(): void {
    this.duration = this.player?.getDuration();
  }

  updateProgress() {
    if (this.player) {
      this.currentTime = this.player?.getCurrentTime();
    }
  }

  seekAudio(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = Number(input.value);

    if (this.player) {
      this.player.seekTo(time, true);
      this.currentTime = time;
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

  setVolume(volumne: number) {
    this.player?.setVolume(volumne);
  }

}
