import { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, RefreshControl, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, FontSize } from '@/constants/Theme';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { FinancialSnapshot } from '@/components/dashboard/FinancialSnapshot';
import { IncomeSourcesList } from '@/components/dashboard/IncomeSourcesList';
import { RecentTransactionsList } from '@/components/dashboard/RecentTransactionsList';
import { SmartRecommendations } from '@/components/dashboard/SmartRecommendations';

// ── Types ─────────────────────────────────────────────────────
interface AIInsight {
  id: number; insight_type: string; title: string;
  body: string; confidence_score: number | null; is_read: boolean;
}

// ── Main Screen ───────────────────────────────────────────────
export default function HomeScreen() {
  const { user } = useAuth();
  const [insights, setInsights]     = useState<AIInsight[]>([]);
  const [loadingInsights, setLI]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock transactions
  const recentTransactions = [
    { id: 1, title: 'Swiggy Payout', date: 'Today, 2:40 PM', amount: 850, type: 'credit' },
    { id: 2, title: 'Fuel (HP)', date: 'Yesterday', amount: 300, type: 'debit' },
    { id: 3, title: 'Freelance Design', date: 'Oct 12', amount: 4500, type: 'credit' },
  ];

  const fetchData = async () => {
    setLI(true);
    try {
      const i = await api.get('/insights/');
      setInsights(i.data.slice(0, 3));
    } catch {
      // ignore
    } finally {
      setLI(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const firstName = user?.full_name?.split(' ')[0] ?? 'User';
  
  // Calculations
  const currentBal = user?.current_balance || 0;
  const goalTarget = user?.monthly_saving_goal || 0;
  const progressPct = goalTarget > 0 ? Math.min((currentBal / goalTarget) * 100, 100) : 0;
  const incomes = user?.income_per_occupation || [];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.brandIcon, { backgroundColor: 'transparent' }]}>
            <Image source={require('@/assets/images/logo.png')} style={{ width: 24, height: 24, resizeMode: 'contain' }} />
          </View>
          <Text style={styles.appName}>GigToGeek</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent1} />}
      >
        {/* Welcome */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Overview</Text>
          <Text style={styles.greetingSub}>Welcome back, {firstName}.</Text>
        </View>

        {/* 1. Financial Snapshot */}
        <FinancialSnapshot currentBal={currentBal} goalTarget={goalTarget} progressPct={progressPct} />

        {/* 2. Income Sources */}
        <IncomeSourcesList incomes={incomes} />

        {/* 3. Recent Transactions */}
        <RecentTransactionsList transactions={recentTransactions} />

        {/* 4. Smart Recommendations */}
        <SmartRecommendations insights={insights} loadingInsights={loadingInsights} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm + 4,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandIcon: {
    width: 24, height: 24, borderRadius: 4, backgroundColor: Colors.textPrimary,
    alignItems: 'center', justifyContent: 'center'
  },
  appName: { fontSize: FontSize.base, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  avatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.accent1, justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '600', fontSize: FontSize.sm },

  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg, paddingBottom: 40 },

  // Greeting
  greetingSection: { marginBottom: Spacing.lg },
  greetingText: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },
  greetingSub: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 4 },
});
