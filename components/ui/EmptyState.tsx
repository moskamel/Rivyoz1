import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { Colors } from '../../constants/theme';

interface EmptyStateProps {
  icon: string;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <Text size="xxxl" align="center" style={{ marginBottom: 16 }}>{icon}</Text>
      <Text weight="bold" size="lg" align="center" style={{ marginBottom: 8 }}>{title}</Text>
      <Text size="base" color={Colors.textSecondary} align="center" style={{ marginBottom: 24, lineHeight: 22 }}>
        {message}
      </Text>
      {actionLabel && onAction && (
        <Button label={actionLabel} onPress={onAction} fullWidth={false} style={{ paddingHorizontal: 32 }} />
      )}
    </View>
  );
}
