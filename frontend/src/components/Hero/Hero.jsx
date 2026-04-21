import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiMinus,
  FiPlus,
} from 'react-icons/fi';
import { MdOutlineTravelExplore, MdOutlineBed, MdOutlineChildCare } from 'react-icons/md';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Hero.css';

const stats = [
  { value: '15,000+', label: 'Verified Stays' },
  { value: '98%', label: 'Happy Travellers' },
  { value: '250+', label: 'Destinations' },
  { value: 'Rs 0', label: 'Booking Fees' },
];

export default function Hero() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [activeTab, setActiveTab] = useState('rent');
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [children, setChildren] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();

    if (destination) params.set('q', destination);
    if (selectionRange.startDate) {
      params.set('checkin', format(selectionRange.startDate, 'yyyy-MM-dd'));
    }
    if (selectionRange.endDate) {
      params.set('checkout', format(selectionRange.endDate, 'yyyy-MM-dd'));
    }
    params.set('guests', String(guests));
    params.set('rooms', String(rooms));
    params.set('children', String(children));

    navigate(`/${activeTab}?${params.toString()}`);
  };

  const openCalendar = (step) => {
    setFocusedRange([0, step]);
    setCalendarOpen(true);
  };

  const handleDateChange = (ranges) => {
    const nextRange = ranges.selection;
    setSelectionRange(nextRange);

    if (focusedRange[1] === 0) {
      setFocusedRange([0, 1]);
      return;
    }

    setCalendarOpen(false);
  };

  const formatFieldDate = (value) => {
    if (!value) {
      return 'Add date';
    }

    return format(value, 'dd MMM');
  };

  const formatRangeLabel = () => {
    if (!selectionRange.startDate && !selectionRange.endDate) {
      return 'Add your stay dates';
    }

    if (selectionRange.startDate && !selectionRange.endDate) {
      return `${format(selectionRange.startDate, 'dd MMM')} - Add checkout`;
    }

    return `${format(selectionRange.startDate, 'dd MMM')} - ${format(selectionRange.endDate, 'dd MMM')}`;
  };

  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__content container">
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

        <div className="hero__search-box" ref={calendarRef}>
          <div className="hero__tabs">
            {[
              { key: 'rent', label: 'Rent a Stay' },
              { key: 'buy', label: 'Buy Property' },
            ].map(({ key, label }) => (
              <button
                type="button"
                key={key}
                className={`hero__tab ${activeTab === key ? 'hero__tab--active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <form className="hero__form" onSubmit={handleSearch}>
            <div className="hero__field hero__field--wide">
              <FiMapPin className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Where to?</span>
                <input
                  type="text"
                  className="hero__input"
                  placeholder="Manali, Goa, Rishikesh..."
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                />
              </div>
            </div>
            <div className="hero__divider-v" />

            <button
              type="button"
              className={`hero__field hero__field-button ${calendarOpen && focusedRange[1] === 0 ? 'hero__field-button--active' : ''}`}
              onClick={() => openCalendar(0)}
            >
              <FiCalendar className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Check-in</span>
                <span className="hero__date-display">{formatFieldDate(selectionRange.startDate)}</span>
              </div>
            </button>

            <div className="hero__divider-v" />

            <button
              type="button"
              className={`hero__field hero__field-button ${calendarOpen && focusedRange[1] === 1 ? 'hero__field-button--active' : ''}`}
              onClick={() => openCalendar(1)}
            >
              <FiCalendar className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Check-out</span>
                <span className="hero__date-display">{formatFieldDate(selectionRange.endDate)}</span>
              </div>
            </button>

            <div className="hero__divider-v" />

            <div className="hero__field">
              <FiUsers className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Guests</span>
                <div className="hero__counter">
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setGuests((current) => Math.max(1, current - 1))}
                    aria-label="Decrease guests"
                  >
                    <FiMinus />
                  </button>
                  <span className="hero__counter-value">{guests}</span>
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setGuests((current) => Math.min(12, current + 1))}
                    aria-label="Increase guests"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="hero__divider-v" />

            <div className="hero__field">
              <MdOutlineBed className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Rooms</span>
                <div className="hero__counter">
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setRooms((current) => Math.max(1, current - 1))}
                    aria-label="Decrease rooms"
                  >
                    <FiMinus />
                  </button>
                  <span className="hero__counter-value">{rooms}</span>
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setRooms((current) => Math.min(10, current + 1))}
                    aria-label="Increase rooms"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="hero__divider-v" />

            <div className="hero__field">
              <MdOutlineChildCare className="hero__field-icon" />
              <div className="hero__field-body">
                <span className="hero__field-label">Children <span className="hero__field-sublabel">(12–18 yrs)</span></span>
                <div className="hero__counter">
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setChildren((current) => Math.max(0, current - 1))}
                    aria-label="Decrease children"
                  >
                    <FiMinus />
                  </button>
                  <span className="hero__counter-value">{children}</span>
                  <button
                    type="button"
                    className="hero__counter-btn"
                    onClick={() => setChildren((current) => Math.min(8, current + 1))}
                    aria-label="Increase children"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" className="hero__search-btn">
              <FiSearch />
              <span>Search</span>
            </button>
          </form>

          {calendarOpen && (
            <div className="hero__calendar-popup">
              <div className="hero__calendar-header">
                <div>
                  <p className="hero__calendar-title">Choose your stay dates</p>
                  <p className="hero__calendar-subtitle">{formatRangeLabel()}</p>
                </div>
                <button
                  type="button"
                  className="hero__calendar-close"
                  onClick={() => setCalendarOpen(false)}
                >
                  Done
                </button>
              </div>

              <DateRange
                ranges={[selectionRange]}
                onChange={handleDateChange}
                focusedRange={focusedRange}
                onRangeFocusChange={setFocusedRange}
                moveRangeOnFirstSelection={false}
                editableDateInputs={false}
                months={2}
                direction="horizontal"
                minDate={new Date()}
                rangeColors={['#e8612d']}
                showDateDisplay={false}
                showMonthAndYearPickers={false}
              />
            </div>
          )}

          <div className="hero__popular">
            <span className="hero__popular-label">Popular:</span>
            {['Goa Beaches', 'Manali', 'Rishikesh', 'Ladakh', 'Kerala'].map((item) => (
              <button
                type="button"
                key={item}
                className="hero__popular-tag"
                onClick={() => {
                  setDestination(item);
                  navigate(`/${activeTab}?q=${item}`);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="hero__stats">
          {stats.map((item) => (
            <div key={item.label} className="hero__stat">
              <span className="hero__stat-value">{item.value}</span>
              <span className="hero__stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-dot" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
