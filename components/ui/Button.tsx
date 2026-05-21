import React from 'react';
import { Pressable, ViewStyle, ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { Colors, Radius, Shadow } from '../../constants/theme';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
}

export function Button({
  label, onPress, variant = 'primary', size = 'md',
  loading, disabled, style, fullWidth = true,
}: ButtonProps) {
  const heights = { sm: 40, md: 52, lg: 60 };
  const fontSizes = { sm: 'sm', md: 'base', lg: 'md' } as const;

  const bg = {
    primary: Colors.primary,
    secondary: Colors.primaryFaded,
    ghost: 'transparent',
    danger: Colors.danger,
  }[variant];

  const textColor = {
    primary: Colors.textInverse,
    secondary: Colors.primary,
    ghost: Colors.primary,
    danger: Colors.textInverse,
  }[variant];

  const borderColor = variant === 'ghost' ? Colors.primary : 'transparent';

  return (
    <Pressable
      onPress={!disabled && !loading ? onPress : undefined}
      style={({ pressed }) => [
        {
          height: heights[size],
          backgroundColor: bg,
          borderRadius: Radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
          borderWidth: variant === 'ghost' ? 1.5 : 0,
          borderColor,
          opacity: disabled || loading ? 0.5 : pressed ? 0.88 : 1,
          ...(variant === 'primary' ? Shadow.sm : {}),
          ...(fullWidth ? { alignSelf: 'stretch' as const } : {}),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text weight="bold" size={fontSizes[size]} color={textColor} align="center">
          {label}
        </Text>
      )}
    </Pressable>
  );
}
