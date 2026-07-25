import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { User, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <User size={40} color="#3b82f6" />
        </View>
        <Text style={styles.name}>Student</Text>
        <Text style={styles.email}>student@playingkeys.com</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuItem}>
          <Settings size={20} color="#64748b" />
          <Text style={styles.menuLabel}>Settings</Text>
          <ChevronRight size={16} color="#cbd5e1" />
        </View>
        <View style={styles.menuItem}>
          <CreditCard size={20} color="#64748b" />
          <Text style={styles.menuLabel}>Membership</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Active</Text>
          </View>
          <ChevronRight size={16} color="#cbd5e1" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuItem}>
          <LogOut size={20} color="#ef4444" />
          <Text style={[styles.menuLabel, { color: '#ef4444' }]}>Sign Out</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  avatarSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: '700', color: '#1e293b', marginTop: 12 },
  email: { fontSize: 14, color: '#64748b', marginTop: 4 },
  section: { padding: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuLabel: { flex: 1, fontSize: 16, color: '#1e293b', marginLeft: 12 },
  badge: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#16a34a' },
});