import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { User, Settings, CreditCard, LogOut, ChevronRight, Bell, HelpCircle, Shield } from 'lucide-react-native';
import { useTranslation } from '../../i18n';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { useState } from 'react';

export default function ProfileScreen() {
  const { t, locale, setLocale } = useTranslation();
  const { user, logout } = useAuth();
  const { requestPermission, scheduleDailyReminder, cancelAll } = useNotifications();
  const [notifEnabled, setNotifEnabled] = useState(true);

  const toggleNotifications = async () => {
    if (notifEnabled) {
      await cancelAll();
      setNotifEnabled(false);
    } else {
      const granted = await requestPermission();
      if (granted) {
        await scheduleDailyReminder(18, 0);
        setNotifEnabled(true);
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0) ?? 'U'}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? 'Usuario'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
        <View style={styles.planBadge}>
          <Text style={styles.planText}>
            {user?.role === 'ADMIN' ? t('role.admin') : user?.role === 'TEACHER' ? t('role.teacher') : t('role.student')}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CUENTA</Text>
        <View style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Settings size={16} color="#C4B5FD" />
          </View>
          <Text style={styles.menuLabel}>{t('profile.settings')}</Text>
          <ChevronRight size={16} color="#6B7686" />
        </View>
        <Pressable style={styles.menuItem} onPress={toggleNotifications}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(56,189,248,.14)' }]}>
            <Bell size={16} color="#38BDF8" />
          </View>
          <Text style={styles.menuLabel}>{t('profile.notifications')}</Text>
          <View style={[styles.badge, { backgroundColor: notifEnabled ? 'rgba(34,197,94,.14)' : 'rgba(255,255,255,.06)' }]}>
            <Text style={[styles.badgeText, { color: notifEnabled ? '#22C55E' : '#6B7686' }]}>
              {notifEnabled ? t('profile.on') : t('profile.off')}
            </Text>
          </View>
          <ChevronRight size={16} color="#6B7686" />
        </Pressable>
        <View style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(245,158,11,.16)' }]}>
            <CreditCard size={16} color="#FBBF24" />
          </View>
          <Text style={styles.menuLabel}>Membresía</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Activo</Text>
          </View>
          <ChevronRight size={16} color="#6B7686" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SOPORTE</Text>
        <View style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(34,197,94,.14)' }]}>
            <HelpCircle size={16} color="#22C55E" />
          </View>
          <Text style={styles.menuLabel}>Ayuda</Text>
          <ChevronRight size={16} color="#6B7686" />
        </View>
        <View style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Shield size={16} color="#C4B5FD" />
          </View>
          <Text style={styles.menuLabel}>Privacidad</Text>
          <ChevronRight size={16} color="#6B7686" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
        <Pressable
          style={styles.menuItem}
          onPress={() => setLocale(locale === 'es' ? 'en' : 'es')}
        >
          <View style={[styles.menuIcon, { backgroundColor: 'rgba(124,58,237,.16)' }]}>
            <Settings size={16} color="#C4B5FD" />
          </View>
          <Text style={styles.menuLabel}>{t('profile.selectLanguage')}</Text>
          <Text style={styles.menuLabel}>{locale === 'es' ? 'Español' : 'English'}</Text>
          <ChevronRight size={16} color="#6B7686" />
        </Pressable>
      </View>

      <Pressable style={styles.signOutBtn} onPress={logout}>
        <LogOut size={18} color="#EF4444" />
        <Text style={styles.signOutText}>{t('profile.logout')}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17' },

  avatarSection: {
    alignItems: 'center', padding: 32,
    backgroundColor: '#111827', borderBottomWidth: 1, borderBottomColor: '#273244',
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#7C3AED',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 30, fontWeight: '800', color: '#0B0F17' },
  name: { fontSize: 20, fontWeight: '700', color: '#F9FAFB', marginTop: 12 },
  email: { fontSize: 14, color: '#9CA3AF', marginTop: 4 },
  planBadge: {
    marginTop: 10, backgroundColor: 'rgba(124,58,237,.16)',
    borderRadius: 999, paddingHorizontal: 14, paddingVertical: 5,
  },
  planText: { fontSize: 12, fontWeight: '700', color: '#C4B5FD' },

  section: { padding: 16 },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', color: '#6B7686',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 16, padding: 14, marginBottom: 8,
  },
  menuIcon: {
    width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#F9FAFB', marginLeft: 12 },
  badge: {
    backgroundColor: 'rgba(34,197,94,.14)', borderRadius: 999,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#22C55E' },

  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    margin: 16, marginBottom: 40, backgroundColor: '#1A2233',
    borderWidth: 1, borderColor: '#273244', borderRadius: 16, padding: 16,
  },
  signOutText: { fontSize: 14, fontWeight: '600', color: '#EF4444' },
});
