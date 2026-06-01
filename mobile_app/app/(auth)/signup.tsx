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

export default function SignupScreen() {
  const router = useRouter();
  const { register, login } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!fullName.trim()) return 'Full name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return null;
  };

  const handleSignup = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    
    setLoading(true);
    setError('');
    
    try {
      await register({ full_name: fullName.trim(), email: email.trim(), password });
      await login(email.trim(), password);
      // Currently redirects to tabs as mobile onboarding isn't fully separate yet
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.response?.data?.detail || 'Registration failed. Try again.');
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
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Start tracking your gig income today</Text>

          {error ? (
            <View style={styles.errorBox}>
              <AlertTriangle size={16} color={Colors.error} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              placeholder="Alex Johnson"
              placeholderTextColor={Colors.textMuted}
              value={fullName}
              onChangeText={(t) => { setFullName(t); setError(''); }}
              autoCapitalize="words"
            />
          </View>

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
              placeholder="Min 8 characters"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={(t) => { setPassword(t); setError(''); }}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm password</Text>
            <TextInput
              style={styles.input}
              placeholder="Repeat password"
              placeholderTextColor={Colors.textMuted}
              value={confirm}
              onChangeText={(t) => { setConfirm(t); setError(''); }}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryBtn, loading && styles.btnDisabled]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Create account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} style={styles.footerLinkWrap}>
            <Text style={styles.footerLink}>Sign in</Text>
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
  
  brandContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 32, alignSelf: 'center' },
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

  inputGroup: { marginBottom: Spacing.sm },
  label: { fontSize: 13, fontWeight: '500', color: Colors.textSecondary, marginBottom: 4 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radii.sm,
    padding: 12,
    color: Colors.textPrimary,
    fontSize: FontSize.base,
  },

  primaryBtn: {
    backgroundColor: Colors.textPrimary,
    padding: 16,
    borderRadius: Radii.sm,
    alignItems: 'center',
    marginTop: 12,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: FontSize.base, fontWeight: '600' },

  footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  footerText: { color: Colors.textSecondary, fontSize: FontSize.sm },
  footerLinkWrap: { flexDirection: 'row', alignItems: 'center' },
  footerLink: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: '600' },
});
