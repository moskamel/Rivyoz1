// Design tokens — ANZ Plus style adapted for Arabic agricultural app

export const Colors = {
  // Primary brand — deep agricultural green
  primary: '#1B5E20',
  primaryLight: '#2E7D32',
  primaryMid: '#388E3C',
  primaryFaded: '#E8F5E9',

  // Semantic
  success: '#2E7D32',
  warning: '#F57F17',
  danger: '#C62828',
  dangerLight: '#FFEBEE',
  warningLight: '#FFFDE7',
  infoLight: '#E8F5E9',

  // Neutrals
  background: '#F4F6F5',
  surface: '#FFFFFF',
  surfaceElevated: '#FAFAFA',
  border: '#E8EDE9',
  divider: '#F0F4F1',

  // Text
  textPrimary: '#1A2E1B',
  textSecondary: '#5C7A5E',
  textTertiary: '#8FA890',
  textInverse: '#FFFFFF',
  textPlaceholder: '#9DB89E',

  // Animal type colors (from PRD)
  cow: '#3B6D11',
  buffalo: '#1D9E75',
  sheep: '#BA7517',
  poultry: '#D85A30',
  camel: '#888780',

  // Finance
  income: '#1B5E20',
  expense: '#C62828',

  // Overlay
  overlay: 'rgba(26, 46, 27, 0.5)',
  overlayLight: 'rgba(26, 46, 27, 0.08)',
} as const;

export const Typography = {
  // Cairo font — best Arabic support on mobile
  fontFamily: {
    regular: 'Cairo_400Regular',
    medium: 'Cairo_500Medium',
    semiBold: 'Cairo_600SemiBold',
    bold: 'Cairo_700Bold',
    extraBold: 'Cairo_800ExtraBold',
  },

  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 30,
    xxxl: 38,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.8,
  },
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#1A2E1B',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#1A2E1B',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#1A2E1B',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
