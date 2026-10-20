import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, Disc, ExternalLink } from 'lucide-react';
import { TrackItem, WindowId } from '../types/portfolio';
import { WindowFrame } from './WindowFrame';

interface MusicPlayerProps {
  track: TrackItem;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  onFocus: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
}

type PlaybackState = 'STOPPED' | 'PLAYING' | 'PAUSED' | 'NO_SOURCE';

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  track,
  isMinimized,
  isMaximized,
  isFocused,
  zIndex,
  onFocus,
  onMinimize,
  onMaximize,
  onClose,
}) => {
  const [status, setStatus] = useState<PlaybackState>('STOPPED');
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(256);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('READY // STOPPED');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);

  const melodyNotes = [261.63, 329.63, 392.0, 493.88, 392.0, 329.63, 293.66, 349.23];

  const stopSynth = useCallback(() => {
    if (synthTimerRef.current !== null) {
      window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const playSynthTick = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const freq = melodyNotes[stepRef.current % melodyNotes.length];
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignore Web Audio blocks if browser restricts
    }
  }, [isMuted]);

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => undefined);
      }
    };
  }, [stopSynth]);

  const startSynthFallback = () => {
    setStatus('PLAYING');
    setStatusMessage('PLAYING // SYNTH FALLBACK');
    playSynthTick();
    synthTimerRef.current = window.setInterval(() => {
      stepRef.current += 1;
      playSynthTick();
      setCurrentTimeSec((prev) => {
        const next = (prev + 1) % durationSec;
        setProgress(Math.round((next / durationSec) * 100));
        return next;
      });
    }, 650);
  };

  const handlePlayPause = () => {
    if (track.src && track.src.trim() !== '') {
      if (!audioRef.current) {
        const audio = new Audio(track.src);
        audio.preload = 'metadata';
        audio.addEventListener('loadedmetadata', () => {
          if (audio.duration && !Number.isNaN(audio.duration)) {
            setDurationSec(Math.floor(audio.duration));
          }
        });
        audio.addEventListener('timeupdate', () => {
          setCurrentTimeSec(Math.floor(audio.currentTime));
          if (audio.duration) {
            setProgress(Math.min(100, (audio.currentTime / audio.duration) * 100));
          }
        });
        audio.addEventListener('ended', () => {
          setStatus('STOPPED');
          setProgress(0);
          setCurrentTimeSec(0);
          setStatusMessage('TRACK ENDED // STOPPED');
        });
        audioRef.current = audio;
      }

      const audio = audioRef.current;
      if (status === 'PLAYING') {
        audio.pause();
        stopSynth();
        setStatus('PAUSED');
        setStatusMessage('PAUSED // USER ACTION');
      } else {
        audio
          .play()
          .then(() => {
            setStatus('PLAYING');
            setStatusMessage('PLAYING // WAVE TO EARTH - SEASONS');
          })
          .catch(() => {
            if (track.useSynthFallback) {
              startSynthFallback();
            } else {
              setStatus('NO_SOURCE');
              setStatusMessage('UNABLE TO LOAD AUDIO SOURCE');
            }
          });
      }
      return;
    }

    if (track.useSynthFallback) {
      if (status === 'PLAYING') {
        stopSynth();
        setStatus('PAUSED');
        setStatusMessage('PAUSED // SYNTH STANDBY');
      } else {
        startSynthFallback();
      }
      return;
    }

    setStatus('NO_SOURCE');
    setStatusMessage('NO AUDIO CONFIGURED');
  };

  const handleStop = () => {
    stopSynth();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stepRef.current = 0;
    setCurrentTimeSec(0);
    setProgress(0);
    setStatus('STOPPED');
    setStatusMessage('STOPPED // READY');
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(sec % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <WindowFrame
      id="music"
      title="MY_MUSIC.EXE"
      icon={<Disc size={13} />}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      isFocused={isFocused}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onClose={onClose}
      className="music-window"
      bodyClassName="music-window__body"
    >
      <div className="music-player">
        <div className="music-player__status-box">
          <span
            className={`status-led ${
              status === 'PLAYING'
                ? 'status-led--online'
                : status === 'PAUSED'
                ? 'status-led--warn'
                : 'status-led--idle'
            }`}
            aria-hidden="true"
          />
          <span className="music-player__state-label" aria-live="polite">
            {status}
          </span>
        </div>

        <div className="music-player__controls">
          <button
            type="button"
            className="retro-btn music-player__btn"
            onClick={handlePlayPause}
            aria-label={status === 'PLAYING' ? 'Pause audio' : 'Play audio'}
          >
            {status === 'PLAYING' ? <Pause size={13} /> : <Play size={13} />}
            <span>{status === 'PLAYING' ? 'PAUSE' : 'PLAY'}</span>
          </button>

          <button
            type="button"
            className="retro-btn music-player__btn"
            onClick={handleStop}
            disabled={status === 'STOPPED'}
            aria-label="Stop audio"
          >
            <Square size={12} />
            <span>STOP</span>
          </button>

          <button
            type="button"
            className="retro-btn music-player__btn music-player__btn--icon"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          {track.youtubeUrl && (
            <a
              href={track.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn"
              title="Open track on YouTube"
            >
              <span>YT</span>
              <ExternalLink size={11} />
            </a>
          )}
        </div>

        <div className="music-player__track-panel">
          <div className="music-player__track-meta">
            <span className="music-player__track-title">{track.title}</span>
            <span className="music-player__time">
              {formatTime(currentTimeSec)} / {formatTime(durationSec)}
            </span>
          </div>

          <div
            className="music-player__progress-rail"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Audio playback progress"
          >
            <div
              className="music-player__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="music-player__telemetry">
          <span>{statusMessage}</span>
        </div>
      </div>
    </WindowFrame>
  );
};
