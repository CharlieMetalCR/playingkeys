import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState, useCallback } from 'react';
import { Volume2 } from 'lucide-react-native';

const NOTES: { note: string; freq: number; isBlack: boolean }[] = [
  { note: 'C4', freq: 261.63, isBlack: false },
  { note: 'C#4', freq: 277.18, isBlack: true },
  { note: 'D4', freq: 293.66, isBlack: false },
  { note: 'D#4', freq: 311.13, isBlack: true },
  { note: 'E4', freq: 329.63, isBlack: false },
  { note: 'F4', freq: 349.23, isBlack: false },
  { note: 'F#4', freq: 369.99, isBlack: true },
  { note: 'G4', freq: 392.0, isBlack: false },
  { note: 'G#4', freq: 415.3, isBlack: true },
  { note: 'A4', freq: 440.0, isBlack: false },
  { note: 'A#4', freq: 466.16, isBlack: true },
  { note: 'B4', freq: 493.88, isBlack: false },
  { note: 'C5', freq: 523.25, isBlack: false },
];

function playTone(freq: number) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  } catch {
    console.log('Audio not available on native yet - use expo-av');
  }
}

export default function HomeScreen() {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  const handlePress = useCallback((note: string, freq: number) => {
    setActiveNote(note);
    playTone(freq);
    setTimeout(() => setActiveNote(null), 200);
  }, []);

  const whiteKeys = NOTES.filter((n) => !n.isBlack);
  const blackKeys = NOTES.filter((n) => n.isBlack);

  const blackKeyPositions: Record<string, number> = {
    'C#4': 0,
    'D#4': 1,
    'F#4': 3,
    'G#4': 4,
    'A#4': 5,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Volume2 size={28} color="#3b82f6" />
        <Text style={styles.title}>Practice</Text>
        <Text style={styles.subtitle}>Tap the keys to play</Text>
      </View>

      <View style={styles.keyboardWrapper}>
        <View style={styles.keyboard}>
          {whiteKeys.map((k, i) => (
            <Pressable
              key={k.note}
              onPress={() => handlePress(k.note, k.freq)}
              style={[
                styles.whiteKey,
                activeNote === k.note && styles.whiteKeyActive,
              ]}
            >
              <Text style={styles.keyLabel}>{k.note.replace('4', '').replace('5', '')}</Text>
            </Pressable>
          ))}
          {blackKeys.map((k) => {
            const pos = blackKeyPositions[k.note];
            if (pos === undefined) return null;
            return (
              <Pressable
                key={k.note}
                onPress={() => handlePress(k.note, k.freq)}
                style={[
                  styles.blackKey,
                  { left: 28 + pos * 44 + 30 },
                  activeNote === k.note && styles.blackKeyActive,
                ]}
              />
            );
          })}
        </View>
      </View>

      {activeNote && (
        <View style={styles.nowPlaying}>
          <Text style={styles.nowPlayingText}>Now playing: {activeNote}</Text>
        </View>
      )}

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Lessons Done</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Minutes Practiced</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#1e293b', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  keyboardWrapper: { alignItems: 'center', marginBottom: 24 },
  keyboard: {
    width: 310,
    height: 180,
    position: 'relative',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  whiteKey: {
    width: 40,
    height: 160,
    backgroundColor: '#ffffff',
    borderRadius: '0 0 4 4',
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 8,
    marginHorizontal: 1,
  },
  whiteKeyActive: { backgroundColor: '#bfdbfe' },
  blackKey: {
    position: 'absolute',
    top: 8,
    width: 26,
    height: 100,
    backgroundColor: '#111827',
    borderRadius: '0 0 3 3',
    borderWidth: 1,
    borderColor: '#374151',
    zIndex: 10,
  },
  blackKeyActive: { backgroundColor: '#3b82f6' },
  keyLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '500' },
  nowPlaying: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  nowPlayingText: { fontSize: 16, fontWeight: '600', color: '#3b82f6' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statValue: { fontSize: 24, fontWeight: '700', color: '#1e293b' },
  statLabel: { fontSize: 12, color: '#64748b', marginTop: 4, textAlign: 'center' },
});