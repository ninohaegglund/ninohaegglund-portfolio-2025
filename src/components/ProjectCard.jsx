import useInView from '../hooks/useInView.js'

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, image, tags = [], liveUrl, sourceUrl } = project
  const [ref, inView] = useInView()

  return (
    <article
      ref={ref}
      className={`card project-card reveal ${inView ? 'is-visible' : ''}`}
      style={{ '--i': index }}
    >
      {image && (
        <div className="project-media">
          <img src={image} alt={`${title} preview`} />
        </div>
      )}
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        {description && <p className="project-desc">{description}</p>}

        {tags.length > 0 && (
          <ul className="tag-list">
            {tags.map(t => (
              <li key={t} className="badge">{t}</li>
            ))}
          </ul>
        )}

        {(liveUrl || sourceUrl) && (
          <div className="actions">
            {liveUrl && (
              <a className="btn btn-primary" href={liveUrl} target="_blank" rel="noreferrer">
                Live
              </a>
            )}
            {sourceUrl && (
              <a className="btn" href={sourceUrl} target="_blank" rel="noreferrer">
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}