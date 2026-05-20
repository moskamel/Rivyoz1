import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { Colors, Spacing } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
  dark?: boolean;
}

export function ScreenHeader({ title, showBack = true, rightElement, style, dark = false }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const color = dark ? Colors.textInverse : Colors.textPrimary;

  return (
    <View
      style={[
        {
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          paddingHorizontal: Spacing.base,
          flexDirection: 'row-reverse',
          alignItems: 'center',
          gap: 12,
        },
        style,
      ]}
    >
      {/* Title — center */}
      <Text weight="bold" size="lg" color={color} style={{ flex: 1 }} align="right">
        {title}
      </Text>

      {/* Right side — back button (RTL: appears on left visually) */}
      {showBack && (
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: dark ? 'rgba(255,255,255,0.15)' : Colors.overlayLight,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Ionicons name="chevron-forward" size={20} color={color} />
        </Pressable>
      )}

      {/* Left side — optional extra */}
      {rightElement && (
        <View>{rightElement}</View>
      )}
    </View>
  );
}
