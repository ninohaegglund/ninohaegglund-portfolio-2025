import React, { useEffect, useState } from 'react'

export default function TypingTitle({ text = '', speed = 70, className = '' }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    let mounted = true
    const tick = () => {
      if (!mounted) return
      i += 1
      setDisplay(text.slice(0, i))
      if (i < text.length) {
        timeout = setTimeout(tick, speed)
      }
    }
    let timeout = setTimeout(tick, speed)
    return () => {
      mounted = false
      clearTimeout(timeout)
    }
  }, [text, speed])

  return (
    <h1 className={`hero-title ${className}`} aria-live="polite" data-cursor="hover">
      <span className="typing">{display}</span>
      <span className="sr-only">{text}</span>
    </h1>
  )
}
