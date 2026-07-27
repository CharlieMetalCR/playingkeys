import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function useNotifications() {
  const lastNotification = useRef<Notifications.Notification | null>(null);

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((n) => {
      lastNotification.current = n;
    });
    const tap = Notifications.addNotificationResponseReceivedListener((r) => {
      lastNotification.current = r.notification;
    });
    return () => { sub.remove(); tap.remove(); };
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'web') return false;
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return true;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  };

  const scheduleDailyReminder = async (hour = 18, minute = 0) => {
    if (Platform.OS === 'web') return;
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🎵 Time to practice!',
        body: 'Your piano is waiting. Even 10 minutes counts.',
        data: { type: 'daily-reminder' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });
  };

  const cancelAll = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  };

  return { requestPermission, scheduleDailyReminder, cancelAll };
}
