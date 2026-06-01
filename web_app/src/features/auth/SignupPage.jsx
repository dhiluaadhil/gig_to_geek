import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import logoImage from '../../assets/logo.png';
import './Auth.css';

export default function SignupPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.full_name.trim()) return 'Full name is required.';
    if (!form.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      // Auto-login and go straight to onboarding
      await login(form.email.trim(), form.password);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Brand */}
      <Link to="/" className="auth-brand" aria-label="GigToGeek home">
        <img src={logoImage} alt="GigToGeek Logo" className="brand-logo-img" />
        <span className="brand-name">GigToGeek</span>
      </Link>

      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Start tracking your gig income today</p>
          </div>

          {error && (
            <div role="alert" className="alert alert-error" style={{ marginBottom: '16px' }}>
              <AlertTriangle size={16} />
              {error}
            </div>
          )}
          {success && (
            <div role="status" className="alert alert-success" style={{ marginBottom: '16px' }}>
              <CheckCircle2 size={16} />
              Account created! Setting up your profile…
            </div>
          )}

          <form id="signup-form" className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="signup-fullname" className="form-label">Full name</label>
              <input
                id="signup-fullname"
                name="full_name"
                type="text"
                autoComplete="name"
                className="form-input"
                placeholder="Alex Johnson"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Email address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                className="form-input"
                placeholder="Min 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="signup-confirm" className="form-label">Confirm password</label>
              <input
                id="signup-confirm"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                className="form-input"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              id="signup-submit"
              type="submit"
              className="btn-primary"
              disabled={loading || success}
              style={{ marginTop: '8px' }}
            >
              {loading ? <span className="spinner" aria-hidden="true" /> : 'Create account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link to="/login" id="go-to-login" className="auth-link">
              Sign in <ArrowRight size={14} style={{ verticalAlign: 'middle', marginLeft: '2px' }} />
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
