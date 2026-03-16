import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { destinations } from '../../data/properties';
import './Destinations.css';

const FILTERS = [
  { key: 'all', label: 'All', icon: '✨' },
  { key: 'mountain', label: 'Mountain', icon: '🏔️' },
  { key: 'beach', label: 'Beach', icon: '🏖️' },
  { key: 'spiritual', label: 'Spiritual', icon: '🛕' },
  { key: 'royal', label: 'Royal', icon: '👑' },
  { key: 'adventure', label: 'Adventure', icon: '🧗' },
  { key: 'nature', label: 'Nature', icon: '🌿' },
  { key: 'heritage', label: 'Heritage', icon: '🏛️' },
];

// Map destinations to filter categories
const DEST_CATEGORIES = {
  'Goa': 'beach',
  'Manali': 'mountain',
  'Rishikesh': 'spiritual',
  'Udaipur': 'royal',
  'Darjeeling': 'nature',
  'Ladakh': 'adventure',
  'Kerala': 'nature',
  'Jaipur': 'heritage',
};

// Subtitle/state info
const DEST_STATE = {
  'Goa': 'Goa',
  'Manali': 'Himachal Pradesh',
  'Rishikesh': 'Uttarakhand',
  'Udaipur': 'Rajasthan',
  'Darjeeling': 'West Bengal',
  'Ladakh': 'Jammu & Kashmir',
  'Kerala': 'Kerala',
  'Jaipur': 'Rajasthan',
};

export default function Destinations() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = destinations.filter((d) =>
    activeFilter === 'all' || DEST_CATEGORIES[d.name] === activeFilter
  );

  return (
    <section className="destinations section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">🗺️ Trending Now</span>
          <h2 className="section-title">
            Explore <span className="gradient-text">Top Destinations</span>
          </h2>
          <p className="section-subtitle">
            From the snow-capped Himalayas to the sun-kissed shores — India's finest addresses, all in one place.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="destinations__filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`destinations__filter ${activeFilter === f.key ? 'destinations__filter--active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <span>{f.icon}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Oval Cards Grid */}
        <div className="destinations__grid">
          {filtered.map((d) => (
            <Link key={d.id} to={`/rent?q=${d.name}`} className="dest-card">
              <div className="dest-card__oval">
                <img src={d.image} alt={d.name} className="dest-card__img" />
                <div className="dest-card__overlay" />
              </div>
              <div className="dest-card__info">
                <h3 className="dest-card__name">{d.name}</h3>
                <span className="dest-card__state">{DEST_STATE[d.name]}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="destinations__cta">
          <Link to="/rent" className="btn-primary">
            View All Destinations <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
