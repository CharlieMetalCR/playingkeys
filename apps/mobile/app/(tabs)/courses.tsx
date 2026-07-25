import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { BookOpen, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react-native';
import { fetchUnits, ApiUnit } from '../../lib/api';

const GRADIENTS = [
  ['#7C3AED', '#3730A3'],
  ['#0EA5E9', '#075985'],
  ['#22C55E', '#065F46'],
  ['#F59E0B', '#92400E'],
  ['#EC4899', '#831843'],
  ['#64748B', '#1E293B'],
];

export default function CoursesScreen() {
  const router = useRouter();
  const [units, setUnits] = useState<ApiUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUnits();
      setUnits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>Cargando cursos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AlertCircle size={40} color="#EF4444" />
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={load}>
          <RefreshCw size={16} color="#fff" />
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (units.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No hay cursos disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {units.map((unit, idx) => {
        const colors = GRADIENTS[idx % GRADIENTS.length];
        const isExpanded = expandedUnit === unit.id;
        const lessons = (unit as ApiUnit & { lessons: { id: string; title: string; number: number }[] }).lessons ?? [];

        return (
          <Pressable
            key={unit.id}
            style={styles.courseCard}
            onPress={() => setExpandedUnit(isExpanded ? null : unit.id)}
          >
            <View style={[styles.courseCover, { backgroundColor: colors[0] }]}>
              <BookOpen size={28} color="rgba(255,255,255,.85)" />
              <View style={styles.courseBadge}>
                <Text style={styles.courseBadgeText}>UNIDAD {unit.number}</Text>
              </View>
            </View>
            <View style={styles.courseBody}>
              <Text style={styles.courseTitle}>{unit.title}</Text>
              {unit.description ? (
                <Text style={styles.courseDesc} numberOfLines={2}>{unit.description}</Text>
              ) : null}
              <View style={styles.courseFooter}>
                <Text style={styles.lessonCount}>{lessons.length} lecciones</Text>
                <ChevronRight size={16} color="#6B7686" style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }} />
              </View>
            </View>

            {isExpanded && lessons.length > 0 && (
              <View style={styles.lessonsList}>
                {lessons.map((lesson) => (
                  <Pressable
                    key={lesson.id}
                    style={styles.lessonItem}
                    onPress={() => router.push(`/lesson/${lesson.id}`)}
                  >
                    <Text style={styles.lessonNum}>{lesson.number}</Text>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <ChevronRight size={14} color="#6B7686" />
                  </Pressable>
                ))}
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17', padding: 32 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#9CA3AF' },
  errorText: { marginTop: 12, fontSize: 16, color: '#EF4444', textAlign: 'center' },
  emptyText: { fontSize: 16, color: '#6B7686' },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 16, backgroundColor: '#7C3AED', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12,
  },
  retryText: { color: '#fff', fontWeight: '600' },

  courseCard: {
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, overflow: 'hidden', marginBottom: 16,
  },
  courseCover: {
    height: 100, alignItems: 'center', justifyContent: 'center', position: 'relative',
  },
  courseBadge: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: 'rgba(0,0,0,.35)', borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  courseBadgeText: { fontSize: 10, fontWeight: '800', color: '#fff', letterSpacing: 0.4 },
  courseBody: { padding: 16 },
  courseTitle: { fontSize: 15, fontWeight: '700', color: '#F9FAFB' },
  courseDesc: { fontSize: 12, color: '#9CA3AF', marginTop: 4, lineHeight: 18 },
  courseFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  lessonCount: { fontSize: 12, color: '#6B7686' },

  lessonsList: { borderTopWidth: 1, borderTopColor: '#273244', padding: 12 },
  lessonItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 10, paddingHorizontal: 8,
    borderBottomWidth: 1, borderBottomColor: '#273244',
  },
  lessonNum: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: '#111827',
    borderWidth: 1, borderColor: '#273244', textAlign: 'center', textAlignVertical: 'center',
    fontSize: 11, fontWeight: '700', color: '#C4B5FD', lineHeight: 26,
  },
  lessonTitle: { flex: 1, fontSize: 13, fontWeight: '600', color: '#F9FAFB' },
});
