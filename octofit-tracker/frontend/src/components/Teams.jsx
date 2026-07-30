import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollectionResponse } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(normalizeCollectionResponse(payload));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Teams</h2>
        <p className="text-muted">Review the squads currently training together.</p>
        {loading && <p className="text-muted">Loading teams…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team, index) => (
              <div className="col-md-6" key={team._id || `${team.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-2">{team.name || `Team ${index + 1}`}</h3>
                  <p className="text-muted small mb-0">{team.description || 'A collaborative training crew.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
