import { useEffect, useState } from 'react';
import { normalizeCollectionResponse } from '../utils/api';

const getWorkoutsApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
    : 'http://localhost:8000/api/workouts';
};

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getWorkoutsApiUrl()}/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        setWorkouts(normalizeCollectionResponse(payload));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Recommended workouts</h2>
        <p className="text-muted">Personalized plans designed for the next session.</p>
        {loading && <p className="text-muted">Loading workouts…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="list-group">
            {workouts.map((workout, index) => (
              <div className="list-group-item" key={workout._id || `${workout.name}-${index}`}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{workout.name || 'Workout plan'}</h3>
                    <p className="text-muted small mb-0">{workout.description || 'Built for steady progress.'}</p>
                  </div>
                  <span className="badge bg-info-subtle text-info-emphasis">{workout.duration || 'Flexible'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
