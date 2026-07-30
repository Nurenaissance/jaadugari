// Shared footer. `links` are in-page anchors for the current page.
function SiteFooter({ venue, links = [] }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <h2 className="footer-logo">Jaadugari</h2>
          <p className="footer-tagline">{venue.kind} — {venue.place}</p>

          <div className="footer-social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">IG</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">FB</a>
            <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Zomato">Z</a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">WA</a>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Jaadugari Indian Resto & Bar. All rights reserved.
            </p>
            <div className="footer-links">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="footer-link"
                  onClick={(e) => { e.preventDefault(); scrollToSection(l.id) }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
