import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'
import './pages.css'
import AnimatedBackground from '../components/AnimatedBackground.jsx'

export default function Projects() {
  return (
    <section className="section">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Projects</h1>
          <p className="page-subtitle">A selection of things I’ve built or worked on.</p>
        </header>

        <div className="projects-wrap">
          <AnimatedBackground />
          <div className="cards-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}