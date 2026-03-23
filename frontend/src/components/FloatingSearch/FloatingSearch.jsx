import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import {
  FiSearch,
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiUsers,
  FiMinus,
  FiPlus,
} from 'react-icons/fi';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './FloatingSearch.css';

export default function FloatingSearch() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [destination, setDestination] = useState('');
  const [guests, setGuests] = useState(2);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [selectionRange, setSelectionRange] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

    navigate(`/rent?${params.toString()}`);
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
    <div className={`floating-search ${visible ? 'floating-search--visible' : ''}`}>
      <div className="floating-search__shell" ref={calendarRef}>
        <form className="floating-search__bar" onSubmit={handleSearch}>
          <div className="floating-search__field">
            <FiMapPin className="floating-search__field-icon" />
            <div className="floating-search__field-body">
              <span className="floating-search__field-label">Where to?</span>
              <input
                type="text"
                className="floating-search__input"
                placeholder="Search destination, stay, or trip"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
          </div>

          <div className="floating-search__divider" />

          <button
            type="button"
            className={`floating-search__field floating-search__field--date floating-search__field-button ${calendarOpen && focusedRange[1] === 0 ? 'floating-search__field-button--active' : ''}`}
            onClick={() => openCalendar(0)}
          >
            <FiCalendar className="floating-search__field-icon" />
            <div className="floating-search__field-body">
              <span className="floating-search__field-label">Check-in</span>
              <span className="floating-search__date-display">{formatFieldDate(selectionRange.startDate)}</span>
            </div>
          </button>

          <FiArrowRight className="floating-search__arrow" />

          <button
            type="button"
            className={`floating-search__field floating-search__field--date floating-search__field-button ${calendarOpen && focusedRange[1] === 1 ? 'floating-search__field-button--active' : ''}`}
            onClick={() => openCalendar(1)}
          >
            <FiCalendar className="floating-search__field-icon" />
            <div className="floating-search__field-body">
              <span className="floating-search__field-label">Check-out</span>
              <span className="floating-search__date-display">{formatFieldDate(selectionRange.endDate)}</span>
            </div>
          </button>

          <div className="floating-search__divider" />

          <div className="floating-search__field floating-search__field--guests">
            <FiUsers className="floating-search__field-icon" />
            <div className="floating-search__field-body">
              <span className="floating-search__field-label">Guests</span>
              <div className="floating-search__counter">
                <button
                  type="button"
                  className="floating-search__counter-btn"
                  onClick={() => setGuests((current) => Math.max(1, current - 1))}
                  aria-label="Decrease guests"
                >
                  <FiMinus />
                </button>
                <span className="floating-search__counter-value">{guests}</span>
                <button
                  type="button"
                  className="floating-search__counter-btn"
                  onClick={() => setGuests((current) => Math.min(12, current + 1))}
                  aria-label="Increase guests"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>

          <button type="submit" className="floating-search__btn">
            <FiSearch />
            <span>Search</span>
          </button>
        </form>

        {calendarOpen && (
          <div className="floating-search__calendar-popup">
            <div className="floating-search__calendar-header">
              <div>
                <p className="floating-search__calendar-title">Choose your stay dates</p>
                <p className="floating-search__calendar-subtitle">{formatRangeLabel()}</p>
              </div>
              <button
                type="button"
                className="floating-search__calendar-close"
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
      </div>

      <div className="floating-search__tagline">
        <span>Book directly for better prices, flexible check-in windows, and members-only stay deals.</span>
      </div>
    </div>
  );
}
