import { useState } from 'react';
import { FiSearch, FiSliders, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { properties } from '../../data/properties';
import './Buy.css';

const CATEGORIES = ['All', 'Suite', 'Haveli', 'Penthouse', 'Manor', 'Riad'];
const EMI_RATES = { 8: 8.5, 10: 8.75, 15: 9.0, 20: 9.25, 25: 9.5, 30: 9.75 };

function EMICalc() {
  const [amount, setAmount] = useState(5000000);
  const [tenure, setTenure] = useState(20);
  const [rate] = useState(8.5);
  const monthly = ((amount * (rate / 100 / 12) * Math.pow(1 + rate / 100 / 12, tenure * 12)) / (Math.pow(1 + rate / 100 / 12, tenure * 12) - 1)).toFixed(0);
  return (
    <div className="buy__emi">
      <h3 className="buy__emi-title">🏦 EMI Calculator</h3>
      <div className="buy__emi-row">
        <div className="buy__emi-field">
          <label>Property Value</label>
          <div className="buy__emi-value">₹{(amount / 100000).toFixed(0)}L</div>
          <input type="range" min={1000000} max={15000000} step={500000} value={amount} onChange={(e) => setAmount(+e.target.value)} className="buy__emi-range" />
        </div>
        <div className="buy__emi-field">
          <label>Loan Tenure</label>
          <div className="buy__emi-value">{tenure} Years</div>
          <input type="range" min={8} max={30} step={1} value={tenure} onChange={(e) => setTenure(+e.target.value)} className="buy__emi-range" />
        </div>
      </div>
      <div className="buy__emi-result">
        <div className="buy__emi-result-item">
          <span className="buy__emi-result-label">Est. Monthly EMI</span>
          <span className="buy__emi-result-value gradient-text">₹{Number(monthly).toLocaleString()}</span>
        </div>
        <div className="buy__emi-result-item">
          <span className="buy__emi-result-label">Interest Rate</span>
          <span className="buy__emi-result-value">{rate}% p.a.</span>
        </div>
        <div className="buy__emi-result-item">
          <span className="buy__emi-result-label">Total Payable</span>
          <span className="buy__emi-result-value">₹{(monthly * tenure * 12 / 100000).toFixed(0)}L</span>
        </div>
      </div>
      <p className="buy__emi-note">*Indicative rates. Actual may vary by bank.</p>
    </div>
  );
}

export default function Buy() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');

  const forSale = properties.filter((p) => p.type === 'buy');
  const filtered = forSale.filter((p) => {
    const q = query.toLowerCase();
    const matchQ = !q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
    const matchCat = cat === 'All' || p.category.toLowerCase() === cat.toLowerCase();
    return matchQ && matchCat;
  });

  return (
    <div className="buy page">
      {/* Hero */}
      <div className="buy__hero">
        <div className="buy__hero-bg" />
        <div className="container buy__hero-inner">
          <span className="section-tag">🏠 Buy Property</span>
          <h1 className="buy__hero-title">
            Own a Piece of <span className="gradient-text">Paradise</span>
          </h1>
          <p className="buy__hero-sub">
            Heritage havelis, clifftop villas, sea-view penthouses — invest in properties that double as extraordinary experiences.
          </p>
          <div className="buy__search-row">
            <div className="buy__search-wrap">
              <FiSearch />
              <input
                className="buy__search-input"
                placeholder="Search by city, type..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Investment Stats */}
        <div className="buy__investment-strip">
          {[
            { icon: '📈', label: 'Avg. Appreciation', value: '14.2% YoY' },
            { icon: '🏘️', label: 'Properties Listed', value: '2,400+' },
            { icon: '💰', label: 'Avg. Rental Yield', value: '6.8% p.a.' },
            { icon: '🤝', label: 'Trusted Buyers', value: '18,000+' },
          ].map((s) => (
            <div key={s.label} className="buy__stat">
              <span className="buy__stat-icon">{s.icon}</span>
              <div>
                <p className="buy__stat-value">{s.value}</p>
                <p className="buy__stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="buy__cats">
          {CATEGORIES.map((c) => (
            <button key={c} className={`featured__filter ${cat === c ? 'featured__filter--active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="rent__grid">
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>

        {/* EMI Calculator */}
        <EMICalc />

        {/* Benefits */}
        <div className="buy__benefits">
          <div className="buy__benefits-header">
            <span className="section-tag">⭐ Investment Benefits</span>
            <h2 className="section-title">Why <span className="gradient-text">Invest</span> with LyfeStays?</h2>
          </div>
          <div className="buy__benefits-grid">
            {[
              { icon: '📋', title: 'Legal Clarity', desc: 'All properties are RERA-registered with clear title deeds. Our legal team reviews every document before listing.' },
              { icon: '🏆', title: 'Premium Curation', desc: 'Only top-tier properties make it to LyfeStays. Our acquisition team personally inspects every listing.' },
              { icon: '💼', title: 'Property Management', desc: 'Don\'t want the hassle? Let us manage your property, find tenants, and transfer monthly income to your account.' },
              { icon: '🌐', title: 'Pan-India Presence', desc: 'From the Himalayas to backwaters — we cover 250+ destinations, giving you unmatched selection.' },
            ].map((b) => (
              <div key={b.title} className="buy__benefit-card">
                <span className="buy__benefit-icon">{b.icon}</span>
                <h4>{b.title}</h4>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
