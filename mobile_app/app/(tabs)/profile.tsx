import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';
import { Settings, Shield, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SettingsList } from '@/components/profile/SettingsList';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const firstName = user?.full_name?.split(' ')[0] ?? 'User';

  const SETTINGS_OPTIONS = [
    { icon: <Settings size={20} color={Colors.textSecondary} />, label: 'Account Settings' },
    { icon: <Shield size={20} color={Colors.textSecondary} />, label: 'Privacy & Security' },
    { icon: <Bell size={20} color={Colors.textSecondary} />, label: 'Notifications' },
    { icon: <HelpCircle size={20} color={Colors.textSecondary} />, label: 'Help & Support' },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        
        {/* Avatar Card */}
        <ProfileHeader user={user} firstName={firstName} />

        {/* Settings Links */}
        <SettingsList options={SETTINGS_OPTIONS} />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  
  header: {
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  headerTitle: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.textPrimary },

  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.lg, paddingBottom: 40 },

  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1, borderColor: '#fca5a5',
    borderRadius: Radii.md,
    paddingVertical: 14,
    marginTop: Spacing.md,
  },
  logoutText: { color: Colors.error, fontSize: FontSize.base, fontWeight: '600' },
});
