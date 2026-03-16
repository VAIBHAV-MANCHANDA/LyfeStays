import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi';
import { MdOutlineTravelExplore } from 'react-icons/md';
import './Hero.css';

const stats = [
  { value: '15,000+', label: 'Verified Stays' },
  { value: '98%', label: 'Happy Travellers' },
  { value: '250+', label: 'Destinations' },
  { value: '₹0', label: 'Booking Fees' },
];

export default function Hero() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rent');
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/${activeTab}?q=${destination}`);
  };

  return (
    <section className="hero">
      {/* Animated Background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__content container">
        {/* ── Centered Copy ── */}
        <div className="hero__eyebrow">
          <MdOutlineTravelExplore />
          <span>India's Most Loved Stay Platform</span>
        </div>

        <h1 className="hero__title">
          Live Your Life,<br />
          <span className="gradient-text">For Eternity</span>
        </h1>

        <p className="hero__subtitle">
          Discover handpicked luxury villas, heritage havelis, treehouse retreats &amp; soulful
          homestays across India's most breathtaking destinations.
        </p>

        {/* ── Search Box ── */}
        <div className="hero__search-box">
          <div className="hero__tabs">
            {[
              { key: 'rent', label: '🏕️ Rent a Stay' },
              { key: 'buy', label: '🏠 Buy Property' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`hero__tab ${activeTab === key ? 'hero__tab--active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <form className="hero__form" onSubmit={handleSearch}>
            {/* Where to */}
            <div className="hero__field hero__field--wide">
              <FiMapPin className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Where to?</span>
                <input
                  type="text"
                  className="hero__input"
                  placeholder="Manali, Goa, Rishikesh…"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </div>
            <div className="hero__divider-v" />
            {/* Check-in */}
            <div className="hero__field">
              <FiCalendar className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Check-in</span>
                <input
                  type="date"
                  className="hero__input hero__date-input"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
              </div>
            </div>
            <div className="hero__divider-v" />
            {/* Check-out */}
            <div className="hero__field">
              <FiCalendar className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Check-out</span>
                <input
                  type="date"
                  className="hero__input hero__date-input"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
              </div>
            </div>
            <div className="hero__divider-v" />
            {/* Guests */}
            <div className="hero__field">
              <FiUsers className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Guests</span>
                <select
                  className="hero__input hero__select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1,2,3,4,5,6,8,10,12].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Search button */}
            <button type="submit" className="hero__search-btn">
              <FiSearch />
              <span>Search</span>
            </button>
          </form>

          {/* Popular */}
          <div className="hero__popular">
            <span className="hero__popular-label">Popular:</span>
            {['Goa Beaches', 'Manali', 'Rishikesh', 'Ladakh', 'Kerala'].map((s) => (
              <button
                key={s}
                className="hero__popular-tag"
                onClick={() => { setDestination(s); navigate(`/${activeTab}?q=${s}`); }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="hero__stats">
          {stats.map((s) => (
            <div key={s.label} className="hero__stat">
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
