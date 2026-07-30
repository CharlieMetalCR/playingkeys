import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { Award, Target, Flame, Star, AlertCircle, RefreshCw } from 'lucide-react-native';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../hooks/useAuth';
import { fetchStudentProgress, ApiProgress } from '../../lib/api';

const WEEKS = [
  { label: 'S1', values: [3, 5, 2, 6, 4, 1, 5] },
  { label: 'S2', values: [4, 6, 3, 7, 5, 2, 6] },
  { label: 'S3', values: [2, 4, 5, 3, 6, 4, 7] },
  { label: 'S4', values: [5, 7, 4, 6, 3, 5, 8] },
  { label: 'S5', values: [3, 5, 6, 4, 7, 3, 5] },
  { label: 'S6', values: [6, 4, 7, 5, 8, 6, 4] },
  { label: 'S7', values: [4, 6, 3, 7, 5, 2, 6] },
];

function heatColor(level: number) {
  switch (level) {
    case 0: return '#111827';
    case 1: return 'rgba(124,58,237,.25)';
    case 2: return 'rgba(124,58,237,.48)';
    case 3: return 'rgba(124,58,237,.72)';
    default: return '#7C3AED';
  }
}

function computeStats(progress: ApiProgress[]) {
  const completed = progress.filter((p) => p.status === 'COMPLETED');
  const scores = completed.filter((p) => p.score != null).map((p) => p.score!);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  const completedDates = completed
    .filter((p) => p.completedAt)
    .map((p) => new Date(p.completedAt!).toDateString())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;
  if (completedDates.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let checkDate = new Date(today);
    for (const dateStr of completedDates) {
      const d = new Date(dateStr);
      d.setHours(0, 0, 0, 0);
      if (d.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (d.getTime() < checkDate.getTime()) {
        break;
      }
    }
  }

  return { completedCount: completed.length, avgScore, streak };
}

function computeHeatData(progress: ApiProgress[]): number[] {
  const dayMap = new Map<string, number>();
  for (const p of progress) {
    if (p.completedAt) {
      const key = new Date(p.completedAt).toDateString();
      dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
    }
  }
  const result: number[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const count = dayMap.get(d.toDateString()) ?? 0;
    result.push(Math.min(count, 4));
  }
  return result;
}

export default function ProgressScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [progress, setProgress] = useState<ApiProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.studentId) { setLoading(false); setError(t('progress.noData')); return; }
    try {
      setLoading(true);
      setError(null);
      const data = await fetchStudentProgress(user.studentId);
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load progress');
    } finally {
      setLoading(false);
    }
  }, [user, t]);

  useEffect(() => { load(); }, [load]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#7C3AED" />
        <Text style={styles.loadingText}>{t('courses.loading')}</Text>
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
          <Text style={styles.retryText}>{t('courses.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  const stats = computeStats(progress);
  const heatData = computeHeatData(progress);
  const barMax = Math.max(...WEEKS.flatMap((w) => w.values), 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('progress.weeklyTitle')}</Text>
        <View style={styles.barChart}>
          {WEEKS.map((week, wi) => (
            <View key={wi} style={styles.barCol}>
              <View style={styles.barArea}>
                <View style={[styles.barFill, { height: `${(Math.max(...week.values) / barMax) * 100}%` }]} />
              </View>
              <Text style={styles.barLabel}>{week.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('progress.historyTitle')}</Text>
        <View style={styles.heatmap}>
          {heatData.map((level, i) => (
            <View key={i} style={[styles.heatCell, { backgroundColor: heatColor(level) }]} />
          ))}
        </View>
        <View style={styles.legendRow}>
          <Text style={styles.legendLabel}>{t('progress.less')}</Text>
          {[0, 1, 2, 3, 4].map((l) => (
            <View key={l} style={[styles.legendSwatch, { backgroundColor: heatColor(l) }]} />
          ))}
          <Text style={styles.legendLabel}>{t('progress.more')}</Text>
        </View>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Award size={18} color="#C4B5FD" />
          </View>
          <Text style={styles.statValue}>{stats.completedCount}</Text>
          <Text style={styles.statLabel}>{t('progress.completed')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <Target size={18} color="#38BDF8" />
          </View>
          <Text style={styles.statValue}>{stats.avgScore}%</Text>
          <Text style={styles.statLabel}>{t('progress.avgScore')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <Flame size={18} color="#FBBF24" />
          </View>
          <Text style={styles.statValue}>{stats.streak}</Text>
          <Text style={styles.statLabel}>{t('progress.streak')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(34,197,94,.14)' }]}>
            <Star size={18} color="#22C55E" />
          </View>
          <Text style={styles.statValue}>{progress.length}</Text>
          <Text style={styles.statLabel}>{t('progress.totalTracked')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17', padding: 32 },
  loadingText: { marginTop: 12, fontSize: 14, color: '#9CA3AF' },
  errorText: { marginTop: 12, fontSize: 16, color: '#EF4444', textAlign: 'center' },
  retryBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 16, backgroundColor: '#7C3AED', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12,
  },
  retryText: { color: '#fff', fontWeight: '600' },

  section: {
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 18, marginBottom: 16,
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: '#F9FAFB', marginBottom: 14 },

  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, height: 160 },
  barCol: { flex: 1, alignItems: 'center', gap: 6, height: '100%' },
  barArea: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  barFill: { width: '100%', borderRadius: 8, backgroundColor: '#7C3AED' },
  barLabel: { fontSize: 10, color: '#6B7686' },

  heatmap: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  heatCell: { width: 14, height: 14, borderRadius: 4 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  legendLabel: { fontSize: 11, color: '#6B7686' },
  legendSwatch: { width: 12, height: 12, borderRadius: 3 },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%', backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 16,
  },
  statIcon: {
    width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  statValue: { fontSize: 24, fontWeight: '600', color: '#F9FAFB' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
});
