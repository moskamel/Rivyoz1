import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target, { duration = 1200, decimals = 0, enabled = true } = {}) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!enabled || typeof target !== 'number') return

    const start = performance.now()
    const easeOutCubic = t => 1 - Math.pow(1 - t, 3)

    const tick = now => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setValue(+(eased * target).toFixed(decimals))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, decimals, enabled])

  return value
}
