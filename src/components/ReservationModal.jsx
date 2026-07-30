import { useState } from 'react'
import { WEBHOOK_URL } from '../lib/media'

// ============================================
// RESERVATION FORM COMPONENT
// ============================================

function ReservationModal({ isOpen, onClose, venue = 'morjim', venueName = 'Jaadugari' }) {
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
          venue,
          venue_name: venueName,
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
          <p className="modal-subtitle">Fill in your details and we'll confirm your reservation at {venueName}.</p>
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

export default ReservationModal
