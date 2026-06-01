import { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Target, Info } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';
import api from '@/services/api';

interface SavingsGoal {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  status: 'active' | 'completed' | 'paused';
}

function GoalCard({ goal }: { goal: SavingsGoal }) {
  const pct = goal.target_amount > 0 ? Math.min((goal.current_amount / goal.target_amount) * 100, 100) : 0;
  
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>{goal.title}</Text>
        <View style={[styles.statusBadge, goal.status === 'completed' && styles.statusCompleted]}>
          <Text style={[styles.statusText, goal.status === 'completed' && styles.statusTextCompleted]}>
            {goal.status}
          </Text>
        </View>
      </View>

      <Text style={styles.amounts}>
        <Text style={styles.currentAmt}>₹{goal.current_amount.toLocaleString()}</Text>
        <Text style={styles.sep}> / </Text>
        <Text style={styles.targetAmt}>₹{goal.target_amount.toLocaleString()}</Text>
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%` as any }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.pctText}>{pct.toFixed(0)}% reached</Text>
          {goal.deadline && (
            <Text style={styles.deadlineText}>By {new Date(goal.deadline).toLocaleDateString()}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/savings-goals/');
      setGoals(res.data);
    } catch {
      // Handle err
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGoals();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Savings Goals</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Plus size={20} color={Colors.accent1} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.accent1} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator style={{ marginTop: 40 }} color={Colors.accent1} />
          ) : (
            <View style={styles.emptyBox}>
              <Target size={36} color={Colors.textMuted} />
              <Text style={styles.emptyText}>No savings goals found.</Text>
            </View>
          )
        }
        renderItem={({ item }) => <GoalCard goal={item} />}
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
  headerBtn: { padding: 4 },

  listContent: { padding: Spacing.lg, paddingBottom: 100 },

  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 3, elevation: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: FontSize.base, fontWeight: '600', color: Colors.textPrimary, flex: 1 },
  statusBadge: {
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radii.sm,
    backgroundColor: '#f3f4f6'
  },
  statusText: { fontSize: 11, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase' },
  statusCompleted: { backgroundColor: '#ecfdf5' },
  statusTextCompleted: { color: Colors.success },

  amounts: { fontSize: FontSize.lg, marginBottom: 12 },
  currentAmt: { fontWeight: '700', color: Colors.textPrimary },
  sep: { color: Colors.textMuted },
  targetAmt: { color: Colors.textSecondary, fontWeight: '500' },

  progressContainer: {},
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: Colors.bgSecondary, marginBottom: 8 },
  progressFill: { height: '100%', borderRadius: 3, backgroundColor: Colors.accent1 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  pctText: { fontSize: 12, fontWeight: '500', color: Colors.accent1 },
  deadlineText: { fontSize: 12, color: Colors.textMuted },

  emptyBox: { alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, marginTop: Spacing.xl, backgroundColor: Colors.bgSecondary, borderRadius: Radii.lg },
  emptyText: { color: Colors.textMuted, fontSize: FontSize.sm, marginTop: Spacing.sm },
});
