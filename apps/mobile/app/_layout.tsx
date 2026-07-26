import { Tabs, Redirect, Stack } from 'expo-router';
import { LayoutGrid, Piano, LibraryBig, ChartNoAxesCombined, User } from 'lucide-react-native';
import { I18nProvider, useTranslation } from '../i18n';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';

function AuthGate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0F17' }}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  if (!user) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    );
  }

  return <TabNavigator />;
}

function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#C4B5FD',
        tabBarInactiveTintColor: '#6B7686',
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#273244',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#0B0F17',
        },
        headerTintColor: '#F9FAFB',
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab.home'),
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
          headerTitle: 'PlayingKeys',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: t('tab.practice'),
          tabBarIcon: ({ color, size }) => <Piano size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: t('tab.courses'),
          tabBarIcon: ({ color, size }) => <LibraryBig size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t('tab.progress'),
          tabBarIcon: ({ color, size }) => <ChartNoAxesCombined size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab.profile'),
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </I18nProvider>
  );
}
