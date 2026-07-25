import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import { useCallback, useRef } from 'react';
import { PIANO_SOUNDS } from '../constants/PianoSounds';

function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function noteToMidi(note: string): number {
  const NOTE_MAP: Record<string, number> = {
    'C4': 60, 'C#4': 61, 'D4': 62, 'D#4': 63, 'E4': 64,
    'F4': 65, 'F#4': 66, 'G4': 67, 'G#4': 68, 'A4': 69,
    'A#4': 70, 'B4': 71, 'C5': 72, 'C#5': 73, 'D5': 74,
    'D#5': 75, 'E5': 76, 'F5': 77, 'F#5': 78, 'G5': 79,
    'G#5': 80, 'A5': 81, 'A#5': 82, 'B5': 83, 'C6': 84,
  };
  return NOTE_MAP[note] ?? 60;
}

export function usePianoAudio() {
  const soundsRef = useRef<Map<string, Audio.Sound>>(new Map());

  const playNote = useCallback(async (note: string, freq?: number) => {
    if (Platform.OS === 'web') {
      try {
        const f = freq ?? midiToFreq(noteToMidi(note));
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.0);
      } catch {
        console.warn('Web Audio not available');
      }
      return;
    }

    try {
      const soundAsset = PIANO_SOUNDS[note];
      if (!soundAsset) return;

      const cached = soundsRef.current.get(note);
      if (cached) {
        await cached.setPositionAsync(0);
        await cached.playAsync();
        return;
      }

      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const { sound } = await Audio.Sound.createAsync(soundAsset, { shouldPlay: true, volume: 0.7 });
      soundsRef.current.set(note, sound);
    } catch (err) {
      console.warn(`Audio not available for ${note}:`, err);
    }
  }, []);

  const cleanup = useCallback(async () => {
    for (const sound of soundsRef.current.values()) {
      await sound.unloadAsync();
    }
    soundsRef.current.clear();
  }, []);

  return { playNote, cleanup };
}
