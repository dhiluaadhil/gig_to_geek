import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ArrowDownRight, ArrowUpRight, Search } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';
import api from '@/services/api';

// For now, we mock transactions as there is no endpoint yet
interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

const MOCK_TXNS: Transaction[] = [
  { id: 1, title: 'Swiggy Payout', amount: 1250, type: 'credit', date: 'Today, 2:40 PM', category: 'Income' },
  { id: 2, title: 'Fuel (HP)', amount: 300, type: 'debit', date: 'Today, 10:15 AM', category: 'Expense' },
  { id: 3, title: 'Zomato Payout', amount: 800, type: 'credit', date: 'Yesterday', category: 'Income' },
  { id: 4, title: 'Bike Repair', amount: 1500, type: 'debit', date: 'Oct 12', category: 'Maintenance' },
  { id: 5, title: 'Freelance UI Design', amount: 5000, type: 'credit', date: 'Oct 10', category: 'Income' },
];

function TxnItem({ txn }: { txn: Transaction }) {
  const isCredit = txn.type === 'credit';
  return (
    <View style={styles.txnItem}>
      <View style={styles.txnLeft}>
        <View style={styles.txnIcon}>
          {isCredit ? (
            <ArrowDownRight size={16} color={Colors.success} />
          ) : (
            <ArrowUpRight size={16} color={Colors.textPrimary} />
          )}
        </View>
        <View>
          <Text style={styles.txnTitle}>{txn.title}</Text>
          <View style={styles.txnMeta}>
            <Text style={styles.txnDate}>{txn.date}</Text>
            <View style={styles.dot} />
            <Text style={styles.txnCat}>{txn.category}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.txnAmount, isCredit ? styles.txnCredit : styles.txnDebit]}>
        {isCredit ? '+' : '-'}₹{txn.amount.toLocaleString()}
      </Text>
    </View>
  );
}

export default function TransactionsScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // simulate fetch
    setTimeout(() => setLoading(false), 500);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerBtn}>
            <Search size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn}>
            <Plus size={20} color={Colors.accent1} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={MOCK_TXNS}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent1} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} color={Colors.accent1} />
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No transactions yet.</Text>
            </View>
          )
        }
        renderItem={({ item }) => <TxnItem txn={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.textPrimary },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerBtn: { padding: 4 },

  listContent: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, paddingBottom: 100 },

  txnItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.borderSubtle,
  },
  txnLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  txnIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.bgSecondary,
    alignItems: 'center', justifyContent: 'center'
  },
  txnTitle: { fontSize: FontSize.base, fontWeight: '500', color: Colors.textPrimary, marginBottom: 2 },
  txnMeta: { flexDirection: 'row', alignItems: 'center' },
  txnDate: { fontSize: 12, color: Colors.textMuted },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: Colors.border, marginHorizontal: 6 },
  txnCat: { fontSize: 12, color: Colors.textSecondary },
  
  txnAmount: { fontSize: FontSize.md, fontWeight: '600' },
  txnCredit: { color: Colors.success },
  txnDebit: { color: Colors.textPrimary },

  emptyBox: { alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, marginTop: Spacing.xl },
  emptyText: { color: Colors.textMuted, fontSize: FontSize.sm },
});
