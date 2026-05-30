import React, { useState } from 'react';
import { View, TextInput, ViewStyle, TextInputProps } from 'react-native';
import { Text } from './Text';
import { Colors, Radius, Typography } from '../../constants/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  style?: any;
  required?: boolean;
}

export function Input({ label, error, containerStyle, style, required, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <View style={{ flexDirection: 'row-reverse', marginBottom: 6, alignItems: 'center', gap: 4 }}>
          <Text weight="medium" size="sm" color={Colors.textSecondary}>
            {label}
          </Text>
          {required && (
            <Text weight="bold" size="sm" color={Colors.danger}>*</Text>
          )}
        </View>
      )}
      <TextInput
        {...props}
        textAlign="right"
        style={[
          {
            backgroundColor: Colors.surface,
            borderWidth: 1.5,
            borderColor: error ? Colors.danger : focused ? Colors.primary : Colors.border,
            borderRadius: Radius.lg,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontFamily: Typography.fontFamily.regular,
            fontSize: Typography.size.base,
            color: Colors.textPrimary,
            textAlignVertical: 'top',
          },
          style,
        ]}
        placeholderTextColor={Colors.textPlaceholder}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      />
      {error && (
        <Text size="xs" color={Colors.danger} style={{ marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
