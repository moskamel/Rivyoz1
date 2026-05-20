import { useEffect } from 'react';
import { I18nManager, View } from 'react-native';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/theme';

// Force RTL globally
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const FONTS = {
  Cairo_400Regular: require('../assets/fonts/Cairo_400Regular.ttf'),
  Cairo_500Medium: require('../assets/fonts/Cairo_500Medium.ttf'),
  Cairo_600SemiBold: require('../assets/fonts/Cairo_600SemiBold.ttf'),
  Cairo_700Bold: require('../assets/fonts/Cairo_700Bold.ttf'),
  Cairo_800ExtraBold: require('../assets/fonts/Cairo_800ExtraBold.ttf'),
};

export default function RootLayout() {
  const [fontsLoaded] = Font.useFonts(FONTS);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.primary }} />
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_left',
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen
            name="animal/add"
            options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
          />
          <Stack.Screen name="animal/[id]" />
          <Stack.Screen
            name="finance/add-expense"
            options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
          />
          <Stack.Screen
            name="finance/add-income"
            options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
          />
          <Stack.Screen
            name="health/add-event"
            options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
