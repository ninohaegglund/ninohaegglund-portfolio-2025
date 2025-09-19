import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')

    setTimeout(() => {
      setStatus('success')
    }, 800)
  }

  return (
    <section className="section">
      <div className="container narrow">
        <h1>Contact</h1>
        <p>Have a question or want to work together? Send a message.</p>

        <form className="form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Ada Lovelace" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Hi! I'd like to chat about..." required />
          </div>

          <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'success' && (
            <p role="status" className="form-success">Thanks! I’ll get back to you soon.</p>
          )}
        </form>
      </div>
    </section>
  )
}