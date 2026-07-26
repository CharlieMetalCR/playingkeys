import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../i18n';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>PlayingKeys</Text>
        <Text style={styles.subtitle}>{t('auth.loginSubtitle')}</Text>

        <Text style={styles.label}>{t('auth.email')}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="carlos@playingkeys.com"
          placeholderTextColor="#6B7686"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>{t('auth.password')}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="••••••"
          placeholderTextColor="#6B7686"
          secureTextEntry
        />

        <Pressable style={styles.btn} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('auth.login')}</Text>}
        </Pressable>

        <Pressable onPress={() => router.push('/register')}>
          <Text style={styles.link}>{t('auth.noAccount')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0F17', justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: '#1A2233', borderWidth: 1, borderColor: '#273244',
    borderRadius: 22, padding: 28,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#F9FAFB', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  label: { fontSize: 12, fontWeight: '700', color: '#9CA3AF', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#111827', borderWidth: 1, borderColor: '#273244',
    borderRadius: 12, padding: 14, fontSize: 15, color: '#F9FAFB', marginBottom: 18,
  },
  btn: {
    backgroundColor: '#7C3AED', borderRadius: 999, paddingVertical: 14,
    alignItems: 'center', marginBottom: 16,
  },
  btnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  link: { fontSize: 14, color: '#C4B5FD', textAlign: 'center', fontWeight: '600' },
});
