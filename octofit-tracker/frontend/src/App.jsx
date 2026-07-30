import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './utils/api';

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Modern fitness tracking for teams and solo athletes.</h1>
        <p className="description">
          Log workouts, manage teams, and stay motivated with a polished multi-tier experience.
        </p>
        <div className="cta-row">
          <a className="primary-link" href={`${apiBaseUrl}/api/health/`} target="_blank" rel="noreferrer">
            Check API health
          </a>
          <span className="secondary-pill">React 19 + Vite + Express + MongoDB</span>
        </div>
        <p className="text-muted mt-3 mb-4">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> when you are running inside GitHub Codespaces.
        </p>
        <nav className="navbar navbar-expand navbar-light bg-white rounded-pill px-3 py-2 shadow-sm">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
          <Link className="btn btn-outline-primary btn-sm" to="/users">
            Explore the app
          </Link>
        </nav>
      </section>

      <section className="mt-4">
        <Routes>
          <Route path="/" element={<div className="card shadow-sm"><div className="card-body"><h2 className="h4">Welcome</h2><p className="text-muted">Select a section to review the multi-tier platform data.</p></div></div>} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
