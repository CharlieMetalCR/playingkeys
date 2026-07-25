import { Tabs } from 'expo-router';
import { LayoutGrid, Piano, LibraryBig, ChartNoAxesCombined, User } from 'lucide-react-native';

export default function TabLayout() {
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
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <LayoutGrid size={size} color={color} />,
          headerTitle: 'PlayingKeys',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Práctica',
          tabBarIcon: ({ color, size }) => <Piano size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Cursos',
          tabBarIcon: ({ color, size }) => <LibraryBig size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progreso',
          tabBarIcon: ({ color, size }) => <ChartNoAxesCombined size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
