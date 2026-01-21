// Temporary mock data for header weather display
const headerWeather = {
  location: 'Stockholm, SE',
  description: 'Light rain',
  temp: 13,
  icon: '10d'
};

function getWeatherGlyph(code) {
  const map = {
    '01d': '☀️',
    '01n': '🌕',
    '02d': '🌤️',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️'
  };
  return map[code] || '🌈';
}

export default function Navbar() {
  return (
    <header className="header">
      <div className="container nav">
        <a href="#top" className="brand">
          <img src="/assets/images/brand-mark.svg" alt="NH" className="brand-mark" />
          <span className="brand-text-wrap">
            <span className="brand-title">Nino Hägglund</span>
            <span className="brand-subtitle">.NET Developer</span>
          </span>
        </a>

        <nav className="nav-center" aria-label="Main navigation">
          <ul className="nav-list">
            <li><a className="nav-link" href="#about">About</a></li>
            <li><a className="nav-link" href="#projects">Projects</a></li>
            <li><a className="nav-link" href="#references">References</a></li>
            <li><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </nav>

        <div className="nav-social">
          <a
            href="https://github.com/ninohaegglund"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="GitHub profile"
          >
            <img
              src="/assets/images/github.svg"
              className="nav-icon"
              alt=""
              aria-hidden="true"
            />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nino-h%C3%A4gglund-441740307"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link"
            aria-label="LinkedIn profile"
          >
            <img
              src="/assets/images/linkedin.svg"
              className="nav-icon"
              alt=""
              aria-hidden="true"
            />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>

        <div className="nav-weather" aria-label="Current weather">
          <span className="nav-weather-icon" aria-hidden>
            {getWeatherGlyph(headerWeather.icon)}
          </span>
          <span className="nav-weather-temp">{headerWeather.temp}°C</span>
          <span className="nav-weather-location">{headerWeather.location}</span>
        </div>
      </div>
    </header>
  );
}