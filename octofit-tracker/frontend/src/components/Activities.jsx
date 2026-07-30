import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollectionResponse } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(normalizeCollectionResponse(payload));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Recent activities</h2>
        <p className="text-muted">Track the latest workouts and training sessions.</p>
        {loading && <p className="text-muted">Loading activities…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush">
            {activities.map((activity) => (
              <li key={activity._id || `${activity.name}-${activity.date}`} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start gap-3">
                  <div>
                    <strong>{activity.name || 'Unnamed activity'}</strong>
                    <div className="text-muted small">{activity.type || 'Training'}</div>
                  </div>
                  <span className="badge bg-primary-subtle text-primary-emphasis">
                    {activity.date ? new Date(activity.date).toLocaleDateString() : 'TBD'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Activities;
