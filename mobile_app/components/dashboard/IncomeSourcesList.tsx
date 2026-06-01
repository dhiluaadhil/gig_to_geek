import { View, Text, StyleSheet } from 'react-native';
import { Briefcase } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Props {
  incomes: any[];
}

export function IncomeSourcesList({ incomes }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Income Sources</Text>
      {incomes.length > 0 ? (
        <View style={styles.cardBlock}>
          {incomes.map((inc, i) => (
            <View key={i} style={[styles.incomeRow, i === incomes.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.incomeLeft}>
                <View style={styles.incomeIcon}>
                  <Briefcase size={16} color={Colors.textSecondary} />
                </View>
                <Text style={styles.incomeName}>{inc.occupation}</Text>
              </View>
              <Text style={styles.incomeAmount}>₹{Number(inc.income).toLocaleString()}</Text>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyBox}>
          <Briefcase size={24} color={Colors.textMuted} />
          <Text style={styles.emptyText}>No income sources added.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: FontSize.base, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  cardBlock: {
    backgroundColor: Colors.bgCard, borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xl,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 2, elevation: 1,
  },
  incomeRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.borderSubtle,
  },
  incomeLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  incomeIcon: { width: 32, height: 32, borderRadius: 6, backgroundColor: Colors.bgSecondary, alignItems: 'center', justifyContent: 'center' },
  incomeName: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.textPrimary },
  incomeAmount: { fontSize: FontSize.base, fontWeight: '600', color: Colors.textPrimary },
  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, backgroundColor: Colors.bgSecondary, borderRadius: Radii.lg, marginBottom: Spacing.xl },
  emptyText: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 8 },
});
