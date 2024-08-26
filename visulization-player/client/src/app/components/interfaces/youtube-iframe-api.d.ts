import 'youtube';

declare namespace YT {
  interface Player {
    new(container: string, options: PlayerOptions): Player;
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    destroy(): void;
  }

  interface PlayerOptions {
    height?: string;
    width?: string;
    videoId?: string;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
    data: number;
  }

  interface OnStateChangeEvent {
    data: number;
  }
}