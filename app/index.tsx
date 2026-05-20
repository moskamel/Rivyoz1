import { useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useFarmStore } from '../stores/farm';
import { Colors } from '../constants/theme';

export default function Entry() {
  const { load, isOnboarded, isLoading } = useFarmStore();

  useEffect(() => {
    load().then(() => {
      if (!isLoading) {
        if (isOnboarded) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      router.replace(isOnboarded ? '/(tabs)' : '/onboarding');
    }
  }, [isLoading, isOnboarded]);

  return <View style={{ flex: 1, backgroundColor: Colors.primary }} />;
}
