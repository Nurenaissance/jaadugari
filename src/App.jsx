import { useState, useEffect } from 'react'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import ReservationModal from './components/ReservationModal'
import { driveImg, IMAGES, VIDEO } from './lib/media'
import { menuData, categories } from './data/menu'
import { getVenue } from './data/venues'
import { useDocumentMeta } from './lib/meta'


// ============================================
// MAIN APP
// ============================================

const VENUE = getVenue('morjim')

const NAV_ANCHORS = [
  { id: 'about', label: 'Our Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'menu', label: 'Menu' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeCategory, setActiveCategory] = useState('starters')
  const [lightbox, setLightbox] = useState(null)
  const [reserveOpen, setReserveOpen] = useState(false)

  useDocumentMeta(
    'Jaadugari — Indian Resto & Bar | Morjim, Goa',
    'Jaadugari — Where Indian culinary magic meets Goan soul. Premium Indian dining & handcrafted cocktails in the heart of Morjim, North Goa.'
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeCategory])

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = (reserveOpen || lightbox !== null) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [reserveOpen, lightbox])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const galleryImages = [
    { id: IMAGES.gallery1, label: 'Ambiance' },
    { id: IMAGES.food1, label: 'Cuisine' },
    { id: IMAGES.gallery2, label: 'Interior' },
    { id: IMAGES.food2, label: 'Signature Dish' },
    { id: IMAGES.bar1, label: 'The Bar' },
    { id: IMAGES.food3, label: 'Plated Perfection' },
    { id: IMAGES.interior1, label: 'Dining Space' },
    { id: IMAGES.gallery3, label: 'Details' },
    { id: IMAGES.food4, label: 'Fresh Flavours' },
    { id: IMAGES.detail1, label: 'Artistry' },
    { id: IMAGES.gallery4, label: 'Setting' },
    { id: IMAGES.bar2, label: 'Cocktails' },
  ]

  return (
    <>
      {/* ========== RESERVATION MODAL ========== */}
      <ReservationModal
        isOpen={reserveOpen}
        onClose={() => setReserveOpen(false)}
        venue={VENUE.key}
        venueName={VENUE.name}
      />

      {/* ========== LIGHTBOX ========== */}
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

      {/* ========== NAVIGATION ========== */}
      <SiteNav
        venue={VENUE}
        anchors={NAV_ANCHORS}
        onReserve={() => setReserveOpen(true)}
      />

      {/* ========== HERO ========== */}
      <section className="hero">
        <div className="hero-bg" style={{
          backgroundImage: `
            linear-gradient(180deg,
              rgba(10,10,10,0.45) 0%,
              rgba(10,10,10,0.2) 30%,
              rgba(10,10,10,0.3) 60%,
              rgba(10,10,10,0.92) 100%
            ),
            url(${driveImg(IMAGES.hero)})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="hero-pattern"></div>

        <div className="hero-content">
          <div className="hero-ornament"></div>
          <p className="hero-subtitle-top">Lamrin &middot; Morjim &middot; Goa</p>
          <h1 className="hero-title">
            Jaadugari
            <span className="hero-title-accent">Indian Resto & Bar</span>
          </h1>

          <p className="hero-description">
            A new chapter of Indian culinary magic is about to unfold.
            Premium dining, handcrafted cocktails, and an ambiance
            that casts its spell — arriving at Lamrin, Morjim.
          </p>

          <div className="hero-divider">
            <span className="hero-divider-line"></span>
            <span className="hero-divider-dot"></span>
            <span className="hero-divider-line"></span>
          </div>
          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => setReserveOpen(true)}>
              Reserve a Table
            </button>
            <a href="#menu" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('menu') }}>
              Explore Menu
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
              <div className="about-image" style={{
                backgroundImage: `url(${driveImg(IMAGES.about)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
              </div>
              <div className="about-image-frame"></div>
            </div>

            <div className="about-content fade-in">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                A Spell of<br />Culinary Magic
              </h2>
              <p className="about-text">
                Jaadugari — meaning "enchantress" — is born from a deep love for India's
                diverse culinary heritage and the magical spirit of Goa. Nestled in
                the serene beauty of Lamrin, Morjim, we bring you an extraordinary dining
                experience where every dish tells a story.
              </p>
              <p className="about-text">
                Our kitchen celebrates regional treasures from Rajasthan's fiery Laal Maas
                to Goa's beloved Pork Vindaloo, from Kashmir's aromatic Rogan Josh to
                Bengal's delicate Mishti Doi — each plate crafted with reverence for
                tradition and a touch of contemporary artistry.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <h3 className="about-feature-title">Farm to Table</h3>
                  <p className="about-feature-text">Locally sourced ingredients from Goan farms and markets</p>
                </div>
                <div className="about-feature">
                  <h3 className="about-feature-title">Craft Cocktails</h3>
                  <p className="about-feature-text">Handcrafted drinks featuring local feni and Indian botanicals</p>
                </div>
                <div className="about-feature">
                  <h3 className="about-feature-title">Live Music</h3>
                  <p className="about-feature-text">Curated evenings with soulful live performances</p>
                </div>
                <div className="about-feature">
                  <h3 className="about-feature-title">Private Dining</h3>
                  <p className="about-feature-text">Intimate spaces for celebrations and special occasions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VIDEO SECTION ========== */}
      <section className="video-section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">A Glimpse</span>
            <h2 className="section-title">Experience Jaadugari</h2>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>
          <div className="video-wrapper fade-in">
            <iframe
              src={`https://drive.google.com/file/d/${VIDEO.jaadugari}/preview`}
              allow="autoplay"
              allowFullScreen
              title="Jaadugari Experience"
              className="video-frame"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCE STRIP ========== */}
      <section className="experience-strip">
        <div className="container">
          <div className="experience-grid">
            <div className="experience-item fade-in">
              <div className="experience-number">50+</div>
              <div className="experience-label">Curated Dishes</div>
            </div>
            <div className="experience-item fade-in">
              <div className="experience-number">20+</div>
              <div className="experience-label">Craft Cocktails</div>
            </div>
            <div className="experience-item fade-in">
              <div className="experience-number">7</div>
              <div className="experience-label">Days a Week</div>
            </div>
            <div className="experience-item fade-in">
              <div className="experience-number">4.8</div>
              <div className="experience-label">Guest Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PHOTO GALLERY ========== */}
      <section id="gallery" className="section gallery-section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Visual Journey</span>
            <h2 className="section-title">A Feast for the Eyes</h2>
            <p className="section-subtitle">
              From our kitchen to your table — every detail is a work of art.
            </p>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>
        </div>

        <div className="photo-grid">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`photo-grid-item ${i === 0 || i === 5 ? 'photo-grid-item--large' : ''} fade-in`}
              onClick={() => setLightbox(img.id)}
            >
              <img
                src={driveImg(img.id)}
                alt={img.label}
                loading="lazy"
              />
              <div className="photo-grid-overlay">
                <span className="photo-grid-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== MENU ========== */}
      <section id="menu" className="section menu">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Curated with Love</span>
            <h2 className="section-title">Our Menu</h2>
            <p className="section-subtitle">
              A culinary voyage across India — from the royal kitchens of Rajasthan
              to the coastal flavours of Goa, each dish crafted to enchant.
            </p>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>

          <div className="menu-tabs fade-in">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`menu-tab ${activeCategory === cat.key ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {menuData[activeCategory].map((item, i) => (
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

          <div className="menu-note fade-in">
            <p className="menu-note-text">
              VAT/GST extra as applicable. A 10% service charge is added for our hardworking team and can be removed upon request. Please inform your server of any dietary requirements or allergies. Please drink responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* ========== AMBIANCE ========== */}
      <section id="ambiance" className="section ambiance">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">The Experience</span>
            <h2 className="section-title">Step Into the Magic</h2>
            <p className="section-subtitle">
              From sunset cocktails to candlelit dinners, every moment at
              Jaadugari is crafted to leave you spellbound.
            </p>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>
        </div>

        <div className="ambiance-gallery">
          <div className="ambiance-card fade-in" style={{
            backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%), url(${driveImg(IMAGES.ambiance1)})`,
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}>
            <div className="ambiance-card-content">
              <h3 className="ambiance-card-title">Fine Dining</h3>
              <p className="ambiance-card-text">
                Elegant indoor seating with warm ambient lighting,
                curated music, and impeccable service.
              </p>
            </div>
          </div>

          <div className="ambiance-card fade-in" style={{
            backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%), url(${driveImg(IMAGES.ambiance2)})`,
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}>
            <div className="ambiance-card-content">
              <h3 className="ambiance-card-title">The Terrace</h3>
              <p className="ambiance-card-text">
                Alfresco dining under the Goan sky with a
                cocktail in hand and the breeze on your skin.
              </p>
            </div>
          </div>

          <div className="ambiance-card fade-in" style={{
            backgroundImage: `linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%), url(${driveImg(IMAGES.ambiance3)})`,
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}>
            <div className="ambiance-card-content">
              <h3 className="ambiance-card-title">The Bar</h3>
              <p className="ambiance-card-text">
                Handcrafted cocktails, premium spirits, and local feni
                creations in an intimate lounge setting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COCKTAIL VIDEO ========== */}
      <section className="video-section video-section--alt">
        <div className="container">
          <div className="video-split fade-in">
            <div className="video-split-content">
              <span className="section-label">Crafted Cocktails</span>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: 'clamp(28px, 4vw, 44px)' }}>
                The Art of<br />the Pour
              </h2>
              <p className="about-text">
                Our mixologists craft each cocktail with precision and passion.
                From signature feni-based creations to reimagined classics,
                every glass is an experience in itself.
              </p>
            </div>
            <div className="video-split-frame">
              <iframe
                src={`https://drive.google.com/file/d/${VIDEO.cocktail}/preview`}
                allow="autoplay"
                allowFullScreen
                title="Cocktail Crafting"
                className="video-frame"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ========== QUOTE ========== */}
      <section className="quote-section" style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.88), rgba(10,10,10,0.88)), url(${driveImg(IMAGES.detail3)})`,
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'
      }}>
        <div className="container">
          <p className="quote-text fade-in">
            "Jaadugari is not just a restaurant — it is an experience.
            The flavours, the ambiance, the warmth — pure magic."
          </p>
          <p className="quote-author fade-in">A Beloved Guest</p>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Find Us</span>
            <h2 className="section-title">Visit Jaadugari</h2>
            <p className="section-subtitle">
              We look forward to welcoming you. Reserve your table
              or simply walk in — the magic awaits.
            </p>
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
                Jaadugari Indian Resto & Bar<br />
                Lamrin Morjim, 664/A<br />
                Munugwada, Malekarwada<br />
                Morjim, Goa 403512
              </p>
            </div>

            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128222;</div>
              <h3 className="contact-card-title">Reservations</h3>
              <p className="contact-card-text">
                <a href="tel:+919876543210" className="contact-card-link">+91 98765 43210</a>
                <br />
                <a href="tel:+919876543211" className="contact-card-link">+91 98765 43211</a>
                <br /><br />
                <a href="mailto:hello@jaadugari.com" className="contact-card-link">hello@jaadugari.com</a>
                <br /><br />
                <button className="btn-primary" onClick={() => setReserveOpen(true)} style={{ fontSize: '10px', padding: '12px 24px' }}>
                  Book Online
                </button>
              </p>
            </div>

            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128337;</div>
              <h3 className="contact-card-title">Hours</h3>
              <p className="contact-card-text">
                <strong>Lunch</strong><br />
                12:00 PM — 3:30 PM<br /><br />
                <strong>Dinner</strong><br />
                7:00 PM — 11:30 PM<br /><br />
                <strong>Bar</strong><br />
                12:00 PM — 12:00 AM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <SiteFooter venue={VENUE} links={NAV_ANCHORS} />
    </>
  )
}

export default App
