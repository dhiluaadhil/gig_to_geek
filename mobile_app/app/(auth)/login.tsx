import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertTriangle, ArrowRight } from 'lucide-react-native';
import { Colors, Radii, Spacing, FontSize } from '@/constants/Theme';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email.trim(), password);
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brandContainer}>
          <View style={[styles.brandLogo, { backgroundColor: 'transparent' }]}>
            <Image source={require('@/assets/images/logo.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
          </View>
          <Text style={styles.brandName}>GigToGeek</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account to continue</Text>

          {error ? (
            <View style={styles.errorBox}>
              <AlertTriangle size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={(t) => { setEmail(t); setError(''); }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')} style={styles.footerLinkWrap}>
            <Text style={styles.footerLink}>Sign up</Text>
            <ArrowRight size={14} color={Colors.textPrimary} style={{ marginLeft: 2, marginTop: 2 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  keyboardView: { flex: 1, padding: Spacing.xl, justifyContent: 'center' },
  
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 40, alignSelf: 'center' },
  brandLogo: { width: 40, height: 40, borderRadius: Radii.sm, backgroundColor: Colors.textPrimary, alignItems: 'center', justifyContent: 'center' },
  brandName: { fontSize: FontSize.xl, fontWeight: '700', color: Colors.textPrimary, letterSpacing: -0.5 },

  formContainer: {
    backgroundColor: Colors.bgCard,
    padding: Spacing.lg,
    borderRadius: Radii.lg,
    borderWidth: 1, borderColor: Colors.border,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  
  title: { fontSize: FontSize.lg, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4, textAlign: 'center' },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.lg, textAlign: 'center' },

  errorBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fef2f2', borderWidth: 1, borderColor: '#fca5a5',
    padding: Spacing.sm, borderRadius: Radii.sm, marginBottom: Spacing.md,
  },
  errorText: { color: '#991b1b', fontSize: FontSize.sm, flex: 1 },

  inputGroup: { marginBottom: Spacing.md },
  label: { fontSize: 13, fontWeight: '500', color: Colors.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radii.sm,
    padding: 14,
    color: Colors.textPrimary,
    fontSize: FontSize.base,
  },

  primaryBtn: {
    backgroundColor: Colors.textPrimary,
    padding: 16,
    borderRadius: Radii.sm,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: FontSize.base, fontWeight: '600' },

  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 32 },
  footerText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  footerLinkWrap: { flexDirection: 'row', alignItems: 'center' },
  footerLink: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: '600' },
});
