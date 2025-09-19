// This composes your existing page components as sections on one page.
import About from './About.jsx'
import Projects from './Projects.jsx'
import References from './References.jsx'
import Contact from './Contact.jsx'
import PokemonFetcher from '../components/PokemonFetcher.jsx'
import BackToTop from '../components/BackToTop.jsx'

export default function Home() {
  return (
    <>
      
      <div id="top" />

      {/* Optional hero or intro section */}
      <section id="home" className="section hero">
        <div className="container">
          <h1 className="hero-title">Nino Hägglund — Portfolio</h1>
          <p className="hero-subtitle">.NET developer building useful and delightful software.</p>
        </div>

          <div className="portrait-wrap">
            <img
              className="portrait portrait--round portrait--ring"
              src="/src/assets/images/Profile.jpg"
              alt="Portrait of Nino Hägglund"
              loading="lazy"
            />
          </div>
      </section>

      {/* Keep your existing pages as-is; just render them here */}
      <section id="about" className="section section-anchor">
        <div className="container">
          <About />
        </div>
      </section>

      <section id="projects" className="section section-anchor">
        <div className="container">
          <Projects />

          {/* Fun widget under projects (already styled component) */}
          <div className="block-sep" />
          <h2 className="section-title"></h2>
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