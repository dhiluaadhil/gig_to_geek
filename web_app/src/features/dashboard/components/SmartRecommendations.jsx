import { Lightbulb } from 'lucide-react';

export function SmartRecommendations({ insights, loadingInsights }) {
  return (
    <div>
      <h2 className="section-title">Smart Recommendations</h2>
      {loadingInsights ? (
        <div className="empty-state"><span className="spinner" /></div>
      ) : insights.length > 0 ? (
        <div className="insights-list">
          {insights.map(i => (
            <div key={i.id} className="insight-item">
              <div className="insight-icon-wrap">
                <Lightbulb size={18} />
              </div>
              <div className="insight-content">
                <h4>{i.title}</h4>
                <p>{i.body}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Lightbulb size={24} style={{ marginBottom: '8px' }} />
          <p>No new insights. Log more transactions to get personalized advice.</p>
        </div>
      )}
    </div>
  );
}
