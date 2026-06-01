import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export function RecentTransactions({ transactions }) {
  return (
    <div>
      <h2 className="section-title">Recent Transactions</h2>
      <div className="overview-card" style={{ padding: '8px 24px' }}>
        {transactions.map(txn => (
          <div key={txn.id} className="txn-item">
            <div className="txn-left">
              <div className="txn-icon">
                {txn.type === 'credit' ? <ArrowDownRight size={18} color="var(--success)" /> : <ArrowUpRight size={18} color="var(--text-primary)" />}
              </div>
              <div className="txn-info">
                <h4>{txn.title}</h4>
                <p>{txn.date}</p>
              </div>
            </div>
            <div className={`txn-amount ${txn.type === 'credit' ? 'positive' : 'negative'}`}>
              {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
