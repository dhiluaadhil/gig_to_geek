import { View, Text, StyleSheet } from 'react-native';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Props {
  transactions: any[];
}

export function RecentTransactionsList({ transactions }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.cardBlock}>
        {transactions.map((txn, i) => (
          <View key={txn.id} style={[styles.txnRow, i === transactions.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={styles.txnLeft}>
              <View style={styles.txnIcon}>
                {txn.type === 'credit' ? (
                  <ArrowDownRight size={16} color={Colors.success} />
                ) : (
                  <ArrowUpRight size={16} color={Colors.textPrimary} />
                )}
              </View>
              <View>
                <Text style={styles.txnTitle}>{txn.title}</Text>
                <Text style={styles.txnDate}>{txn.date}</Text>
              </View>
            </View>
            <Text style={[styles.txnAmount, txn.type === 'credit' ? styles.txnAmountCredit : styles.txnAmountDebit]}>
              {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
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
  txnRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.borderSubtle,
  },
  txnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  txnIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.bgSecondary, alignItems: 'center', justifyContent: 'center' },
  txnTitle: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.textPrimary, marginBottom: 2 },
  txnDate: { fontSize: 11, color: Colors.textMuted },
  txnAmount: { fontSize: FontSize.sm, fontWeight: '600' },
  txnAmountCredit: { color: Colors.success },
  txnAmountDebit: { color: Colors.textPrimary },
});
