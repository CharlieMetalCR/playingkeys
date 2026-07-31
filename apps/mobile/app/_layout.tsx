import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

function CrashTest() {
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState('init');

  useEffect(() => {
    try {
      setStep('layout');
      // Intentar cargas progresivas para detectar dónde crashea
      const run = async () => {
        try {
          setStep('imports');
          const { I18nProvider, useTranslation } = await import('../i18n');
          setStep('i18n loaded');
          const { AuthProvider, useAuth } = await import('../hooks/useAuth');
          setStep('auth loaded');
          const { useNotifications } = await import('../hooks/useNotifications');
          setStep('notifications loaded');
        } catch (e: any) {
          setError(`Import failed at ${step}: ${e.message}\n${e.stack}`);
        }
      };
      run();
    } catch (e: any) {
      setError(`Sync error: ${e.message}\n${e.stack}`);
    }
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17', padding: 20 }}>
        <Text style={{ color: '#EF4444', fontSize: 16, fontFamily: 'monospace', marginBottom: 10 }}>ERROR</Text>
        <Text style={{ color: '#F9FAFB', fontSize: 12, fontFamily: 'monospace' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17' }}>
      <Text style={{ color: '#7C3AED', fontSize: 20, fontWeight: 'bold' }}>PlayingKeys</Text>
      <Text style={{ color: '#6B7686', fontSize: 14, marginTop: 8 }}>Cargando... ({step})</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <CrashTest />
    </ErrorBoundary>
  );
}
