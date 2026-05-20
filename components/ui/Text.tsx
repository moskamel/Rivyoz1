import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { Colors, Typography } from '../../constants/theme';

type Weight = 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold';
type Size = keyof typeof Typography.size;

interface Props extends TextProps {
  weight?: Weight;
  size?: Size;
  color?: string;
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
}

export function Text({
  weight = 'regular',
  size = 'base',
  color = Colors.textPrimary,
  align = 'right',
  style,
  children,
  ...rest
}: Props) {
  return (
    <RNText
      style={[
        {
          fontFamily: Typography.fontFamily[weight],
          fontSize: Typography.size[size],
          color,
          textAlign: align,
          writingDirection: 'rtl',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
