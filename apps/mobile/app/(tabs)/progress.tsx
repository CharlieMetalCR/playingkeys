import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Award, Target, Flame, Star } from 'lucide-react-native';

const WEEKS = [
  { label: 'S1', values: [3, 5, 2, 6, 4, 1, 5] },
  { label: 'S2', values: [4, 6, 3, 7, 5, 2, 6] },
  { label: 'S3', values: [2, 4, 5, 3, 6, 4, 7] },
  { label: 'S4', values: [5, 7, 4, 6, 3, 5, 8] },
  { label: 'S5', values: [3, 5, 6, 4, 7, 3, 5] },
  { label: 'S6', values: [6, 4, 7, 5, 8, 6, 4] },
  { label: 'S7', values: [4, 6, 3, 7, 5, 2, 6] },
];

const HEAT_DATA = Array.from({ length: 84 }, () => Math.floor(Math.random() * 5));

function heatColor(level: number) {
  switch (level) {
    case 0: return '#111827';
    case 1: return 'rgba(124,58,237,.25)';
    case 2: return 'rgba(124,58,237,.48)';
    case 3: return 'rgba(124,58,237,.72)';
    default: return '#7C3AED';
  }
}

const barMax = Math.max(...WEEKS.flatMap((w) => w.values));

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Práctica semanal</Text>
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
        <Text style={styles.sectionTitle}>Mapa de calor</Text>
        <View style={styles.heatmap}>
          {HEAT_DATA.map((level, i) => (
            <View key={i} style={[styles.heatCell, { backgroundColor: heatColor(level) }]} />
          ))}
        </View>
        <View style={styles.legendRow}>
          <Text style={styles.legendLabel}>Menos</Text>
          {[0, 1, 2, 3, 4].map((l) => (
            <View key={l} style={[styles.legendSwatch, { backgroundColor: heatColor(l) }]} />
          ))}
          <Text style={styles.legendLabel}>Más</Text>
        </View>
      </View>

      <View style={styles.statGrid}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Award size={18} color="#C4B5FD" />
          </View>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Insignias</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <Target size={18} color="#38BDF8" />
          </View>
          <Text style={styles.statValue}>87%</Text>
          <Text style={styles.statLabel}>Precisión</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <Flame size={18} color="#FBBF24" />
          </View>
          <Text style={styles.statValue}>14</Text>
          <Text style={styles.statLabel}>Racha más larga</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: 'rgba(34,197,94,.14)' }]}>
            <Star size={18} color="#22C55E" />
          </View>
          <Text style={styles.statValue}>4.5</Text>
          <Text style={styles.statLabel}>Evaluación profesor</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },
  content: { padding: 16, paddingBottom: 40 },

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
