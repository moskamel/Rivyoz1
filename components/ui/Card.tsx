import React from 'react';
import { View, ViewStyle, Pressable } from 'react-native';
import { Colors, Radius, Shadow } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'flat';
  padding?: number;
}

export function Card({ children, style, onPress, variant = 'default', padding = 16 }: CardProps) {
  const base: ViewStyle = {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding,
    ...(variant === 'elevated' ? Shadow.md : variant === 'default' ? Shadow.sm : {}),
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [base, style, pressed && { opacity: 0.92, transform: [{ scale: 0.99 }] }]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[base, style]}>{children}</View>;
}
