import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Props {
  insights: any[];
  loadingInsights: boolean;
}

export function SmartRecommendations({ insights, loadingInsights }: Props) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Smart Recommendations</Text>
      {loadingInsights ? (
        <ActivityIndicator color={Colors.accent1} style={{ marginVertical: 24 }} />
      ) : insights.length > 0 ? (
        insights.map(i => (
          <View key={i.id} style={styles.insightCard}>
            <View style={styles.insightIconWrap}>
              <Lightbulb size={16} color={Colors.accent1} />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>{i.title}</Text>
              <Text style={styles.insightBody} numberOfLines={2}>{i.body}</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyBox}>
          <Lightbulb size={24} color={Colors.textMuted} />
          <Text style={styles.emptyText}>No new insights at the moment.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: FontSize.base, fontWeight: '600', color: Colors.textPrimary, marginBottom: 12 },
  insightCard: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.bgCard, borderRadius: Radii.md,
    borderWidth: 1, borderColor: Colors.border,
    borderLeftWidth: 3, borderLeftColor: Colors.accent1,
    padding: Spacing.md, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 2, elevation: 1,
  },
  insightIconWrap: { marginTop: 2 },
  insightContent: { flex: 1 },
  insightTitle: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  insightBody: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18 },
  emptyBox: { alignItems: 'center', paddingVertical: Spacing.xl, backgroundColor: Colors.bgSecondary, borderRadius: Radii.lg, marginBottom: Spacing.xl },
  emptyText: { fontSize: FontSize.sm, color: Colors.textMuted, marginTop: 8 },
});
