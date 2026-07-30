import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollectionResponse } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(normalizeCollectionResponse(payload));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Leaderboard</h2>
        <p className="text-muted">See who is climbing the ranks this week.</p>
        {loading && <p className="text-muted">Loading leaderboard…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ol className="list-group list-group-numbered">
            {entries.map((entry, index) => (
              <li key={entry._id || `${entry.name}-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{entry.name || `Rank ${index + 1}`}</span>
                <span className="badge bg-success-subtle text-success-emphasis">{entry.score ?? '—'}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
