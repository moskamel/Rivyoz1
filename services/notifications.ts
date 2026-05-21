import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIF_ENABLED_KEY = 'notificationsEnabled';

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const Notifications = (await import('expo-notifications')).default;
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch {
    return false;
  }
}

export async function isNotificationsEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
  return val !== 'false';
}

export async function setNotificationsEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(NOTIF_ENABLED_KEY, String(enabled));
  if (!enabled) await cancelAllNotifications();
}

export async function cancelAllNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const Notifications = (await import('expo-notifications')).default;
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch {}
}

export async function setupNotificationHandler(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const Notifications = (await import('expo-notifications')).default;
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  } catch {}
}

export async function scheduleVaccineReminder(opts: {
  id: string;
  name: string;
  dueDate: string;
}): Promise<void> {
  if (Platform.OS === 'web') return;
  const enabled = await isNotificationsEnabled();
  if (!enabled) return;
  try {
    const Notifications = (await import('expo-notifications')).default;
    const due = new Date(opts.dueDate);
    const reminderDate = new Date(due.getTime() - 24 * 60 * 60 * 1000);
    if (reminderDate <= new Date()) return;
    await Notifications.scheduleNotificationAsync({
      identifier: `vaccine-${opts.id}`,
      content: {
        title: '💉 موعد تطعيم غداً',
        body: `${opts.name} — موعد الجرعة التالية غداً`,
        sound: true,
      },
      trigger: { type: 'date' as any, date: reminderDate },
    });
  } catch {}
}
