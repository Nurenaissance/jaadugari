import { useState, useEffect } from 'react'

// ============================================
// MINIMAL PATH ROUTER (no dependencies)
// ============================================

const normalise = (path) =>
  path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path

export function usePath() {
  const [path, setPath] = useState(() => normalise(window.location.pathname))

  useEffect(() => {
    const handle = () => setPath(normalise(window.location.pathname))
    window.addEventListener('popstate', handle)
    window.addEventListener('jaadugari:navigate', handle)
    return () => {
      window.removeEventListener('popstate', handle)
      window.removeEventListener('jaadugari:navigate', handle)
    }
  }, [])

  return path
}

export function navigate(to) {
  if (normalise(window.location.pathname) !== normalise(to)) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new Event('jaadugari:navigate'))
  }
  window.scrollTo({ top: 0, behavior: 'auto' })
}

export function Link({ to, children, onClick, ...rest }) {
  const handleClick = (e) => {
    // Let modified clicks (new tab, etc.) behave natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    onClick?.(e)
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
