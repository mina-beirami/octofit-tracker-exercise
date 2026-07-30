import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero-card">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Modern fitness tracking for teams and solo athletes.</h1>
        <p className="description">
          Log workouts, manage teams, and stay motivated with a polished multi-tier experience.
        </p>
        <div className="cta-row">
          <a className="primary-link" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">
            Check API health
          </a>
          <span className="secondary-pill">React 19 + Vite + Express + MongoDB</span>
        </div>
      </section>
    </main>
  )
}

export default App
