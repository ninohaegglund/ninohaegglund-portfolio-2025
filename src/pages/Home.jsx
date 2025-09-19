// This composes your existing page components as sections on one page.
import About from './About.jsx'
import Projects from './Projects.jsx'
import References from './References.jsx'
import Contact from './Contact.jsx'
import PokemonFetcher from '../components/PokemonFetcher.jsx'
import BackToTop from '../components/BackToTop.jsx'
import SkillsProgress from '../components/SkillsProgress.jsx'

const skills = [
  { name: 'C#', level: 70 },
  { name: 'ASP.NET Core', level: 65 },
  { name: 'SQL Server', level: 60 },
  { name: 'Azure', level: 55 },
  { name: 'JavaScript', level: 50 },
  { name: 'React', level: 50 },
  { name: 'HTML/CSS', level: 85 },
  { name: 'Git/GitHub', level: 70 },
]

export default function Home() {
  return (
    <>
      <div id="top" />

      <section id="home" className="section hero">
        <div className="container">
          <h1 className="hero-title">Nino Hägglund — Portfolio</h1>
          <p className="hero-subtitle">.NET developer building useful and delightful software.</p>
        </div>

        <div className="portrait-wrap">
          <img
            className="portrait portrait--round portrait--ring"
            src="/src/assets/images/Profile3.jpg"
            alt="Portrait of Nino Hägglund"
            loading="lazy"
          />
        </div>
      </section>

      <section id="about" className="section section-anchor">
        <div className="container">
          <About />
        </div>
      </section>

      {/* New Skills section */}
      <section id="skills" className="section section-anchor">
        <div className="container">
          <SkillsProgress skills={skills} />
        </div>
      </section>

      <section id="projects" className="section section-anchor">
        <div className="container">
          <Projects />
          <div className="block-sep" />
          <PokemonFetcher />
        </div>
      </section>

      <section id="references" className="section section-anchor">
        <div className="container">
          <References />
        </div>
      </section>

      <section id="contact" className="section section-anchor">
        <div className="container">
          <Contact />
        </div>
      </section>

      <BackToTop />
    </>
  )
}