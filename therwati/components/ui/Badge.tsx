import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Text } from './Text';
import { Colors, Radius } from '../../constants/theme';

type Variant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const VARIANT_STYLES: Record<Variant, { bg: string; text: string }> = {
  success: { bg: Colors.primaryFaded, text: Colors.primary },
  warning: { bg: Colors.warningLight, text: Colors.warning },
  danger: { bg: Colors.dangerLight, text: Colors.danger },
  info: { bg: Colors.infoLight, text: Colors.primaryLight },
  neutral: { bg: Colors.divider, text: Colors.textSecondary },
};

interface BadgeProps {
  label: string;
  variant?: Variant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'neutral', style }: BadgeProps) {
  const { bg, text } = VARIANT_STYLES[variant];
  return (
    <View style={[{ backgroundColor: bg, borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 3 }, style]}>
      <Text size="xs" weight="semiBold" color={text}>
        {label}
      </Text>
    </View>
  );
}
