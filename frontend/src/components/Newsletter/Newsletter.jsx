import { useState } from 'react';
import { FiMail, FiArrowRight, FiGift } from 'react-icons/fi';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter__card">
          <div className="newsletter__orb-1" />
          <div className="newsletter__orb-2" />

          <div className="newsletter__content">
            <div className="newsletter__icon-wrap">
              <FiGift size={28} />
            </div>
            <span className="section-tag">🎁 Exclusive Deals</span>
            <h2 className="newsletter__title">
              Get <span className="gradient-text">₹2,000 Off</span> Your First Stay
            </h2>
            <p className="newsletter__desc">
              Join 50,000+ savvy travellers who get early access to deals, insider destination guides, and exclusive LyfeStays member benefits — straight to their inbox.
            </p>

            {!submitted ? (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <div className="newsletter__input-wrap">
                  <FiMail className="newsletter__input-icon" />
                  <input
                    type="email"
                    className="newsletter__input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary newsletter__btn">
                  Get ₹2,000 Coupon <FiArrowRight />
                </button>
              </form>
            ) : (
              <div className="newsletter__success">
                <span>🎉</span>
                <p>
                  <strong>Welcome aboard!</strong> Your ₹2,000 coupon has been sent to your inbox.
                </p>
              </div>
            )}

            <p className="newsletter__note">
              No spam, ever. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.
            </p>
          </div>

          {/* Right Side Visual */}
          <div className="newsletter__visual">
            <div className="newsletter__stat-cards">
              {[
                { emoji: '🏝️', label: 'Andaman Deal', discount: '35% OFF', price: '₹11,000/night' },
                { emoji: '⛰️', label: 'Manali Special', discount: '20% OFF', price: '₹8,500/night' },
                { emoji: '🌊', label: 'Goa Weekend', discount: '28% OFF', price: '₹6,200/night' },
              ].map((c) => (
                <div key={c.label} className="newsletter__stat-card">
                  <span className="newsletter__stat-emoji">{c.emoji}</span>
                  <div>
                    <p className="newsletter__stat-label">{c.label}</p>
                    <p className="newsletter__stat-price">{c.price}</p>
                  </div>
                  <span className="newsletter__stat-discount">{c.discount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
