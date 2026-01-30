import { useState, useEffect } from 'react'

// ============================================
// GOOGLE DRIVE IMAGE HELPERS
// ============================================

const driveImg = (id) =>
  `https://lh3.googleusercontent.com/d/${id}`

const IMAGES = {
  hero: '1Bp1hjpJv32ZK0JLd2pCD47p1pCQhydcN',
  about: '11aYO0t_doI_HbcqGwOPriE7Ttgd7cma6',
  gallery1: '1vhtNceLPr3hjeo8FuA5lB8LNvhj8dxWL',
  gallery2: '1yCv5uDlWAmlHCaOXzWjlNx41Sgcogm3f',
  gallery3: '18eFHTr340l0xz_-dVXy89eJpVAB1p0MB',
  gallery4: '1llkurSxm3u51Px4Ur0-byxpdm8GP8-Ch',
  gallery5: '1KucxtpD4AUvQ5DPcP-sRb9pqYT3Mh9Vo',
  gallery6: '1tJ6UKiEjxx8epbb4pqCQOYn6AHOf5hxn',
  ambiance1: '1_b8L1PlUJTO8gHmx-YpvDj_5Be7o6PnK',
  ambiance2: '1O3Xu0ZLE8onHB5ys7xS5WBDWE361FWuh',
  ambiance3: '1JudrGNor9opKHBEv69DTyKEFY0QM5rY4',
  food1: '1QgITa4CFO_cPsxNfLZ2lkA5iiJy4-3aV',
  food2: '1pRLRDJ5F9aSdUUmYDOb1sSrJaLysxMZM',
  food3: '17tUqZfyvMKqjMbaSKfhnVaaoeEPlzmmS',
  food4: '1h8bZ_DjBtiOXK3syoEpmyRBwrkmjs_Rp',
  interior1: '11VzXMIRCrMtHvJsw-9dTv6e8tkNK3t7W',
  interior2: '1pnTJA8BTjr_KlTJReHKDIqX285fJNWss',
  bar1: '1WUNpc3C4uvrXqotd2PPF6wfASRx506KP',
  bar2: '1g2iWxbS5nVgGc43sdr-Eg1LaoTg0_5WZ',
  detail1: '1xoAmik93CGQBn1Dcr_kdm8gz4WcCzm1Q',
  detail2: '1u225Nxt7GYnxndSrx0souFv0XVvhmR3d',
  detail3: '10n1cliV-NfMi-0A61FGOW3bBuczTySwZ',
  detail4: '1BCquoC1VIUJPJ8NHHLJs9lR147dNCyt0',
  detail5: '1-mOpIxqwue8vN5w3_jTRtDcW8kRlqguI',
  detail6: '1dqtwmo5BANoeDs1nY05ZwnQnuFUW8p9p',
}

const VIDEO = {
  cocktail: '1br9vizFkr9yAxbWsBH1eFQIY4FQNv1hv',
  collage: '1QR1_X7-oNONVqYRVfm9LefdgzPhPb7Qi',
  jaadugari: '17wnq15FzOYuRMdp8NFWdPrmgm69c56Kj',
}

const WEBHOOK_URL = 'https://nurenaiautomatic-b7hmdnb4fzbpbtbh.canadacentral-01.azurewebsites.net/webhook/d0eb1fcd-c4aa-4afa-b8e9-68e4178bd937'

// ============================================
// MENU DATA
// ============================================

