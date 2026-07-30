import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { Users, LibraryBig, CreditCard, ChevronRight } from 'lucide-react-native';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../hooks/useAuth';
import { API_URL } from '../../lib/api';

interface AdminStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export default function AdminScreen() {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch(`${API_URL}/students`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`${API_URL}/teachers`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`${API_URL}/payments`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ])
      .then(([students, teachers, payments]) => {
        if (Array.isArray(students)) setStudentCount(students.length);
        if (Array.isArray(teachers)) setTeacherCount(teachers.length);
        if (Array.isArray(payments)) setPaymentCount(payments.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const stats: AdminStat[] = [
    { label: t('admin.students'), value: String(studentCount), icon: <Users size={20} color="#C4B5FD" />, color: '#C4B5FD', bg: 'rgba(124,58,237,.16)' },
    { label: t('admin.teachers'), value: String(teacherCount), icon: <LibraryBig size={20} color="#38BDF8" />, color: '#38BDF8', bg: 'rgba(56,189,248,.14)' },
    { label: t('admin.payments'), value: String(paymentCount), icon: <CreditCard size={20} color="#FBBF24" />, color: '#FBBF24', bg: 'rgba(245,158,11,.16)' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('admin.title')}</Text>
        <Text style={styles.subtitle}>PlayingKeys Platform</Text>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#7C3AED" />
        </View>
      ) : (
        <View style={styles.statsGrid}>
          {stats.map((s, i) => (
            <View key={i} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: s.bg }]}>{s.icon}</View>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ACTIONS</Text>
        <Pressable style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Users size={16} color="#C4B5FD" />
          </View>
          <Text style={styles.menuLabel}>{t('admin.students')}</Text>
          <ChevronRight size={16} color="#6B7686" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <LibraryBig size={16} color="#38BDF8" />
          </View>
          <Text style={styles.menuLabel}>{t('admin.teachers')}</Text>
          <ChevronRight size={16} color="#6B7686" />
        </Pressable>
        <Pressable style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <CreditCard size={16} color="#FBBF24" />
          </View>
          <Text style={styles.menuLabel}>{t('admin.payments')}</Text>
          <ChevronRight size={16} color="#6B7686" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  subtitle: { fontSize: 13, color: '#6B7686', marginTop: 2 },
  loadingBox: { padding: 40, alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, padding: 16 },
  statCard: {
    flex: 1, minWidth: 100, backgroundColor: '#111827', borderRadius: 16,
    borderWidth: 1, borderColor: '#273244', padding: 16, alignItems: 'center',
  },
  statIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 12, color: '#6B7686', marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#6B7686', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 14, marginBottom: 8,
  },
  menuIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#F9FAFB', marginLeft: 12 },
});
