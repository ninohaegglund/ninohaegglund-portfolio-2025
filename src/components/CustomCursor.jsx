import React, { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursor = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const dest = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const canUse = window.matchMedia && window.matchMedia('(pointer: fine) and (hover: hover)').matches
    if (!canUse) return

    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      dest.current.x = e.clientX
      dest.current.y = e.clientY
      cursor.current.style.display = 'block'
    }

    const onLeave = () => {
      cursor.current.style.display = 'none'
    }

    const onEnterHoverTarget = (e) => {
      const target = e.target.closest('[data-cursor="hover"]')
      if (target) cursor.current.classList.add('custom-cursor--hover')
    }
    const onLeaveHoverTarget = (e) => {
      const target = e.target.closest('[data-cursor="hover"]')
      if (target) cursor.current.classList.remove('custom-cursor--hover')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover', onEnterHoverTarget)
    window.addEventListener('mouseout', onLeaveHoverTarget)

    const lerp = (a, b, n) => (1 - n) * a + n * b

    const tick = () => {
      pos.current.x = lerp(pos.current.x, dest.current.x, 0.18)
      pos.current.y = lerp(pos.current.y, dest.current.y, 0.18)
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover', onEnterHoverTarget)
      window.removeEventListener('mouseout', onLeaveHoverTarget)
      cancelAnimationFrame(raf.current)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div
      ref={cursor}
      className="custom-cursor"
      aria-hidden
      style={{ display: 'none' }}
    />
  )
}
