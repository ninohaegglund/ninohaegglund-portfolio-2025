import { useEffect, useState } from 'react'
import './top.css'

export default function BackToTop({ variant = 'primary', offset = 300 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > offset)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  const classes = [
    'back-to-top',
    variant === 'primary' ? 'back-to-top-primary' : null,
  ].filter(Boolean).join(' ')

  return (
    <button
      aria-label="Back to top"
      className={classes}
      style={{ display: visible ? 'inline-flex' : 'none', opacity: visible ? 1 : 0 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑ Top
    </button>
  )
}