const menuData = {
  starters: [
    { name: 'Patte Ki Chaat', desc: 'Crispy spinach leaves, tangy tamarind, yoghurt mousse, pomegranate', price: '₹395', tag: 'signature' },
    { name: 'Bharwan Gucchi', desc: 'Wild Himalayan morels stuffed with paneer khurchan, saffron cream', price: '₹695', tag: "chef's pick" },
    { name: 'Mutton Ghee Roast', desc: 'Slow-roasted Mangalorean-style lamb, curry leaf tempering, coconut', price: '₹595' },
    { name: 'Prawn Koliwada', desc: 'Goan rock prawns, semolina crust, green chutney, lemon zest', price: '₹545' },
    { name: 'Amritsari Fish Tikka', desc: 'Fresh catch marinated in carom & chaat masala, tandoor-kissed', price: '₹495' },
    { name: 'Paneer Malai Tikka', desc: 'Silken cottage cheese, cashew-cream marinade, charcoal-grilled', price: '₹425' },
    { name: 'Crab Xec Xec', desc: 'Goan crab preparation with roasted coconut and red chilli masala', price: '₹645', tag: 'goan special' },
    { name: 'Chicken Seekh Gilafi', desc: 'Minced chicken seekh with peppers, coriander & green chilli', price: '₹445' },
  ],
  mains: [
    { name: 'Laal Maas', desc: 'Fiery Rajasthani mutton curry, mathania chillies, slow-cooked 8 hours', price: '₹695', tag: 'signature' },
    { name: 'Raw Mango Prawn Curry', desc: 'Goan-style tiger prawns, raw mango, coconut milk, curry leaf', price: '₹645' },
    { name: 'Ker Sangri Kofta', desc: 'Desert berry & bean dumplings in rich, aromatic tomato gravy', price: '₹495', tag: 'vegetarian' },
    { name: 'Goan Fish Curry Rice', desc: 'Fresh kingfish, kokum-laced coconut curry, steamed Goan rice', price: '₹595', tag: 'goan special' },
    { name: 'Butter Chicken', desc: 'The timeless classic — smoky tandoori chicken, velvety makhani gravy', price: '₹545' },
    { name: 'Dal Jaadugari', desc: 'Our signature black lentils, 24-hour slow cook, finished with cream', price: '₹395', tag: 'signature' },
    { name: 'Rogan Josh', desc: 'Kashmir valley lamb, whole spice aromatics, saffron-infused sauce', price: '₹675' },
    { name: 'Pork Vindaloo', desc: 'Classic Goan pork, toddy vinegar, fiery red spice paste', price: '₹575', tag: 'goan special' },
  ],
  bar: [
    { name: 'Jaadugari Sunset', desc: 'Feni, passion fruit, lime, kokum syrup, sparkling finish', price: '₹545', tag: 'signature' },
    { name: 'Morjim Mule', desc: 'Local cashew feni, ginger beer, lime, mint, crushed ice', price: '₹495', tag: 'signature' },
    { name: 'Spice Route Old Fashioned', desc: 'Bourbon, cardamom, jaggery, Angostura, orange zest', price: '₹595' },
    { name: 'Coconut Espresso Martini', desc: 'Vodka, fresh espresso, coconut cream, coffee liqueur', price: '₹545' },
    { name: 'Goan Sangria', desc: 'Red wine, port, feni, tropical fruits, cinnamon, star anise', price: '₹495' },
    { name: 'Tamarind Margarita', desc: 'Tequila, tamarind, triple sec, chilli-salt rim, lime', price: '₹525' },
    { name: 'Classic Negroni', desc: 'Gin, Campari, sweet vermouth — stirred, not shaken', price: '₹575' },
    { name: 'Virgin Kokum Cooler', desc: 'Kokum, mint, lime, soda, jaggery — refreshingly Goan', price: '₹245' },
  ],
  desserts: [
    { name: 'Bebinca', desc: 'Traditional Goan seven-layer pudding, coconut cream, nutmeg', price: '₹395', tag: 'goan special' },
    { name: 'Gulab Jamun Brulee', desc: 'Rose-scented custard, caramelised sugar, cardamom crumble', price: '₹345', tag: 'signature' },
    { name: 'Saffron Kulfi', desc: 'Hand-churned Lucknowi kulfi, pistachio praline, rose petal', price: '₹295' },
    { name: 'Chocolate Fondant', desc: 'Molten dark chocolate, salted caramel, vanilla bean gelato', price: '₹445' },
    { name: 'Mango Phirni', desc: 'Alphonso mango, slow-set rice pudding, almond flakes', price: '₹295' },
    { name: 'Mishti Doi Panna Cotta', desc: 'Bengali sweet yoghurt panna cotta, date-palm jaggery', price: '₹345' },
  ],
}

