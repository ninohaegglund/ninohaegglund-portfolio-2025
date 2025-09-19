import { references } from '../data/references.js'
import './pages.css'

export default function References() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">References</h1>
          <p className="page-subtitle">What people say about working with me.</p>
        </header>

        <div className="cards-grid">
          {references.map(ref => (
            <article key={ref.id} className="card ref-card">
              <header className="ref-header">
                <div className="ref-avatar" aria-hidden>{ref.initials}</div>
                <div className="ref-meta">
                  <h3 className="ref-name">{ref.name}</h3>
                  <p className="ref-role">{ref.role}</p>
                </div>
              </header>
              <blockquote className="ref-quote">“{ref.quote}”</blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}