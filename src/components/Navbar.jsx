export default function Navbar() {
  return (
    <header className="header">
      <div className="container nav">
        <a href="#top" className="brand">
          <span className="brand-logo" aria-hidden>🚀</span>
          <span className="brand-text">Web Portfolio</span>
        </a>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li><a className="nav-link" href="#about">About</a></li>
            <li><a className="nav-link" href="#projects">Projects</a></li>
            <li><a className="nav-link" href="#references">References</a></li>
            <li><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}