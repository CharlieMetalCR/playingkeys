import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Minus, Plus, Metronome, CheckCircle, XCircle, Zap } from 'lucide-react-native';
import { usePianoAudio } from '../../hooks/usePianoAudio';

const ALL_NOTES: { note: string; freq: number; isBlack: boolean }[] = [
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
];

const WHITE_NOTES = ALL_NOTES.filter((n) => !n.isBlack);
const BLACK_NOTES = ALL_NOTES.filter((n) => n.isBlack);

const BLACK_KEY_LEFT: Record<string, number> = {
  'C#4': 0, 'D#4': 1, 'F#4': 3, 'G#4': 4, 'A#4': 5,
};

const FEEDBACK_NONE = 'none' as const;
const FEEDBACK_CORRECT = 'correct' as const;
const FEEDBACK_WRONG = 'wrong' as const;

function pickRandomTarget(): string {
  const idx = Math.floor(Math.random() * ALL_NOTES.length);
  return ALL_NOTES[idx].note;
}

export default function PracticeScreen() {
  const [bpm, setBpm] = useState(100);
  const [metronomeOn, setMetronomeOn] = useState(false);
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [targetNote, setTargetNote] = useState(pickRandomTarget);
  const [feedback, setFeedback] = useState<typeof FEEDBACK_NONE | typeof FEEDBACK_CORRECT | typeof FEEDBACK_WRONG>(FEEDBACK_NONE);
  const [streak, setStreak] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [practiceSeconds, setPracticeSeconds] = useState(0);
  const [waveHeights, setWaveHeights] = useState(() => Array.from({ length: 30 }, () => 10 + Math.random() * 80));

  const { playNote, cleanup } = usePianoAudio();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setPracticeSeconds((s) => s + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (activeNote) {
      setWaveHeights(Array.from({ length: 30 }, () => 10 + Math.random() * 80));
    }
  }, [activeNote]);

  const handlePress = useCallback(
    (note: string, freq: number) => {
      setActiveNote(note);
      playNote(note, freq);
      setTimeout(() => setActiveNote(null), 200);

      setTotalAttempts((t) => t + 1);
      if (note === targetNote) {
        setCorrectAttempts((c) => c + 1);
        setAccuracy(Math.round(((correctAttempts + 1) / (totalAttempts + 1)) * 100));
        setStreak((s) => s + 1);
        setFeedback(FEEDBACK_CORRECT);
        setTimeout(() => {
          setTargetNote(pickRandomTarget());
          setFeedback(FEEDBACK_NONE);
        }, 600);
      } else {
        setStreak(0);
        setAccuracy(Math.round((correctAttempts / (totalAttempts + 1)) * 100));
        setFeedback(FEEDBACK_WRONG);
        setTimeout(() => setFeedback(FEEDBACK_NONE), 600);
      }
    },
    [playNote, targetNote, correctAttempts, totalAttempts],
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Práctica</Text>
          <Text style={styles.headerSub}>Lección 3 · Acordes mayores</Text>
        </View>
        <View style={styles.controls}>
          <View style={styles.tempoControl}>
            <Text style={styles.tempoLabel}>BPM</Text>
            <Pressable style={styles.tempoBtn} onPress={() => setBpm((b) => Math.max(40, b - 5))}>
              <Minus size={14} color="#9CA3AF" />
            </Pressable>
            <Text style={styles.tempoValue}>{bpm}</Text>
            <Pressable style={styles.tempoBtn} onPress={() => setBpm((b) => Math.min(240, b + 5))}>
              <Plus size={14} color="#9CA3AF" />
            </Pressable>
          </View>
          <Pressable
            style={[styles.metroBtn, metronomeOn && styles.metroBtnActive]}
            onPress={() => setMetronomeOn((m) => !m)}
          >
            <Metronome size={18} color={metronomeOn ? '#C4B5FD' : '#6B7686'} />
          </Pressable>
        </View>
      </View>

      <View style={styles.topRow}>
        <View style={styles.noteTargetPanel}>
          <Text style={styles.targetLabel}>Nota objetivo</Text>
          <Text style={styles.targetValue}>{targetNote.replace('4', '')}</Text>
          <View style={[styles.feedbackRow, feedback === FEEDBACK_CORRECT && styles.feedbackCorrect, feedback === FEEDBACK_WRONG && styles.feedbackWrong]}>
            {feedback === FEEDBACK_CORRECT && <CheckCircle size={16} color="#22C55E" />}
            {feedback === FEEDBACK_WRONG && <XCircle size={16} color="#EF4444" />}
            <Text style={[styles.feedbackText, feedback === FEEDBACK_CORRECT && { color: '#22C55E' }, feedback === FEEDBACK_WRONG && { color: '#EF4444' }]}>
              {feedback === FEEDBACK_CORRECT ? '¡Correcto!' : feedback === FEEDBACK_WRONG ? 'Incorrecto' : 'Toca la nota'}
            </Text>
          </View>
          <View style={styles.streakRow}>
            <Zap size={14} color="#FBBF24" />
            <Text style={styles.streakText}>{streak} racha</Text>
          </View>
        </View>

        <View style={styles.monitorPanel}>
          <Text style={styles.monitorLabel}>Monitor de práctica</Text>
          <View style={styles.waveform}>
            {waveHeights.map((h, i) => (
              <View key={i} style={[styles.waveBar, { height: `${h}%` }]} />
            ))}
          </View>
          <View style={styles.monitorMeta}>
            <Text style={styles.monitorMetaText}>⏱ {formatTime(practiceSeconds)}</Text>
            <Text style={styles.monitorMetaText}>🎯 {accuracy}%</Text>
          </View>
        </View>
      </View>

      <View style={styles.pianoContainer}>
        <View style={styles.piano}>
          {WHITE_NOTES.map((k) => {
            const label = k.note.replace('4', '').replace('5', '');
            return (
              <Pressable
                key={k.note}
                onPress={() => handlePress(k.note, k.freq)}
                style={[styles.whiteKey, activeNote === k.note && styles.whiteKeyActive]}
              >
                <Text style={[styles.whiteKeyLabel, activeNote === k.note && { color: '#062434' }]}>{label}</Text>
              </Pressable>
            );
          })}
          {BLACK_NOTES.map((k) => {
            const pos = BLACK_KEY_LEFT[k.note];
            if (pos === undefined) return null;
            return (
              <Pressable
                key={k.note}
                onPress={() => handlePress(k.note, k.freq)}
                style={[
                  styles.blackKey,
                  { left: `${8.3 + pos * 16.6}%` },
                  activeNote === k.note && styles.blackKeyActive,
                ]}
              >
                {activeNote === k.note && <Text style={styles.blackKeyLabel}>{k.note.replace('4', '')}</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17', padding: 16 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  headerSub: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 10 },

  tempoControl: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6,
  },
  tempoLabel: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  tempoBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' },
  tempoValue: { fontSize: 13, fontWeight: '600', color: '#F9FAFB', minWidth: 30, textAlign: 'center' },

  metroBtn: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: '#1A2233',
    borderWidth: 1, borderColor: '#273244', alignItems: 'center', justifyContent: 'center',
  },
  metroBtnActive: { backgroundColor: 'rgba(124,58,237,.16)', borderColor: '#7C3AED' },

  topRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },

  noteTargetPanel: {
    flex: 1, backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 16, alignItems: 'center',
  },
  targetLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6 },
  targetValue: { fontSize: 44, fontWeight: '800', color: '#C4B5FD', marginTop: 6 },
  feedbackRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12,
    backgroundColor: '#111827', borderWidth: 1, borderColor: '#273244',
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
  },
  feedbackCorrect: { backgroundColor: 'rgba(34,197,94,.14)', borderColor: 'rgba(34,197,94,.35)' },
  feedbackWrong: { backgroundColor: 'rgba(239,68,68,.14)', borderColor: 'rgba(239,68,68,.35)' },
  feedbackText: { fontSize: 13, color: '#9CA3AF' },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  streakText: { fontSize: 12, fontWeight: '700', color: '#FBBF24' },

  monitorPanel: {
    flex: 1, backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 16,
  },
  monitorLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.6 },
  waveform: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 3, marginTop: 12,
    backgroundColor: '#111827', borderWidth: 1, borderColor: '#273244',
    borderRadius: 10, padding: 8, height: 96,
  },
  waveBar: { flex: 1, backgroundColor: '#7C3AED', borderRadius: 3, opacity: 0.85 },
  monitorMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  monitorMetaText: { fontSize: 12, color: '#9CA3AF' },

  pianoContainer: { flex: 1, justifyContent: 'flex-end', paddingBottom: 8 },
  piano: {
    position: 'relative', height: 180, backgroundColor: '#0E1524',
    borderWidth: 1, borderColor: '#273244', borderRadius: 16,
    flexDirection: 'row', padding: 10, paddingTop: 0, gap: 3,
  },
  whiteKey: {
    flex: 1, backgroundColor: '#F4F5F8', borderRadius: '0 0 8 8',
    borderWidth: 1, borderColor: '#B9C0CC', zIndex: 1,
    justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 10,
  },
  whiteKeyActive: { backgroundColor: '#38BDF8', borderColor: '#0EA5E9' },
  whiteKeyLabel: { fontSize: 11, fontWeight: '700', color: '#6B7280' },
  blackKey: {
    position: 'absolute', top: 0, width: '14%', height: '60%',
    backgroundColor: '#232C40', borderRadius: '0 0 6 6', zIndex: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8,
    alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8,
  },
  blackKeyActive: { backgroundColor: '#7C3AED' },
  blackKeyLabel: { fontSize: 9, color: '#EDE4FF' },
});
