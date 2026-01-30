import { useState, useEffect } from 'react'

// ============================================
// GOOGLE DRIVE IMAGE HELPERS
// ============================================

const driveImg = (id) =>
  `https://lh3.googleusercontent.com/d/${id}`

// Image assignments (from Google Drive folder)
const IMAGES = {
  hero: '1Bp1hjpJv32ZK0JLd2pCD47p1pCQhydcN',           // 1.jpg
  about: '11aYO0t_doI_HbcqGwOPriE7Ttgd7cma6',          // 2.jpg
  gallery1: '1vhtNceLPr3hjeo8FuA5lB8LNvhj8dxWL',       // 3.jpg
  gallery2: '1yCv5uDlWAmlHCaOXzWjlNx41Sgcogm3f',       // 4.jpg
  gallery3: '18eFHTr340l0xz_-dVXy89eJpVAB1p0MB',        // 5.jpg
  gallery4: '1llkurSxm3u51Px4Ur0-byxpdm8GP8-Ch',        // 6.jpg
  gallery5: '1KucxtpD4AUvQ5DPcP-sRb9pqYT3Mh9Vo',       // 7.jpg
  gallery6: '1tJ6UKiEjxx8epbb4pqCQOYn6AHOf5hxn',        // 8.jpg
  ambiance1: '1_b8L1PlUJTO8gHmx-YpvDj_5Be7o6PnK',      // 9.jpg
  ambiance2: '1O3Xu0ZLE8onHB5ys7xS5WBDWE361FWuh',       // 10.jpg
  ambiance3: '1JudrGNor9opKHBEv69DTyKEFY0QM5rY4',       // 10.jpg (2nd)
  food1: '1QgITa4CFO_cPsxNfLZ2lkA5iiJy4-3aV',          // 11.jpg
  food2: '1pRLRDJ5F9aSdUUmYDOb1sSrJaLysxMZM',          // 12.jpg
  food3: '17tUqZfyvMKqjMbaSKfhnVaaoeEPlzmmS',           // 13.jpg
  food4: '1h8bZ_DjBtiOXK3syoEpmyRBwrkmjs_Rp',           // 14.jpg
  interior1: '11VzXMIRCrMtHvJsw-9dTv6e8tkNK3t7W',       // 15.jpg
  interior2: '1pnTJA8BTjr_KlTJReHKDIqX285fJNWss',       // 16.jpg
  bar1: '1WUNpc3C4uvrXqotd2PPF6wfASRx506KP',            // 17.jpg
  bar2: '1g2iWxbS5nVgGc43sdr-Eg1LaoTg0_5WZ',            // 18.jpg
  detail1: '1xoAmik93CGQBn1Dcr_kdm8gz4WcCzm1Q',         // 19.jpg
  detail2: '1u225Nxt7GYnxndSrx0souFv0XVvhmR3d',          // 20.jpg
  detail3: '10n1cliV-NfMi-0A61FGOW3bBuczTySwZ',          // 21.jpg
  detail4: '1BCquoC1VIUJPJ8NHHLJs9lR147dNCyt0',          // 22.jpg
  detail5: '1-mOpIxqwue8vN5w3_jTRtDcW8kRlqguI',         // 23.jpg
  detail6: '1dqtwmo5BANoeDs1nY05ZwnQnuFUW8p9p',          // 24.jpg
}

const VIDEO = {
  cocktail: '1br9vizFkr9yAxbWsBH1eFQIY4FQNv1hv',
  collage: '1QR1_X7-oNONVqYRVfm9LefdgzPhPb7Qi',
  jaadugari: '17wnq15FzOYuRMdp8NFWdPrmgm69c56Kj',
}

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
// MAIN APP
// ============================================

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('starters')
  const [lightbox, setLightbox] = useState(null)

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

  const scrollToSection = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Gallery images for the photo grid
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
          <span className="nav-logo-tagline">Resto & Bar</span>
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
            <a href="tel:+919876543210" className="nav-reserve-btn">
              Reserve a Table
            </a>
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
          <p className="hero-subtitle-top">Kings Central NH1 &middot; Main GT Road &middot; Goa</p>
          <h1 className="hero-title">
            Jaadugari
            <span className="hero-title-accent">Resto & Bar</span>
          </h1>

          <div className="hero-badge">
            <span className="hero-badge-text">Opening Soon</span>
          </div>

          <p className="hero-description">
            A new chapter of Indian culinary magic is about to unfold.
            Premium dining, handcrafted cocktails, and an ambiance
            that casts its spell — coming to Kings Central, NH1.
          </p>

          <div className="hero-divider">
            <span className="hero-divider-line"></span>
            <span className="hero-divider-dot"></span>
            <span className="hero-divider-line"></span>
          </div>
          <div className="hero-cta-group">
            <a href="#menu" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('menu') }}>
              Explore Menu
            </a>
            <a href="#contact" className="btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
              Get in Touch
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
                diverse culinary heritage and the magical spirit of Goa. Located at the
                prestigious Kings Central on NH1, we bring you an extraordinary dining
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
              <div className="experience-number">NH1</div>
              <div className="experience-label">Kings Central</div>
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
          <p className="quote-author fade-in">Coming Soon to Kings Central, NH1</p>
        </div>
      </section>

      {/* ========== CONTACT ========== */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header fade-in">
            <span className="section-label">Find Us</span>
            <h2 className="section-title">Visit Jaadugari</h2>
            <p className="section-subtitle">
              We look forward to welcoming you. The magic awaits
              at Kings Central on Main GT Road, NH1.
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
                Jaadugari Resto & Bar<br />
                Kings Central, NH1<br />
                Main GT Road<br />
                Goa
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
              </p>
            </div>

            <div className="contact-card fade-in">
              <div className="contact-card-icon">&#128337;</div>
              <h3 className="contact-card-title">Hours</h3>
              <p className="contact-card-text">
                <strong>Opening Soon</strong><br /><br />
                <strong>Expected Hours:</strong><br />
                Lunch: 12:00 PM — 3:30 PM<br />
                Dinner: 7:00 PM — 11:30 PM<br />
                Bar: 12:00 PM — 12:00 AM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <h2 className="footer-logo">Jaadugari</h2>
            <p className="footer-tagline">Resto & Bar — Kings Central, NH1, Goa</p>

            <div className="footer-social">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">FB</a>
              <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Zomato">Z</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">WA</a>
            </div>

            <div className="footer-bottom">
              <p className="footer-copyright">
                &copy; {new Date().getFullYear()} Jaadugari Resto & Bar. All rights reserved.
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
