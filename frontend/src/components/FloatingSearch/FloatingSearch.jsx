import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import './FloatingSearch.css';

export default function FloatingSearch() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/rent?q=${destination}`);
  };

  // Format date nicely: "12 Mar"
  const formatDate = (val) => {
    if (!val) return null;
    const d = new Date(val);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <div className={`floating-search ${visible ? 'floating-search--visible' : ''}`}>
      <form className="floating-search__bar" onSubmit={handleSearch}>
        {/* Where to */}
        <div className="floating-search__field">
          <FiMapPin className="floating-search__field-icon" />
          <div className="floating-search__field-body">
            <span className="floating-search__field-label">Where to?</span>
            <input
              type="text"
              className="floating-search__input"
              placeholder="Search Destination, Stay, or Trip"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
        </div>

        <div className="floating-search__divider" />

        {/* Check-in */}
        <div className="floating-search__field floating-search__field--date">
          <FiCalendar className="floating-search__field-icon" />
          <div className="floating-search__field-body">
            <span className="floating-search__field-label">Check-in</span>
            <input
              type="date"
              className="floating-search__input floating-search__date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
            <span className="floating-search__date-display">
              {formatDate(checkin) || 'Add date'}
            </span>
          </div>
        </div>

        <FiArrowRight className="floating-search__arrow" />

        {/* Check-out */}
        <div className="floating-search__field floating-search__field--date">
          <div className="floating-search__field-body">
            <span className="floating-search__field-label">Check-out</span>
            <input
              type="date"
              className="floating-search__input floating-search__date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
            <span className="floating-search__date-display">
              {formatDate(checkout) || 'Add date'}
            </span>
          </div>
        </div>

        <button type="submit" className="floating-search__btn">
          <FiSearch />
          <span>Search</span>
        </button>
      </form>

      {/* Tagline strip */}
      <div className="floating-search__tagline">
        <span>☀️</span>
        <span>Book directly and get best prices + enjoy early check-in, late check-out &amp; exclusive deals*</span>
      </div>
    </div>
  );
}
