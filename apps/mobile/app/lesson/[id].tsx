import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Play, CheckCircle } from 'lucide-react-native';
import { useState, useCallback } from 'react';

const LESSONS: Record<string, { title: string; unit: string; instructions: string; notes: string[] }> = {
  '1': {
    title: 'Take Off',
    unit: 'Unit 1: Higher & Lower',
    instructions: 'Play all pieces on groups of 2 black keys using your pointer fingers. When notes look higher, they sound higher and you play up the keyboard.',
    notes: ['C#4', 'D#4', 'F#4', 'G#4', 'A#4'],
  },
  '2': {
    title: 'Landing',
    unit: 'Unit 1: Higher & Lower',
    instructions: 'Like Take Off but in reverse. When notes look lower, they sound lower and you play down the keyboard to the left.',
    notes: ['A#4', 'G#4', 'F#4', 'D#4', 'C#4'],
  },
  '3': {
    title: 'In a Canoe',
    unit: 'Unit 1: Higher & Lower',
    instructions: 'Like Landing but uses quarter notes (short) and half notes (long). Each group ends with a half note.',
    notes: ['D#4', 'C#4', 'D#4', 'C#4', 'D#4'],
  },
  '4': {
    title: 'Space Ship',
    unit: 'Unit 1: Higher & Lower',
    instructions: 'Similar to In a Canoe but the groups are higher on the keyboard.',
    notes: ['G#4', 'F#4', 'G#4', 'F#4', 'G#4'],
  },
  '5': {
    title: 'A Secret',
    unit: 'Unit 2: Dynamics',
    instructions: 'Play softly (piano). Use a gentle touch on the 3 black keys. The whole piece should sound soft.',
    notes: ['C#4', 'D#4', 'F#4'],
  },
  '6': {
    title: 'Rock Band',
    unit: 'Unit 2: Dynamics',
    instructions: 'Play loudly (forte). Use strong finger pressure. The whole piece should sound loud and energetic.',
    notes: ['F#4', 'G#4', 'A#4'],
  },
};

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);

  const lesson = LESSONS[id || '1'] || LESSONS['1'];

  const handleComplete = useCallback(() => {
    setCompleted(true);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#3b82f6" />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.unitLabel}>{lesson.unit}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{lesson.instructions}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notes to Practice</Text>
        <View style={styles.notesRow}>
          {lesson.notes.map((note) => (
            <View key={note} style={styles.noteChip}>
              <Text style={styles.noteText}>{note}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practice Piano</Text>
        <View style={styles.pianoMini}>
          {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((n) => (
            <View key={n} style={styles.miniWhiteKey}>
              <Text style={styles.miniKeyLabel}>{n}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.completeButton, completed && styles.completeButtonDone]}
        onPress={handleComplete}
      >
        {completed ? (
          <>
            <CheckCircle size={20} color="#ffffff" />
            <Text style={styles.completeText}>Completed!</Text>
          </>
        ) : (
          <>
            <Play size={20} color="#ffffff" />
            <Text style={styles.completeText}>Mark as Complete</Text>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 4,
  },
  backText: { fontSize: 16, color: '#3b82f6' },
  header: { padding: 16, paddingBottom: 8 },
  unitLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#1e293b', marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  instructions: { fontSize: 16, color: '#334155', lineHeight: 24 },
  notesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  noteChip: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  noteText: { fontSize: 16, fontWeight: '600', color: '#3b82f6' },
  pianoMini: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
  },
  miniWhiteKey: {
    width: 38,
    height: 120,
    backgroundColor: '#ffffff',
    borderRadius: '0 0 3 3',
    marginHorizontal: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 6,
  },
  miniKeyLabel: { fontSize: 10, color: '#94a3b8' },
  completeButton: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  completeButtonDone: { backgroundColor: '#10b981' },
  completeText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});