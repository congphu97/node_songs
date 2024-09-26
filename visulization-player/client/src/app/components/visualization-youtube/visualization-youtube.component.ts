import { Component, Input, OnInit } from '@angular/core';
import { IAudio, ILyrics } from '../interfaces/audio.interface';
import { SongService } from '../services/song.services';
import { PLAYER_STATUS } from '../enums/audio.enum';

@Component({
  selector: 'app-visualization-youtube',
  templateUrl: './visualization-youtube.component.html',
  styleUrls: ['./visualization-youtube.component.scss']
})
export class VisualizationYoutubeComponent {

  @Input() audio!: IAudio;
  @Input() audioItems: IAudio[] = [];
  @Input() audioUrl: string | undefined;
  @Input() isShowDetail!: boolean;

  public duration: number | undefined = 0;
  public currentTime: number = 0;
  public isPlaying = false;
  public volume = 100;
  public playerStatus  = PLAYER_STATUS;
  public currentPlayerStatus: number = 0;
  public lyrics: ILyrics[] = [];

  private player: YT.Player | undefined;

  constructor(private _songService: SongService) { }

  ngOnInit(): void {
    if (!YT) {
      this.onYouTubeIframeAPIReady();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
      script.onload = () => this.onYouTubeIframeAPIReady();
      script.onerror = () => console.error('Failed to load YouTube API script');
    }

    // this._songService.currentAudio$.pipe()
    //   .subscribe((audio) => {
    //     if (audio) {
    //       console.log({audio})
    //       this.audio = audio;
    //       this.duration = 0;
    //       this.currentTime = 0;
    //       if (this.player) {
    //         this.player.loadVideoById(this.audio.id);
    //         this.isPlaying = true;
    //       } else {
    //         this.onYouTubeIframeAPIReady();
    //       }
    //     }
    //   });

    this._songService.getLyrics(this.audio.id).subscribe((rs) => {
      console.log(rs);
      this.lyrics = rs;
    })

  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
    }
  }

  onYouTubeIframeAPIReady(): void {
    this.player = new YT.Player('youtube-player', {
      height: '390',
      width: '640',
      videoId: this.audio.id,
      playerVars: {
        'autoplay': 1,
      },
      events: {
        'onReady': this.onPlayerReady.bind(this),
        'onStateChange': this.onPlayerStateChange.bind(this),
      }
    });
  }

  onPlayerReady(event: YT.PlayerEvent): void {
    console.log('Player ready', event);
    this.isPlaying = true;
  }

  onLyricsProgress(lyric: ILyrics, index: number) {
    const { start, dur } = lyric;
    const inDuringtime: boolean = (Number(this.currentTime) >=(Number(start))) &&( Number(this.currentTime) <= (Number(start) + Number(dur)));

    return inDuringtime ? { 'font-weight': 700, color: 'yellow'} : { 'font-weight': 500, color: 'white'}
  }

  formatTimestampMMSS(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${secs.toString().padStart(2, '0')}`;
}

  onPlayerStateChange(event: YT.OnStateChangeEvent): void {
    console.log('Player state changed: ', event);
    if (event.data == YT.PlayerState.ENDED) {
      this.player?.playVideo(); // Restart the video
      this.currentTime= 0 ;
    }
    else if (event.data == YT.PlayerState.PLAYING){
      this.initializeProgress();
      setInterval(() => this.updateProgress());
    }
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

  seekAudioByLyric(timeLyric: string) {
    const time = Number(timeLyric);
    console.log(this.currentTime,timeLyric, this.formatTimestampMMSS(Number(timeLyric)))

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

  nextTrack() {
    console.log(this.audioItems)
    // this.player.load
   }
  prevTrack() { }

  setVolume(volumne: number) {
    this.player?.setVolume(volumne);
  }

  changeStatusPlayer() {
    if ( this.currentPlayerStatus == 2 ) this.currentPlayerStatus = -1;

    this.currentPlayerStatus += 1;
    console.log(this.currentPlayerStatus)
  }

}
