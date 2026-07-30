import { useState, useEffect } from 'react'
import { Link } from '../lib/router'

// Shared top navigation. `anchors` are in-page sections for the current page.
function SiteNav({ venue, anchors = [], onReserve }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
        <span className="nav-logo-text">Jaadugari</span>
        <span className="nav-logo-tagline">{venue.tagline}</span>
      </Link>

      <button
        className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {anchors.map((a) => (
          <li key={a.id}>
            <a
              href={`#${a.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(a.id) }}
            >
              {a.label}
            </a>
          </li>
        ))}

        {venue.takesReservations && (
          <li>
            <button
              className="nav-reserve-btn"
              onClick={() => { setMenuOpen(false); onReserve?.() }}
            >
              Reserve a Table
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default SiteNav
