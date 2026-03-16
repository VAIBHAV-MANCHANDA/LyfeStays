import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import PropertyCard from '../PropertyCard/PropertyCard';
import { properties } from '../../data/properties';
import './FeaturedStays.css';

const FILTERS = ['All', 'Rent', 'Buy', 'Beach', 'Mountain', 'Heritage'];

export default function FeaturedStays() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = properties.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Rent') return p.type === 'rent';
    if (activeFilter === 'Buy') return p.type === 'buy';
    if (activeFilter === 'Beach') return p.location.toLowerCase().includes('goa') || p.location.toLowerCase().includes('andaman') || p.location.toLowerCase().includes('candolim') || p.location.toLowerCase().includes('havelock');
    if (activeFilter === 'Mountain') return p.location.toLowerCase().includes('manali') || p.location.toLowerCase().includes('ladakh') || p.location.toLowerCase().includes('shimla') || p.location.toLowerCase().includes('darjeeling') || p.location.toLowerCase().includes('spiti');
    if (activeFilter === 'Heritage') return ['haveli', 'manor', 'heritage', 'riad'].includes(p.category);
    return true;
  });

  return (
    <section className="featured section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">✨ Handpicked Just For You</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Luxury Stays</span>
          </h2>
          <p className="section-subtitle">
            Every property is personally vetted by our travel experts — because you deserve nothing less than extraordinary.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="featured__filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`featured__filter ${activeFilter === f ? 'featured__filter--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="featured__grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {/* CTA */}
        <div className="featured__cta">
          <Link to="/rent" className="btn-secondary">
            View All Stays <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
