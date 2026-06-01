import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Bike, Pizza, Car, Laptop, Briefcase, GraduationCap, 
  Sparkles, AlertTriangle, ArrowRight, ArrowLeft 
} from 'lucide-react';
import './Onboarding.css';

const GIG_OPTIONS = [
  { id: 'swiggy',     label: 'Swiggy Delivery',   icon: <Bike size={18} /> },
  { id: 'zomato',     label: 'Zomato Delivery',   icon: <Pizza size={18} /> },
  { id: 'uber',       label: 'Uber Driver',       icon: <Car size={18} /> },
  { id: 'rapido',     label: 'Rapido Rider',      icon: <Bike size={18} /> },
  { id: 'freelancer', label: 'Freelancer',        icon: <Laptop size={18} /> },
  { id: 'parttime',   label: 'Part-Time Job',     icon: <Briefcase size={18} /> },
  { id: 'student',    label: 'Student Gig',       icon: <GraduationCap size={18} /> },
  { id: 'other',      label: 'Other',             icon: <Sparkles size={18} /> },
];

const STEPS = 4; // Work, Income, Balance, Goal

function getLabel(id, custom) {
  if (id === 'other') return custom?.trim() || 'Other Work';
  return GIG_OPTIONS.find(o => o.id === id)?.label ?? id;
}

export default function OnboardingPage() {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [selectedIds, setSelectedIds] = useState([]);
  const [custom, setCustom] = useState('');
  const [incomes, setIncomes] = useState({});
  const [balance, setBalance] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');

  const labels = selectedIds.map(id => getLabel(id, custom));
  const totalIncome = labels.reduce((s, l) => s + (parseFloat(incomes[l]) || 0), 0);

  const toggleOcc = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setError('');
  };

  const validate = () => {
    if (step === 1 && selectedIds.length === 0) return 'Select at least one occupation.';
    if (step === 1 && selectedIds.includes('other') && !custom.trim()) return 'Please describe your occupation.';
    if (step === 2 && totalIncome === 0) return 'Enter income for at least one source.';
    return null;
  };

  const handleNext = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    
    if (step < STEPS) {
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setError('');
      setStep(s => s - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const monthly = parseFloat(monthlyGoal) || 0;
      const incomePerOcc = labels.map(l => ({ occupation: l, income: parseFloat(incomes[l]) || 0 }));

      await updateProfile({
        occupations:            labels,
        custom_occupation:      custom.trim() || null,
        income_per_occupation:  incomePerOcc,
        total_monthly_income:   totalIncome,
        monthly_income_estimate: totalIncome,
        current_balance:        parseFloat(balance) || null,
        monthly_saving_goal:    monthly || null,
        weekly_saving_goal:     monthly ? Math.round(monthly / 4)  : null,
        daily_saving_goal:      monthly ? Math.round(monthly / 30) : null,
      });
      navigate('/home', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to complete setup. Try again.');
      setLoading(false);
    }
  };

  // Calculate Progress
  const progressPercent = (step / STEPS) * 100;

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        {/* Progress */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
        </div>

        <div className="onboarding-content">
          {error && (
            <div className="alert alert-error" style={{ marginBottom: '20px' }}>
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {/* STEP 1: Work */}
          {step === 1 && (
            <div className="step-content">
              <div className="onboarding-header">
                <h1 className="onboarding-title">What work do you do?</h1>
                <p className="onboarding-subtitle">Select your primary sources of income.</p>
              </div>

              <div className="options-grid">
                {GIG_OPTIONS.map(opt => {
                  const sel = selectedIds.includes(opt.id);
                  return (
                    <div 
                      key={opt.id} 
                      className={`option-card ${sel ? 'selected' : ''}`}
                      onClick={() => toggleOcc(opt.id)}
                    >
                      <div className="option-icon">{opt.icon}</div>
                      <span>{opt.label}</span>
                    </div>
                  );
                })}
              </div>

              {selectedIds.includes('other') && (
                <div className="form-group">
                  <label className="form-label">Please specify</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Online tutoring"
                    value={custom}
                    onChange={e => setCustom(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Income */}
          {step === 2 && (
            <div className="step-content">
              <div className="onboarding-header">
                <h1 className="onboarding-title">Monthly Income</h1>
                <p className="onboarding-subtitle">Estimate your average monthly earnings for each gig.</p>
              </div>

              <div>
                {labels.map(label => (
                  <div key={label} className="income-input-group">
                    <label>{label}</label>
                    <div className="income-input-wrapper">
                      <span className="currency-prefix">₹</span>
                      <input
                        type="number"
                        className="form-input"
                        placeholder="0"
                        value={incomes[label] || ''}
                        onChange={e => setIncomes({ ...incomes, [label]: e.target.value })}
                        autoFocus
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Balance */}
          {step === 3 && (
            <div className="step-content">
              <div className="onboarding-header">
                <h1 className="onboarding-title">Current Balance</h1>
                <p className="onboarding-subtitle">What is your total available balance right now?</p>
              </div>
              <div className="form-group">
                <div className="income-input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={balance}
                    onChange={e => setBalance(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Goals */}
          {step === 4 && (
            <div className="step-content">
              <div className="onboarding-header">
                <h1 className="onboarding-title">Savings Goal</h1>
                <p className="onboarding-subtitle">How much do you want to save every month?</p>
              </div>
              <div className="form-group">
                <div className="income-input-wrapper">
                  <span className="currency-prefix">₹</span>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="0"
                    value={monthlyGoal}
                    onChange={e => setMonthlyGoal(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              {/* Review block */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Profile Summary</h3>
                <div className="review-section">
                  <div className="review-item">
                    <span>Total Monthly Income</span>
                    <span>₹{totalIncome.toLocaleString()}</span>
                  </div>
                  <div className="review-item">
                    <span>Target Savings</span>
                    <span>₹{(parseFloat(monthlyGoal) || 0).toLocaleString()} /mo</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="onboarding-footer">
          {step > 1 ? (
            <button className="btn-ghost" onClick={handleBack}>
              <ArrowLeft size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Back
            </button>
          ) : (
            <div /> // Spacer
          )}
          
          <button className="btn-primary" onClick={handleNext} disabled={loading}>
            {loading ? <span className="spinner" /> : (
              <>
                {step === STEPS ? 'Complete Setup' : 'Continue'}
                {step !== STEPS && <ArrowRight size={16} />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
