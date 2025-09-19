import { useEffect, useRef } from 'react'

export default function SkillsProgress({ skills = [] }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const bars = Array.from(el.querySelectorAll('.progress'))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bars.forEach(bar => {
              const level = bar.getAttribute('data-skill-level') || 0
              bar.style.width = `${level}%`
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="card skills-card" ref={containerRef}>
      <h2 className="section-title">Skills</h2>
      <ul className="progress-list">
        {skills.map(s => (
          <li key={s.name} className="progress-item">
            <div className="progress-row">
              <span className="progress-name">{s.name}</span>
              <span className="progress-value">{s.level}%</span>
            </div>
            <div className="progress-bar" aria-hidden>
              <div className="progress" data-skill-level={s.level} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}