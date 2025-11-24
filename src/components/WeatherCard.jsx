import React from 'react';
import './weather.css';


export function WeatherCard({
  data,
  loading = false,
  error = null,
  variant = 'glass'
}) {
  const skeleton = loading || !data;

  // Helper formatters (can move to utils later)
  const formatTemp = t => (t == null ? '—' : Math.round(t)) + '°';
  const formatUnixTime = (u) => {
    if (!u) return '—';
    const d = new Date(u * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const formatUpdated = (u) => {
    if (!u) return '—';
    const d = new Date(u * 1000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section
      className={`weather-card weather-card--${variant} ${skeleton ? 'is-loading' : ''} ${error ? 'is-error' : ''}`}
      role="group"
      aria-label={data?.location ? `Weather for ${data.location}` : 'Weather'}
    >
      {/* Top Row */}
      <header className="weather-head">
        <div className="weather-primary">
          {skeleton ? (
            <div className="skeleton skeleton-title" aria-hidden="true" />
          ) : (
            <h3 className="weather-location">{data.location}</h3>
          )}
          {skeleton ? (
            <div className="skeleton skeleton-sub" aria-hidden="true" />
          ) : (
            <p className="weather-desc" aria-live="polite">
              {data.description}
            </p>
          )}
        </div>
        <div className="weather-icon-wrap">
          {skeleton ? (
            <div className="skeleton skeleton-icon" aria-hidden="true" />
          ) : (
            <WeatherIcon code={data.icon} description={data.description} />
          )}
        </div>
      </header>

      {/* Temperature Block */}
      <div className="weather-temp-block">
        {skeleton ? (
          <div className="skeleton skeleton-temp" aria-hidden="true" />
        ) : (
          <>
            <div className="temp-current">
              <span className="temp-value">{formatTemp(data.temp)}</span>
              <span className="temp-feels">Feels {formatTemp(data.feels_like)}</span>
            </div>
            <div className="temp-range">
              <span className="temp-min">Min {formatTemp(data.temp_min)}</span>
              <span className="temp-max">Max {formatTemp(data.temp_max)}</span>
            </div>
          </>
        )}
      </div>

      {/* Meta Grid */}
      <div className="weather-meta-grid">
        {skeleton ? (
          <>
            <div className="skeleton skeleton-cell" aria-hidden="true" />
            <div className="skeleton skeleton-cell" aria-hidden="true" />
            <div className="skeleton skeleton-cell" aria-hidden="true" />
            <div className="skeleton skeleton-cell" aria-hidden="true" />
          </>
        ) : (
          <>
            <Meta label="Humidity" value={data.humidity != null ? data.humidity + '%' : '—'} />
            <Meta label="Wind" value={data.wind_speed != null ? data.wind_speed + ' m/s' : '—'} />
            <Meta label="Sunrise" value={formatUnixTime(data.sunrise)} />
            <Meta label="Sunset" value={formatUnixTime(data.sunset)} />
          </>
        )}
      </div>

      {/* Footer / Updated / Error */}
      <footer className="weather-footer">
        {error && (
          <div className="weather-error" role="alert">
            {error}
          </div>
        )}
        {!error && (
          <>
            {skeleton ? (
              <div className="skeleton skeleton-updated" aria-hidden="true" />
            ) : (
              <small className="weather-updated" aria-live="off">
                Updated {formatUpdated(data.updated)}
              </small>
            )}
            <button
              type="button"
              className="weather-refresh-btn"
              aria-label="Refresh weather"
              disabled={loading}
              onClick={() => {
                // Placeholder: attach a refetch function when you implement API
                console.log('Refresh clicked');
              }}
            >
              <span className="btn-label">Refresh</span>
              <svg className="btn-icon" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  d="M4 4v6h6M20 20v-6h-6M5 13a7 7 0 0 0 12 5M19 11a7 7 0 0 0-12-5" />
              </svg>
            </button>
          </>
        )}
      </footer>
    </section>
  );
}


function WeatherIcon({ code, description }) {
  // simple mapping for demonstration
  const map = {
    '01d': '☀️',
    '01n': '🌕',
    '02d': '🌤️',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌦️',
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
  const glyph = map[code] || '🌈';
  return (
    <div className="weather-icon" aria-label={description || 'Weather'}>
      {glyph}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="meta">
      <span className="meta-label">{label}</span>
      <span className="meta-value">{value}</span>
    </div>
  );
}


const mockData = {
  location: 'Stockholm, SE',
  description: 'Light rain',
  temp: 12.6,
  feels_like: 11.9,
  temp_min: 10.0,
  temp_max: 14.0,
  humidity: 87,
  wind_speed: 5.1,
  icon: '10d',
  sunrise: 1699434000,
  sunset: 1699470000,
  updated: Math.floor(Date.now()/1000)
};
