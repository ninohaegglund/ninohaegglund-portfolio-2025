// This composes your existing page components as sections on one page.
import About from './About.jsx'
import Projects from './Projects.jsx'
import References from './References.jsx'
import Contact from './Contact.jsx'
import BackToTop from '../components/BackToTop.jsx'
import SkillsProgress from '../components/SkillsProgress.jsx'

const skills = [
  { name: 'C#', level: 75 },
  { name: 'ASP.NET Core / MVC', level: 70 },
  { name: 'Entity Framework Core', level: 65 },
  { name: 'SQL Server', level: 60 },
  { name: 'Azure (App Service, SQL, Storage)', level: 60 },
  { name: 'CI/CD (Azure DevOps)', level: 75 },
  { name: 'JavaScript', level: 55 },
  { name: 'React', level: 50 },
  { name: 'HTML / CSS / Tailwind', level: 80 },
  { name: 'Git / GitHub', level: 75 },
  { name: 'Umbraco / Optimizely', level: 35 },
  { name: 'Unity (2D)', level: 40 },
];

export default function Home() {
  return (
    <>
      <div id="top" />

      <section id="home" className="section hero hero--midnight">
        <div className="container hero-layout">
          <div className="hero-left">
            <h1 className="hero-title">Nino Hägglund — .NET developer</h1>
            <p className="hero-subtitle">.NET developer building useful and delightful software.</p>

         
          </div>

          <div className="portrait-wrap">
            <img
              className="portrait portrait--round portrait--ring"
              src="/assets/images/Profile1.png"
              alt="Portrait of Nino Hägglund"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="about" className="section section-anchor">
        <div className="container">
          <About />
        </div>
      </section>

      <section id="skills" className="section section-anchor">
        <div className="container">
          <SkillsProgress skills={skills} />
        </div>
      </section>

      <section id="projects" className="section section-anchor">
        <div className="container">
          <Projects />
          <div className="block-sep" />
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