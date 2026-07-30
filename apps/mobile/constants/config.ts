import Constants from 'expo-constants';

// Uses app.json extra.apiUrl. Override via EAS Build env EXPO_PUBLIC_API_URL.
// Emulators: Android → 10.0.2.2, iOS simulator → localhost, real device → LAN IP
const FALLBACK_API = 'http://192.168.1.6:3001/api';

export const API_URL: string =
  (Constants.expoConfig?.extra?.apiUrl as string) ??
  process.env.EXPO_PUBLIC_API_URL ??
  FALLBACK_API;
