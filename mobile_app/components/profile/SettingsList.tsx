import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Option {
  icon: React.ReactNode;
  label: string;
}

interface Props {
  options: Option[];
}

export function SettingsList({ options }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Settings</Text>
      <View style={styles.settingsGroup}>
        {options.map((opt, i) => (
          <TouchableOpacity key={opt.label} style={[styles.settingsRow, i === options.length - 1 && { borderBottomWidth: 0 }]} activeOpacity={0.7}>
            <View style={styles.settingsRowLeft}>
              {opt.icon}
              <Text style={styles.settingsLabel}>{opt.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4 },
  settingsGroup: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: Spacing.xl,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 2, elevation: 1,
  },
  settingsRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.borderSubtle,
  },
  settingsRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingsLabel: { fontSize: FontSize.base, color: Colors.textPrimary, fontWeight: '500' },
});
