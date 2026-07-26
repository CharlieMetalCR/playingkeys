import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { Users, BookOpen, TrendingUp } from 'lucide-react-native';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../hooks/useAuth';

const API_URL = 'http://10.0.2.2:3001/api';

interface StudentInfo {
  id: string;
  name: string;
  email: string;
  completed: number;
  total: number;
  initials: string;
  hue: number;
}

export default function TeacherScreen() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/teachers/me/students`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.students)) {
          setStudents(
            data.students.map((s: Record<string, unknown>) => {
              const user = s.user as Record<string, unknown> | undefined;
              const progress = Array.isArray(s.progress) ? s.progress as Array<Record<string, unknown>> : [];
              const completed = progress.filter((p) => p.status === 'COMPLETED').length;
              const name = (user?.name as string) || 'Student';
              const initials = name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
              const hue = Math.abs(name.charCodeAt(0) * 7 + (name.charCodeAt(1) || 0) * 13) % 360;
              return { id: s.id as string, name, email: (user?.email as string) || '', completed, total: progress.length, initials, hue };
            }),
          );
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const totalCompleted = students.reduce((sum, s) => sum + s.completed, 0);
  const avgProgress = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + (s.total > 0 ? (s.completed / s.total) * 100 : 0), 0) / students.length)
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('teacher.title')}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Users size={18} color="#C4B5FD" />
          </View>
          <Text style={styles.statValue}>{students.length}</Text>
          <Text style={styles.statLabel}>{t('teacher.myStudents')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <TrendingUp size={18} color="#38BDF8" />
          </View>
          <Text style={styles.statValue}>{avgProgress}%</Text>
          <Text style={styles.statLabel}>Avg Progress</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(34,197,94,.14)' }]}>
            <BookOpen size={18} color="#22C55E" />
          </View>
          <Text style={styles.statValue}>{totalCompleted}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('teacher.myStudents').toUpperCase()}</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#7C3AED" style={{ marginTop: 20 }} />
        ) : students.length === 0 ? (
          <Text style={styles.emptyText}>{t('teacher.noStudents')}</Text>
        ) : (
          students.map((s) => {
            const pct = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
            return (
              <View key={s.id} style={styles.studentCard}>
                <View style={[styles.avatar, { backgroundColor: `hsl(${s.hue}, 70%, 50%)` }]}>
                  <Text style={styles.avatarText}>{s.initials}</Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{s.name}</Text>
                  <Text style={styles.studentEmail}>{s.email}</Text>
                  <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                      <View style={[styles.progressFill, { width: `${pct}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{s.completed}/{s.total}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  statsRow: { flexDirection: 'row', gap: 10, padding: 16 },
  statCard: {
    flex: 1, backgroundColor: '#111827', borderRadius: 16,
    borderWidth: 1, borderColor: '#273244', padding: 14, alignItems: 'center',
  },
  statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#F9FAFB' },
  statLabel: { fontSize: 11, color: '#6B7686', marginTop: 2 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#6B7686', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  emptyText: { fontSize: 14, color: '#6B7686', textAlign: 'center', padding: 40 },
  studentCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#111827', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 14, marginBottom: 8,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700', color: '#0B0F17' },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 14, fontWeight: '600', color: '#F9FAFB' },
  studentEmail: { fontSize: 12, color: '#6B7686', marginTop: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  progressTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: '#273244' },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: '#7C3AED' },
  progressText: { fontSize: 11, color: '#6B7686' },
});
