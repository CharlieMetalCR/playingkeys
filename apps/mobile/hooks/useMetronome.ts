import { useCallback, useRef, useEffect } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

function createClick(ctx: AudioContext, scheduledTime: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, scheduledTime);
  gain.gain.setValueAtTime(0.3, scheduledTime);
  gain.gain.exponentialRampToValueAtTime(0.001, scheduledTime + 0.015);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(scheduledTime);
  osc.stop(scheduledTime + 0.015);
}

function generateClickWav(): string {
  const sampleRate = 22050;
  const duration = 0.015;
  const numSamples = Math.floor(sampleRate * duration);
  const freq = 800;

  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, numSamples * 2, true);

  for (let i = 0; i < numSamples; i++) {
    const sample = Math.sin(2 * Math.PI * freq * (i / sampleRate));
    const envelope = 1 - i / numSamples;
    view.setInt16(44 + i * 2, sample * envelope * 0.3 * 32767, true);
  }

  const uint8 = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary);
}

export function useMetronome() {
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);
  const soundsRef = useRef<Map<number, Audio.Sound>>(new Map());

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    isPlayingRef.current = false;
    for (const sound of soundsRef.current.values()) {
      sound.unloadAsync().catch(() => {});
    }
    soundsRef.current.clear();
  }, []);

  const start = useCallback((bpm: number) => {
    stop();

    if (Platform.OS === 'web') {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!ctxRef.current) ctxRef.current = new AudioCtx();
        const ctx = ctxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        isPlayingRef.current = true;
        const interval = 60000 / bpm;
        const tick = () => {
          if (!isPlayingRef.current) return;
          createClick(ctx, ctx.currentTime);
        };
        tick();
        timerRef.current = setInterval(tick, interval);
        return;
      } catch {
        console.warn('Web Audio not available');
        return;
      }
    }

    isPlayingRef.current = true;
    const interval = 60000 / bpm;
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true }).catch(() => {});

    const base64 = generateClickWav();

    const tick = async () => {
      if (!isPlayingRef.current) return;
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: `data:audio/wav;base64,${base64}` },
          { shouldPlay: true, volume: 0.5 },
        );
        setTimeout(() => sound.unloadAsync().catch(() => {}), 100);
      } catch {
        // ignore audio errors
      }
    };

    tick();
    timerRef.current = setInterval(tick, interval);
  }, [stop]);

  useEffect(() => {
    return () => {
      stop();
      if (ctxRef.current) {
        ctxRef.current.close().catch(() => {});
        ctxRef.current = null;
      }
    };
  }, [stop]);

  return { start, stop };
}
