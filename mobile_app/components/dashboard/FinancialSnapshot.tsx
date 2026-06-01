import { View, Text, StyleSheet } from 'react-native';
import { Wallet, Target, TrendingUp } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Props {
  currentBal: number;
  goalTarget: number;
  progressPct: number;
}

export function FinancialSnapshot({ currentBal, goalTarget, progressPct }: Props) {
  return (
    <View style={styles.snapshotGrid}>
      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Wallet size={14} color={Colors.textSecondary} />
          <Text style={styles.overviewLabel}>Available Balance</Text>
        </View>
        <Text style={styles.overviewValue}>₹{currentBal.toLocaleString()}</Text>
        <View style={styles.trendRow}>
          <TrendingUp size={12} color={Colors.success} />
          <Text style={styles.trendText}>+12% from last month</Text>
        </View>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.overviewHeader}>
          <Target size={14} color={Colors.textSecondary} />
          <Text style={styles.overviewLabel}>Goal Progress</Text>
        </View>
        <Text style={styles.overviewValue}>{progressPct.toFixed(0)}%</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPct}%` as any }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelText}>₹{currentBal.toLocaleString()} saved</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  snapshotGrid: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xl },
  overviewCard: {
    flex: 1,
    backgroundColor: Colors.bgCard, borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1,
  },
  overviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  overviewLabel: { fontSize: 12, fontWeight: '500', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  overviewValue: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  trendText: { fontSize: 11, color: Colors.success, fontWeight: '500' },
  progressContainer: { marginTop: 12 },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: Colors.bgSecondary, marginBottom: 6 },
  progressFill: { height: '100%', borderRadius: 2, backgroundColor: Colors.accent1 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabelText: { fontSize: 11, color: Colors.textSecondary },
});