const categories = [
  { key: 'starters', label: 'Starters' },
  { key: 'mains', label: 'Mains' },
  { key: 'bar', label: 'Bar & Cocktails' },
  { key: 'desserts', label: 'Desserts' },
]

// ============================================
// RESERVATION FORM COMPONENT
// ============================================

function ReservationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'jaadugari-website',
          type: 'reservation',
          ...form,
          submitted_at: new Date().toISOString(),
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', date: '', time: '', guests: '2', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>

        <div className="modal-header">
          <span className="section-label">Reservations</span>
          <h2 className="modal-title">Reserve a Table</h2>
          <p className="modal-subtitle">Fill in your details and we'll confirm your reservation.</p>
        </div>

        {status === 'success' ? (
          <div className="modal-success">
            <div className="modal-success-icon">&#10003;</div>
            <h3 className="modal-success-title">Reservation Received</h3>
            <p className="modal-success-text">
              Thank you! We'll get back to you shortly to confirm your table.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: '24px' }}>
              Close
            </button>
          </div>
        ) : (
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-row form-row--three">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time *</label>
                <select
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="13:30">1:30 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="14:30">2:30 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="22:30">10:30 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Guests *</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                  <option value="10+">10+ Guests</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Special Requests</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="form-input form-textarea"
                placeholder="Any dietary requirements, celebrations, seating preferences..."
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="btn-primary form-submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Confirm Reservation'}
            </button>

            {status === 'error' && (
              <p className="form-error">Something went wrong. Please try again or call us directly.</p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

// ============================================
// MAIN APP
// ============================================

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('starters')
  const [lightbox, setLightbox] = useState(null)
  const [reserveOpen, setReserveOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setMenuOpen(false)
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
      <ReservationModal isOpen={reserveOpen} onClose={() => setReserveOpen(false)} />

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
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
          <span className="nav-logo-text">Jaadugari</span>
          <span className="nav-logo-tagline">Indian Resto & Bar</span>
        </div>

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
          <li><a href="#about" onClick={() => scrollToSection('about')}>Our Story</a></li>
          <li><a href="#gallery" onClick={() => scrollToSection('gallery')}>Gallery</a></li>
          <li><a href="#menu" onClick={() => scrollToSection('menu')}>Menu</a></li>
          <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          <li>
            <button className="nav-reserve-btn" onClick={() => { setMenuOpen(false); setReserveOpen(true) }}>
              Reserve a Table
            </button>
          </li>
        </ul>
      </nav>

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

          <div className="hero-badge">
            <span className="hero-badge-text">Opening Soon</span>
          </div>

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
              All prices inclusive of taxes. Please inform your server of any dietary requirements or allergies.
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

      {/* ========== UPCOMING LOCATION ========== */}
      <section className="section upcoming-section">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Coming Soon</span>
            <h2 className="section-title">Our Next Chapter</h2>
            <p className="section-subtitle">
              The magic of Jaadugari is expanding. A brand new outpost is on its way.
            </p>
            <div className="section-ornament">
              <span className="section-ornament-line"></span>
              <span className="section-ornament-diamond"></span>
              <span className="section-ornament-line"></span>
            </div>
          </div>

          <div className="upcoming-card fade-in">
            <div className="upcoming-badge">Upcoming</div>
            <h3 className="upcoming-title">Jaadugari &mdash; Kings Central</h3>
            <p className="upcoming-address">
              Kings Central, NH1<br />
              Main GT Road, Goa
            </p>
            <div className="upcoming-divider"></div>
            <p className="upcoming-text">
              Our second location brings the same enchanting dining experience
              to the bustling GT Road corridor. Stay tuned for the grand opening.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h2 className="footer-logo">Jaadugari</h2>
            <p className="footer-tagline">Indian Resto & Bar — Lamrin, Morjim, Goa</p>

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
                <a href="#about" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a>
                <a href="#menu" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('menu') }}>Menu</a>
                <a href="#contact" className="footer-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
