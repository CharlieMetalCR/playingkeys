import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../i18n';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) return;
    setLoading(true);
    try {
      await register(email, name, password);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Error', 'No se pudo crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('auth.registerTitle')}</Text>
        <Text style={styles.subtitle}>{t('auth.registerSubtitle')}</Text>

        <Text style={styles.label}>{t('auth.name')}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Carlos"
          placeholderTextColor="#6B7686"
        />

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

        <Pressable style={styles.btn} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>{t('auth.register')}</Text>}
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.link}>{t('auth.hasAccount')}</Text>
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
