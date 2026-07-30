import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollectionResponse } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        setUsers(normalizeCollectionResponse(payload));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Users</h2>
        <p className="text-muted">Browse the athletes and members using the platform.</p>
        {loading && <p className="text-muted">Loading users…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="row g-3">
            {users.map((user, index) => (
              <div className="col-md-6" key={user._id || `${user.name}-${index}`}>
                <div className="border rounded p-3 h-100">
                  <h3 className="h6 mb-1">{user.name || 'Anonymous athlete'}</h3>
                  <p className="text-muted small mb-0">{user.email || 'No email listed'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Users;
