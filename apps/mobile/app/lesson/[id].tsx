import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Play, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import { fetchLesson, createProgress, ApiLesson } from '../../lib/api';
import { useTranslation } from '../../i18n';

const DEMO_STUDENT_ID = '66397b72-6376-438c-8abd-08013af8d29b';

const NOTES_FULL: { note: string; freq: number; isBlack: boolean }[] = [
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

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [lesson, setLesson] = useState<ApiLesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const load = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLesson(id);
      setLesson(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleComplete = useCallback(async () => {
    if (!id || completing) return;
    try {
      setCompleting(true);
      await createProgress({
        studentId: DEMO_STUDENT_ID,
        lessonId: id,
        status: 'COMPLETED',
        score: 100,
      });
      setCompleted(true);
    } catch {
      setCompleted(true);
    } finally {
      setCompleting(false);
    }
  }, [id, completing]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>{t('lesson.loading')}</Text>
      </View>
    );
  }

  if (error || !lesson) {
    return (
      <View style={styles.center}>
        <AlertCircle size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error ?? t('lesson.notFound')}</Text>
        <Pressable style={styles.retryBtn} onPress={load}>
          <RefreshCw size={16} color="#fff" />
          <Text style={styles.retryText}>{t('lesson.retry')}</Text>
        </Pressable>
        <Pressable style={[styles.retryBtn, { backgroundColor: '#273244', marginTop: 8 }]} onPress={() => router.back()}>
          <Text style={styles.retryText}>{t('lesson.back')}</Text>
        </Pressable>
      </View>
    );
  }

  const unitLabel = lesson.unit
    ? t('lesson.unit', { number: lesson.unit.number, title: lesson.unit.title })
    : `Lección ${lesson.number}`;
  const instructions = lesson.content.instructions ?? lesson.content.description ?? '';

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#C4B5FD" />
        <Text style={styles.backText}>{t('lesson.back')}</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.unitLabel}>{unitLabel}</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.difficultyLabel}>
          {'★'.repeat(lesson.difficulty)}{'☆'.repeat(Math.max(0, 3 - lesson.difficulty))}
        </Text>
      </View>

      {instructions ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('lesson.instructions')}</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      ) : null}

      {lesson.content.keySignature ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('lesson.keySignature')}</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{lesson.content.keySignature}</Text>
          </View>
        </View>
      ) : null}

      {lesson.content.fingering ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('lesson.fingering')}</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{lesson.content.fingering}</Text>
          </View>
        </View>
      ) : null}

      {lesson.content.dynamics ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('lesson.dynamics')}</Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{lesson.content.dynamics}</Text>
          </View>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('lesson.practicePiano')}</Text>
        <View style={styles.pianoMini}>
          {NOTES_FULL.filter((n) => !n.isBlack).map((n) => (
            <View key={n.note} style={styles.miniWhiteKey}>
              <Text style={styles.miniKeyLabel}>{n.note.replace('4', '').replace('5', '')}</Text>
            </View>
          ))}
        </View>
      </View>

      <Pressable
        style={[styles.completeBtn, completed && styles.completeBtnDone]}
        onPress={handleComplete}
        disabled={completed || completing}
      >
        {completing ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : completed ? (
          <>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.completeText}>{t('lesson.completed')}</Text>
          </>
        ) : (
          <>
            <Play size={20} color="#fff" />
            <Text style={styles.completeText}>{t('lesson.markComplete')}</Text>
          </>
        )}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17', padding: 32 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#9CA3AF' },
  errorText: { marginTop: 12, fontSize: 16, color: '#EF4444', textAlign: 'center' },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 16, backgroundColor: '#7C3AED', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12,
  },
  retryText: { color: '#fff', fontWeight: '600' },

  backButton: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 4 },
  backText: { fontSize: 16, color: '#C4B5FD' },
  header: { padding: 16, paddingBottom: 8 },
  unitLabel: {
    fontSize: 12, fontWeight: '600', color: '#C4B5FD',
    textTransform: 'uppercase', letterSpacing: 1,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#F9FAFB', marginTop: 4 },
  difficultyLabel: { fontSize: 14, color: '#FBBF24', marginTop: 4 },

  section: { padding: 16 },
  sectionTitle: {
    fontSize: 13, fontWeight: '700', color: '#9CA3AF',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
  },
  instructions: { fontSize: 15, color: '#F9FAFB', lineHeight: 24 },
  chip: {
    backgroundColor: 'rgba(124,58,237,.16)', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 8, alignSelf: 'flex-start',
  },
  chipText: { fontSize: 14, fontWeight: '600', color: '#C4B5FD' },

  pianoMini: {
    flexDirection: 'row', backgroundColor: '#0E1524',
    borderWidth: 1, borderColor: '#273244',
    borderRadius: 12, padding: 8, justifyContent: 'center',
  },
  miniWhiteKey: {
    width: 38, height: 120, backgroundColor: '#F4F5F8',
    borderRadius: '0 0 6 6', marginHorizontal: 2,
    justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6,
  },
  miniKeyLabel: { fontSize: 10, color: '#6B7280' },

  completeBtn: {
    flexDirection: 'row', backgroundColor: '#7C3AED',
    borderRadius: 16, padding: 16, margin: 16, marginBottom: 40,
    justifyContent: 'center', alignItems: 'center', gap: 8,
  },
  completeBtnDone: { backgroundColor: '#22C55E' },
  completeText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
