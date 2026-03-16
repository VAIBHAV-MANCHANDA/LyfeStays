import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiStar, FiSliders, FiMapPin } from 'react-icons/fi';
import { MdOutlineBed } from 'react-icons/md';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { properties } from '../../data/properties';
import './Rent.css';

const TYPES = ['All Types', 'Vila', 'Cottage', 'Bungalow', 'Houseboat', 'Treehouse', 'Camp', 'Heritage'];
const SORTS = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Most Reviews'];

export default function Rent() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [sort, setSort] = useState('Recommended');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const rentals = properties.filter((p) => p.type === 'rent');

  const filtered = rentals
    .filter((p) => {
      const q = query.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchType = typeFilter === 'All Types' || p.category.toLowerCase() === typeFilter.toLowerCase();
      const matchPrice = p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      return matchSearch && matchType && matchPrice && matchRating;
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      if (sort === 'Top Rated') return b.rating - a.rating;
      if (sort === 'Most Reviews') return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="rent page">
      {/* Page Hero */}
      <div className="rent__hero">
        <div className="rent__hero-bg" />
        <div className="container rent__hero-content">
          <span className="section-tag">🏕️ Rent a Stay</span>
          <h1 className="rent__hero-title">
            Find Your Perfect <span className="gradient-text">Getaway</span>
          </h1>
          <p className="rent__hero-sub">
            From misty mountain retreats to sun-kissed beach bungalows — your dream short stay is here.
          </p>

          {/* Search Bar */}
          <div className="rent__search-row">
            <div className="rent__search-wrap">
              <FiSearch className="rent__search-icon" />
              <input
                type="text"
                className="rent__search-input"
                placeholder="Search by destination, property name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              className={`rent__filter-toggle ${showFilters ? 'rent__filter-toggle--active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiSliders /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Filter Panel */}
        {showFilters && (
          <div className="rent__filter-panel">
            {/* Type */}
            <div className="rent__filter-group">
              <label className="rent__filter-label">Property Type</label>
              <div className="rent__filter-chips">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    className={`rent__chip ${typeFilter === t ? 'rent__chip--active' : ''}`}
                    onClick={() => setTypeFilter(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="rent__filter-group">
              <label className="rent__filter-label">Max Price: ₹{maxPrice.toLocaleString()}/night</label>
              <input
                type="range"
                min={1000} max={15000} step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="rent__slider"
              />
              <div className="rent__slider-labels"><span>₹1,000</span><span>₹15,000</span></div>
            </div>

            {/* Rating */}
            <div className="rent__filter-group">
              <label className="rent__filter-label">Minimum Rating</label>
              <div className="rent__filter-chips">
                {[0, 4, 4.5, 4.7, 4.9].map((r) => (
                  <button
                    key={r}
                    className={`rent__chip ${minRating === r ? 'rent__chip--active' : ''}`}
                    onClick={() => setMinRating(r)}
                  >
                    {r === 0 ? 'Any' : `⭐ ${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="rent__results-header">
          <div className="rent__results-info">
            <h2 className="rent__results-count">
              <span className="gradient-text">{filtered.length}</span> stays found
            </h2>
            <p className="rent__results-sub">
              <FiMapPin style={{ color: 'var(--primary)', verticalAlign: 'middle' }} />
              {query ? ` Results for "${query}"` : ' All destinations'}
            </p>
          </div>
          <div className="rent__sort-wrap">
            <label className="rent__sort-label">Sort by:</label>
            <select
              className="rent__sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="rent__grid">
            {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="rent__empty">
            <span className="rent__empty-icon">🔍</span>
            <h3>No stays found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn-primary" onClick={() => { setQuery(''); setTypeFilter('All Types'); setMinRating(0); setMaxPrice(15000); }}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Why Choose Section */}
        <div className="rent__why">
          <h2 className="rent__why-title">Why Rent with <span className="gradient-text">LyfeStays?</span></h2>
          <div className="rent__why-grid">
            {[
              { icon: '🔒', title: 'Verified Hosts', desc: 'Every host is KYC-verified with identity checks and property inspections by our team.' },
              { icon: '💳', title: 'Secure Payments', desc: 'Pay safely via Razorpay. Your money is held until 24hrs after successful check-in.' },
              { icon: '📞', title: '24/7 Support', desc: 'Our dedicated travel concierge is available around the clock for any issue.' },
              { icon: '🚀', title: 'Instant Booking', desc: 'No waiting. Book and get confirmation within seconds. Your dates are guaranteed.' },
              { icon: '🎁', title: 'Loyalty Rewards', desc: 'Earn LyfeCoins on every booking. Redeem for discounts on future stays.' },
              { icon: '🌟', title: 'Quality Promise', desc: "Not satisfied? We'll arrange alternative accommodation at no extra cost." },
            ].map((w) => (
              <div key={w.title} className="rent__why-card">
                <span className="rent__why-icon">{w.icon}</span>
                <h4 className="rent__why-card-title">{w.title}</h4>
                <p className="rent__why-card-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
