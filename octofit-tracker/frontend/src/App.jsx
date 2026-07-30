import './App.css'

const getApiBaseUrl = () => {
  const explicitCodespaceName = import.meta.env.VITE_CODESPACE_NAME;
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const inferredCodespaceName = hostname.match(/^(.*)-\d+\.app\.github\.dev$/)?.[1];
  const codespaceName = explicitCodespaceName || inferredCodespaceName;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
};

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
          <a className="primary-link" href={`${apiBaseUrl}/api/health`} target="_blank" rel="noreferrer">
            Check API health
          </a>
          <span className="secondary-pill">React 19 + Vite + Express + MongoDB</span>
        </div>
      </section>
    </main>
  )
}

export default App
