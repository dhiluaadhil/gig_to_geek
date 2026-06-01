// GigToGeek Mobile — Premium Design Tokens
export const Colors = {
  // Backgrounds
  bgPrimary:    '#fcfcfd',
  bgSecondary:  '#f3f4f6',
  bgCard:       '#ffffff',
  bgCardHover:  '#f9fafb',
  border:       '#e5e7eb',
  borderSubtle: '#f3f4f6',

  // Accents (Subtle Teal & Slate)
  accent1: '#0d9488',   // primary teal
  accent2: '#0f766e',
  accent3: '#115e59',
  
  // Status
  success: '#059669',
  error:   '#dc2626',
  warning: '#d97706',

  // Typography
  textPrimary:   '#111827', // charcoal
  textSecondary: '#4b5563', // medium gray
  textMuted:     '#9ca3af', // light gray

  // Linear gradients for buttons/highlights if absolutely necessary
  // Keeping it flat is better, but retaining types for existing components.
  gradientBlue:   ['#0f172a', '#1e293b'] as const, // dark slate
  gradientCyan:   ['#0d9488', '#0f766e'] as const, // teal
  gradientGold:   ['#d97706', '#b45309'] as const,
};

export const Radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
};

export const Spacing = {
  xs:  4,
  sm:  8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FontSize = {
  xs:   12,
  sm:   13,
  base: 15,
  md:   17,
  lg:   20,
  xl:   24,
  xxl:  28,
  xxxl: 34,
};
