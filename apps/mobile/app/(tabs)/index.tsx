import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Flame, BookOpen, Clock, Zap, Music, ChevronRight } from 'lucide-react-native';
import { useTranslation } from '../../i18n';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greeting}>{t('home.greeting')}</Text>
          <Text style={styles.greetingSub}>{t('home.ready')}</Text>
        </View>
        <View style={styles.streakChip}>
          <Flame size={14} color="#FBBF24" />
          <Text style={styles.streakText}>{t('home.streak', { count: 7 })}</Text>
        </View>
      </View>

      <View style={styles.continueCard}>
        <Text style={styles.continueLabel}>{t('home.continue')}</Text>
        <Text style={styles.continueTitle}>{t('home.continueTitle')}</Text>
        <Text style={styles.continueDesc}>
          {t('home.continueDesc')}
        </Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <View style={styles.continueMeta}>
          <Text style={styles.metaText}>60%</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{t('home.remaining')}</Text>
        </View>
        <Pressable style={styles.continueBtn}>
          <Music size={16} color="#fff" />
          <Text style={styles.continueBtnText}>{t('home.continueBtn')}</Text>
        </Pressable>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <BookOpen size={18} color="#C4B5FD" />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>{t('home.coursesCompleted')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <Music size={18} color="#38BDF8" />
          </View>
          <Text style={styles.statValue}>48</Text>
          <Text style={styles.statLabel}>{t('home.lessons')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(34,197,94,.14)' }]}>
            <Clock size={18} color="#22C55E" />
          </View>
          <Text style={styles.statValue}>24h</Text>
          <Text style={styles.statLabel}>{t('home.totalTime')}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <Zap size={18} color="#FBBF24" />
          </View>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>{t('home.streakLabel')}</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <View style={styles.panelHead}>
          <Text style={styles.panelTitle}>{t('home.activityTitle')}</Text>
          <Text style={styles.panelMeta}>{t('home.activityWeek')}</Text>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Music size={16} color="#9CA3AF" />
          </View>
          <View style={styles.activityBody}>
            <Text style={styles.activityTitle}>{t('home.practiceLabel')}</Text>
            <Text style={styles.activitySub}>{t('home.practiceTime')}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Text style={[styles.chipText, { color: '#C4B5FD' }]}>{t('home.scheduled')}</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <BookOpen size={16} color="#9CA3AF" />
          </View>
          <View style={styles.activityBody}>
            <Text style={styles.activityTitle}>{t('home.lesson4Label')}</Text>
            <Text style={styles.activitySub}>{t('home.lesson4Time')}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <Text style={[styles.chipText, { color: '#38BDF8' }]}>{t('home.next')}</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityIcon}>
            <Flame size={16} color="#9CA3AF" />
          </View>
          <View style={styles.activityBody}>
            <Text style={styles.activityTitle}>{t('home.weeklyReview')}</Text>
            <Text style={styles.activitySub}>{t('home.weeklyTime')}</Text>
          </View>
          <View style={[styles.chip, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <Text style={[styles.chipText, { color: '#FBBF24' }]}>{t('home.pending')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  content: { padding: 20, paddingBottom: 40 },

  greetingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24,
  },
  greeting: { fontSize: 22, fontWeight: '800', color: '#F9FAFB' },
  greetingSub: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  streakChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(245,158,11,.16)', borderRadius: 999,
    paddingHorizontal: 12, paddingVertical: 7,
  },
  streakText: { fontSize: 13, fontWeight: '700', color: '#FBBF24' },

  continueCard: {
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 22, padding: 22, marginBottom: 20,
  },
  continueLabel: { fontSize: 12, fontWeight: '700', color: '#C4B5FD', textTransform: 'uppercase', letterSpacing: 0.6 },
  continueTitle: { fontSize: 18, fontWeight: '800', color: '#F9FAFB', marginTop: 8 },
  continueDesc: { fontSize: 13, color: '#9CA3AF', marginTop: 6, lineHeight: 19 },

  progressTrack: {
    height: 8, borderRadius: 999, backgroundColor: 'rgba(255,255,255,.06)', overflow: 'hidden', marginTop: 16,
  },
  progressFill: { height: '100%', borderRadius: 999, backgroundColor: '#7C3AED' },
  continueMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  metaText: { fontSize: 12, color: '#6B7686' },
  metaDot: { fontSize: 12, color: '#6B7686' },
  continueBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 18, backgroundColor: '#7C3AED', borderRadius: 999, paddingVertical: 12,
  },
  continueBtnText: { fontSize: 14, fontWeight: '700', color: '#fff' },

  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  statCard: {
    width: '47%', backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 16,
  },
  statIcon: {
    width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  statValue: { fontSize: 24, fontWeight: '600', color: '#F9FAFB' },
  statLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },

  panel: {
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 18,
  },
  panelHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  panelTitle: { fontSize: 14, fontWeight: '800', color: '#F9FAFB' },
  panelMeta: { marginLeft: 'auto', fontSize: 12, color: '#6B7686' },

  activityItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#273244',
  },
  activityIcon: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#111827',
    borderWidth: 1, borderColor: '#273244', alignItems: 'center', justifyContent: 'center',
  },
  activityBody: { flex: 1 },
  activityTitle: { fontSize: 13, fontWeight: '600', color: '#F9FAFB' },
  activitySub: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  chip: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { fontSize: 11, fontWeight: '700' },
});
