import { useState } from 'react'
import './pokemon.css'

export default function PokemonFetcher() {
  const [name, setName] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchPokemon = async () => {
    const q = name.trim().toLowerCase()
    setError('')
    setData(null)
    if (!q) return
    setLoading(true)
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(q)}`)
      if (!res.ok) throw new Error('Could not fetch resource')
      const json = await res.json()
      const sprite =
        json.sprites?.other?.['official-artwork']?.front_default ||
        json.sprites?.front_default ||
        ''
      setData({
        id: json.id,
        name: json.name,
        sprite,
        types: (json.types || []).map(t => t.type?.name).filter(Boolean),
      })
    } catch (e) {
      setError('Pokémon not found')
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      fetchPokemon()
    }
  }

  return (
    <section className="pk-card" aria-labelledby="pk-title">
      <header className="pk-header">
        <h2 id="pk-title" className="pk-title">Pokémon Finder</h2>
        <p className="pk-subtitle">Search by name or Pokédex number (e.g., pikachu or 25)</p>
      </header>

      <div className="pk-input-row">
        <label className="pk-label" htmlFor="pk-input">Name or ID</label>
        <div className="pk-input-group">
          <input
            id="pk-input"
            type="text"
            className="pk-input"
            placeholder="Try: pikachu, charizard, 150…"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={onKeyDown}
            aria-invalid={!!error}
          />
          <button
            className="pk-btn pk-btn-primary"
            onClick={fetchPokemon}
            disabled={loading || !name.trim()}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </div>

      <div className="pk-status" role="status" aria-live="polite">
        {error && <p className="pk-error">{error}</p>}
        {loading && !error && (
          <div className="pk-loading">
            <div className="pk-spinner" aria-hidden />
            <span>Loading data…</span>
          </div>
        )}
      </div>

      {data && !loading && !error && (
        <article className="pk-result">
          {data.sprite ? (
            <img className="pk-image" src={data.sprite} alt={`${data.name} artwork`} />
          ) : (
            <div className="pk-image pk-image--placeholder" aria-hidden>?</div>
          )}

          <div className="pk-info">
            <h3 className="pk-name">
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              <span className="pk-id">#{String(data.id).padStart(3, '0')}</span>
            </h3>

            {data.types?.length > 0 && (
              <ul className="pk-types">
                {data.types.map(t => (
                  <li key={t} className={`pk-type type-${t}`} data-type={t}>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </article>
      )}
    </section>
  )
}