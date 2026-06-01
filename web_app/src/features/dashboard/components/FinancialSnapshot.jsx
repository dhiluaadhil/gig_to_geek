import { TrendingUp, Wallet, Target } from 'lucide-react';

export function FinancialSnapshot({ currentBal, goalTarget, progressPct }) {
  return (
    <section className="overview-grid">
      <div className="overview-card">
        <div className="overview-label">
          <Wallet size={16} /> Available Balance
        </div>
        <div className="overview-value">
          ₹{currentBal.toLocaleString()}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
          <TrendingUp size={14} /> +12% from last month
        </div>
      </div>

      <div className="overview-card">
        <div className="overview-label">
          <Target size={16} /> Savings Goal Progress
        </div>
        <div className="overview-value">
          {progressPct.toFixed(0)}%
        </div>
        <div className="progress-container">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="progress-labels">
            <span>₹{currentBal.toLocaleString()} saved</span>
            <span>Goal: ₹{goalTarget.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
