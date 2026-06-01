import { View, Text, StyleSheet } from 'react-native';
import { Mail, CheckCircle2, Zap } from 'lucide-react-native';
import { AlertTriangle } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';

interface Props {
  user: any;
  firstName: string;
}

export function ProfileHeader({ user, firstName }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.full_name || 'Gig Worker'}</Text>
          <View style={styles.emailRow}>
            <Mail size={12} color={Colors.textMuted} />
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statusSection}>
        <View style={styles.statusRow}>
          <Text style={styles.statusLabel}>Account Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: user?.is_active ? '#ecfdf5' : '#fef2f2' }]}>
            {user?.is_active ? <CheckCircle2 size={14} color={Colors.success} /> : <AlertTriangle size={14} color={Colors.error} />}
            <Text style={[styles.statusText, { color: user?.is_active ? Colors.success : Colors.error }]}>
              {user?.is_active ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        {user?.is_superuser && (
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Role</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#fef3c7' }]}>
              <Zap size={14} color={Colors.warning} />
              <Text style={[styles.statusText, { color: Colors.warning }]}>Admin</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.xl,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1,
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.md },
  avatar: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.bgSecondary, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center'
  },
  avatarText: { fontSize: FontSize.xxl, fontWeight: '600', color: Colors.textPrimary },
  userInfo: { flex: 1 },
  userName: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  emailRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userEmail: { fontSize: FontSize.sm, color: Colors.textSecondary },
  statusSection: { borderTopWidth: 1, borderTopColor: Colors.borderSubtle, paddingTop: Spacing.sm },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  statusLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: Radii.sm
  },
  statusText: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
});
