import { useState, useEffect } from 'react'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'
import ReservationModal from '../components/ReservationModal'
import { driveImg } from '../lib/media'
import { mapsUrl } from '../data/venues'

// Shown wherever the client has not supplied the real details yet.
function ComingSoon({ children }) {
  return <p className="coming-soon">{children}</p>
}

// Shared layout for the secondary venue pages (Bakehouse, Palampur).
function VenuePage({ venue }) {
  const [menuOpenCategory, setMenuOpenCategory] = useState(
    venue.menu?.categories?.[0]?.key ?? null
  )
  const [lightbox, setLightbox] = useState(null)
  const [reserveOpen, setReserveOpen] = useState(false)

  const gallery = venue.galleryImages ?? []
  const menuItems = venue.menu && menuOpenCategory
    ? (venue.menu.items[menuOpenCategory] ?? [])
    : []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [menuOpenCategory])

  useEffect(() => {
    document.body.style.overflow = (reserveOpen || lightbox !== null) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [reserveOpen, lightbox])

  const anchors = [
    { id: 'about', label: 'The Place' },
    ...(venue.menu ? [{ id: 'menu', label: 'Menu' }] : []),
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ]

  // Until the venue's own photography arrives, the hero falls back to the
  // house gradient rather than borrowing images from another venue.
  const heroBackground = venue.heroImage
    ? `
      linear-gradient(180deg,
        rgba(10,10,10,0.5) 0%,
        rgba(10,10,10,0.25) 30%,
        rgba(10,10,10,0.35) 60%,
        rgba(10,10,10,0.92) 100%
      ),
      url(${driveImg(venue.heroImage)})
    `
    : 'linear-gradient(160deg, #241a12 0%, #17130f 45%, #0a0a0a 100%)'

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <ReservationModal
        isOpen={reserveOpen}
        onClose={() => setReserveOpen(false)}
        venue={venue.key}
        venueName={venue.name}
      />

      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>&times;</button>
          <img
            src={driveImg(lightbox)}
            alt="Gallery"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <SiteNav venue={venue} anchors={anchors} onReserve={() => setReserveOpen(true)} />

      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-bg" style={{
          backgroundImage: heroBackground,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="hero-pattern"></div>

        <div className="hero-content">
          <div className="hero-ornament"></div>
          <p className="hero-subtitle-top">{venue.place}</p>
          <h1 className="hero-title">
            Jaadugari
            <span className="hero-title-accent">{venue.shortName}</span>
          </h1>

          <p className="hero-description">{venue.intro?.[0]}</p>

          <div className="hero-divider">
            <span className="hero-divider-line"></span>
            <span className="hero-divider-dot"></span>
            <span className="hero-divider-line"></span>
          </div>

          <div className="hero-cta-group">
            {venue.takesReservations && (
              <button className="btn-primary" onClick={() => setReserveOpen(true)}>
                Reserve a Table
              </button>
            )}
            <a
              href="#contact"
              className={venue.takesReservations ? 'btn-secondary' : 'btn-primary'}
              onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
            >
              Find Us
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <span className="hero-scroll-line"></span>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section id="about" className="section about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-wrapper fade-in">
              <div
                className="about-image"
                style={venue.aboutImage ? {
                  backgroundImage: `url(${driveImg(venue.aboutImage)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                } : undefined}
              >
                {!venue.aboutImage && (
                  <div className="about-image-inner">
                    <div className="about-image-icon">&#10022;</div>
                    <p className="about-image-text">Photographs coming soon</p>
                  </div>
                )}
              </div>
              <div className="about-image-frame"></div>
            </div>

            <div className="about-content fade-in">
              <span className="section-label">{venue.kind}</span>
              <h2 className="section-title">{venue.name}</h2>
              {venue.intro?.map((para, i) => (
                <p key={i} className="about-text">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== MENU ========== */}
      {venue.menu && (
        <section id="menu" className="section menu">
          <div className="container">
            <div className="section-header fade-in">
              <span className="section-label">Curated with Love</span>
              <h2 className="section-title">Our Menu</h2>
              <div className="section-ornament">
                <span className="section-ornament-line"></span>
                <span className="section-ornament-diamond"></span>
                <span className="section-ornament-line"></span>
              </div>
            </div>

            <div className="menu-tabs fade-in">
              {venue.menu.categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`menu-tab ${menuOpenCategory === cat.key ? 'active' : ''}`}
                  onClick={() => setMenuOpenCategory(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {menuItems.length > 0 ? (
              <div className="menu-grid">
                {menuItems.map((item, i) => (
                  <div key={i} className="menu-item fade-in">
                    <div className="menu-item-info">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <p className="menu-item-desc">{item.desc}</p>
                      {item.tag && <span className="menu-item-tag">{item.tag}</span>}
                    </div>
                    <span className="menu-item-price">{item.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fade-in">
                <ComingSoon>
                  Our {venue.shortName} menu is being finalised — it will appear here shortly.
                </ComingSoon>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========== GALLERY ========== */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Visual Journey</span>
            <h2 className="section-title">A Glimpse</h2>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>

          {gallery.length === 0 && (
            <div className="fade-in">
              <ComingSoon>
                Photographs of {venue.name} are on their way.
              </ComingSoon>
            </div>
          )}
        </div>

        {gallery.length > 0 && (
          <div className="photo-grid">
            {gallery.map((img, i) => (
              <div
                key={i}
                className="photo-grid-item fade-in"
                onClick={() => setLightbox(img.id)}
              >
                <img src={driveImg(img.id)} alt={img.label} loading="lazy" />
                <div className="photo-grid-overlay">
                  <span className="photo-grid-label">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Find Us</span>
            <h2 className="section-title">Visit {venue.shortName}</h2>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>

          <div className="contact-grid">
            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128205;</div>
              <h3 className="contact-card-title">Location</h3>
              <p className="contact-card-text">
                {venue.addressLines.map((line, i) => (
                  <span key={i}>{line}<br /></span>
                ))}
              </p>
              <a
                href={mapsUrl(venue)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card-link"
              >
                Open in Google Maps
              </a>
            </div>

            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128222;</div>
              <h3 className="contact-card-title">
                {venue.takesReservations ? 'Reservations' : 'Get in Touch'}
              </h3>
              {venue.phones.length > 0 || venue.email ? (
                <p className="contact-card-text">
                  {venue.phones.map((phone) => (
                    <span key={phone}>
                      <a href={`tel:${phone.replace(/\s/g, '')}`} className="contact-card-link">{phone}</a>
                      <br />
                    </span>
                  ))}
                  {venue.email && (
                    <>
                      <br />
                      <a href={`mailto:${venue.email}`} className="contact-card-link">{venue.email}</a>
                    </>
                  )}
                </p>
              ) : (
                <ComingSoon>Contact number coming soon.</ComingSoon>
              )}
              {venue.takesReservations && (
                <button
                  className="btn-primary"
                  onClick={() => setReserveOpen(true)}
                  style={{ fontSize: '10px', padding: '12px 24px', marginTop: '20px' }}
                >
                  Book Online
                </button>
              )}
            </div>

            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128337;</div>
              <h3 className="contact-card-title">Hours</h3>
              {venue.hours ? (
                <p className="contact-card-text">
                  {venue.hours.map((h) => (
                    <span key={h.label}>
                      <strong>{h.label}</strong><br />
                      {h.time}<br /><br />
                    </span>
                  ))}
                </p>
              ) : (
                <ComingSoon>Opening hours coming soon.</ComingSoon>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter venue={venue} links={anchors} />
    </>
  )
}

export default VenuePage
