import { useEffect, useRef } from 'react'

export default function AnimatedBackground({
  color = 'var(--primary)', // use brand primary by default
  colors = ['var(--primary)', '#06b6d4', '#f59e0b'], // palette for multi-hue particles
  gridSize = 60,
  intensity = 0.5, // 0.5..1.5 scales density and speeds
  interactive = true,
  fullScreen = false,
  className = '',
}) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef()
  const reduceMotion = useRef(false)

  useEffect(() => {
        const toRgbTriplet = input => {
          if (!input) return '37, 99, 235' // fallback to #2563eb
          const str = String(input).trim()
          const rgbMatch = str.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/)
          if (rgbMatch) return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`
          if (str.startsWith('var(')) {
            const varName = str.slice(4, -1).trim()
            const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
            return toRgbTriplet(val)
          }
          if (str.startsWith('#')) {
            const hex = str.replace('#', '')
            const h = hex.length === 3
              ? hex.split('').map(ch => ch + ch).join('')
              : hex
            const r = parseInt(h.slice(0, 2), 16)
            const g = parseInt(h.slice(2, 4), 16)
            const b = parseInt(h.slice(4, 6), 16)
            return `${r}, ${g}, ${b}`
          }
          // last resort: try canvas normalization
          try {
            const tmp = document.createElement('canvas')
            const c2 = tmp.getContext('2d')
            c2.fillStyle = str
            const norm = c2.fillStyle // e.g., 'rgb(37, 99, 235)'
            const m = norm.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/)
            if (m) return `${m[1]}, ${m[2]}, ${m[3]}`
          } catch {}
          return '37, 99, 235'
        }

        const parseTriplet = triplet => {
          const parts = String(triplet).split(',')
          return { r: parseInt(parts[0], 10) || 0, g: parseInt(parts[1], 10) || 0, b: parseInt(parts[2], 10) || 0 }
        }

        const rgbColor = toRgbTriplet(color)
        const resolvedPalette = (Array.isArray(colors) && colors.length ? colors : [color]).map(toRgbTriplet)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduceMotion.current = mq.matches
    const onChange = e => (reduceMotion.current = e.matches)
    mq.addEventListener?.('change', onChange)

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const container = fullScreen ? null : canvas.parentElement

    const state = {
      width: 0,
      height: 0,
    }

    const resize = () => {
      if (fullScreen) {
        state.width = Math.max(1, Math.floor(window.innerWidth))
        state.height = Math.max(1, Math.floor(window.innerHeight))
      } else {
        const rect = container?.getBoundingClientRect()
        state.width = Math.max(1, Math.floor(rect?.width || window.innerWidth))
        state.height = Math.max(1, Math.floor(rect?.height || window.innerHeight))
      }
      canvas.width = state.width
      canvas.height = state.height
      initParticles()
    }

    const initParticles = () => {
      const area = state.width * state.height
      const baseDensity = 22000 // higher => fewer particles
      const particleCount = Math.floor(area / (baseDensity / intensity))
      particlesRef.current = []

      const slow = reduceMotion.current
      for (let i = 0; i < particleCount; i++) {
        const pickStr = resolvedPalette[Math.floor(Math.random() * resolvedPalette.length)] || rgbColor
        const pick = parseTriplet(pickStr)
        particlesRef.current.push({
          x: Math.random() * state.width,
          y: Math.random() * state.height,
          vx: (Math.random() - 0.5) * (slow ? 0.05 : 0.18) * intensity,
          vy: (Math.random() - 0.5) * (slow ? 0.05 : 0.18) * intensity,
          size: Math.random() * 1.6 + 0.8,
          opacity: Math.random() * 0.3 + 0.15, // softer for light bg
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: (Math.random() * 0.012 + 0.004) * (slow ? 0.3 : 1) * intensity,
          color: pick,
          colorStr: `${pick.r}, ${pick.g}, ${pick.b}`,
        })
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.04)' // very light lines on white
      ctx.lineWidth = 1
      const size = gridSize
      for (let x = 0; x < state.width; x += size) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, state.height)
        ctx.stroke()
      }
      for (let y = 0; y < state.height; y += size) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(state.width, y + 0.5)
        ctx.stroke()
      }
    }

    const stepParticles = () => {
      const particles = particlesRef.current
      const connectDist = 120
      const connectAlpha = 0.16
      const influenceRadius = 140
      const damping = 0.992

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.pulse += p.pulseSpeed

        if (p.x < 0) p.x = state.width
        if (p.x > state.width) p.x = 0
        if (p.y < 0) p.y = state.height
        if (p.y > state.height) p.y = 0

        if (interactive) {
          const dx = mouseRef.current.x - p.x
          const dy = mouseRef.current.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist > 0 && dist < influenceRadius) {
            const force = (influenceRadius - dist) / influenceRadius
            p.vx -= (dx / dist) * force * 0.02
            p.vy -= (dy / dist) * force * 0.02
          }
        }

        p.vx *= damping
        p.vy *= damping
      }

      // Draw particles and connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.18

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.2)
        grad.addColorStop(0, `rgba(${p.colorStr}, ${pulseOpacity})`)
        grad.addColorStop(0.5, `rgba(${p.colorStr}, ${pulseOpacity * 0.35})`)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const o = particles[j]
          const dx = o.x - p.x
          const dy = o.y - p.y
          const dist = Math.hypot(dx, dy)
          if (dist < connectDist) {
            const mr = Math.round((p.color.r + o.color.r) / 2)
            const mg = Math.round((p.color.g + o.color.g) / 2)
            const mb = Math.round((p.color.b + o.color.b) / 2)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(o.x, o.y)
            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${(1 - dist / connectDist) * connectAlpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, state.width, state.height) // keep transparent for light bg
      drawGrid()
      stepParticles()
      rafRef.current = requestAnimationFrame(render)
    }

    const handleMouseMove = e => {
      if (fullScreen) {
        mouseRef.current.x = e.clientX
        mouseRef.current.y = e.clientY
      } else {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = e.clientX - rect.left
        mouseRef.current.y = e.clientY - rect.top
      }
    }

    const ro = fullScreen ? null : new ResizeObserver(resize)
    if (container && ro) ro.observe(container)
    resize()
    render()
    if (interactive) window.addEventListener('mousemove', handleMouseMove, { passive: true })
    if (fullScreen) window.addEventListener('resize', resize)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (container && ro) ro.disconnect()
      if (interactive) window.removeEventListener('mousemove', handleMouseMove)
      if (fullScreen) window.removeEventListener('resize', resize)
      mq.removeEventListener?.('change', onChange)
    }
  }, [gridSize, intensity, interactive, color, fullScreen])

  return (
    <canvas
      ref={canvasRef}
      className={(fullScreen ? 'site-canvas-bg ' : 'animated-canvas-bg ') + (className || '')}
      aria-hidden
    />
  )
}
