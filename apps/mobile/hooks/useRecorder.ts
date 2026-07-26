import { useState, useRef, useCallback } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

type RecorderState = 'idle' | 'recording' | 'recorded' | 'playing' | 'error';

export function useRecorder() {
  const [state, setState] = useState<RecorderState>('idle');
  const [duration, setDuration] = useState(0);
  const recordingRef = useRef<InstanceType<typeof Audio.Recording> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    if (Platform.OS === 'web') {
      setState('error');
      return;
    }
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (!perm.granted) {
        setState('error');
        return;
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recordingRef.current = recording;
      setDuration(0);
      setState('recording');
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } catch {
      setState('error');
    }
  }, []);

  const stopRecording = useCallback(async () => {
    stopTimer();
    const rec = recordingRef.current;
    if (!rec) return;
    try {
      await rec.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      const uri = rec.getURI();
      recordingRef.current = null;
      if (uri) {
        const { sound } = await Audio.Sound.createAsync({ uri });
        soundRef.current = sound;
        setState('recorded');
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }, [stopTimer]);

  const play = useCallback(async () => {
    const sound = soundRef.current;
    if (!sound) return;
    try {
      setState('playing');
      await sound.setPositionAsync(0);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setState('recorded');
        }
      });
    } catch {
      setState('recorded');
    }
  }, []);

  const reset = useCallback(() => {
    stopTimer();
    soundRef.current?.unloadAsync().catch(() => {});
    soundRef.current = null;
    recordingRef.current?.stopAndUnloadAsync().catch(() => {});
    recordingRef.current = null;
    setDuration(0);
    setState('idle');
  }, [stopTimer]);

  const toggleRecording = useCallback(async () => {
    if (state === 'recording') {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [state, startRecording, stopRecording]);

  return { state, duration, toggleRecording, play, reset };
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export { formatDuration };
