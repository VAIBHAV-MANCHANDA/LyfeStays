import { FiSearch, FiCheckCircle, FiHome, FiArrowRight } from 'react-icons/fi';
import { MdStar, MdVerified } from 'react-icons/md';
import './HowItWorks.css';

const steps = [
  {
    step: '01',
    icon: <FiSearch size={28} />,
    title: 'Discover & Search',
    desc: 'Browse thousands of handpicked stays across India. Filter by destination, dates, budget, and property type to find your perfect match.',
    color: 'pink',
  },
  {
    step: '02',
    icon: <MdVerified size={28} />,
    title: 'Book Securely',
    desc: 'All hosts are verified by our team. Book your stay with one click and pay securely via Razorpay. Instant confirmation guaranteed.',
    color: 'teal',
  },
  {
    step: '03',
    icon: <FiHome size={28} />,
    title: 'Check In & Enjoy',
    desc: 'Arrive, check in, and live your best life. Our 24/7 concierge support ensures everything is perfect from arrival to checkout.',
    color: 'gold',
  },
];

const perks = [
  { icon: '🏆', label: 'Best Price Guarantee' },
  { icon: '🔒', label: 'Secure Payments' },
  { icon: '✅', label: 'Verified Hosts' },
  { icon: '📞', label: '24/7 Support' },
  { icon: '🚀', label: 'Instant Booking' },
  { icon: '💯', label: 'No Hidden Fees' },
];

export default function HowItWorks() {
  return (
    <section className="hiw section">
      <div className="hiw__bg-accent" />
      <div className="container">
        <div className="section-header">
          <span className="section-tag">⚡ Simple & Fast</span>
          <h2 className="section-title">
            How <span className="gradient-text">LyfeStays</span> Works
          </h2>
          <p className="section-subtitle">
            From search to stay — it's as simple as 3 steps. No complicated forms, no surprise charges.
          </p>
        </div>

        <div className="hiw__steps">
          {steps.map((s, i) => (
            <div key={s.step} className="hiw__step">
              <div className={`hiw__icon-wrap hiw__icon-wrap--${s.color}`}>
                {s.icon}
              </div>
              <div className="hiw__step-num">{s.step}</div>
              <h3 className="hiw__step-title">{s.title}</h3>
              <p className="hiw__step-desc">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hiw__arrow"><FiArrowRight /></div>
              )}
            </div>
          ))}
        </div>

        {/* Perks Row */}
        <div className="hiw__perks">
          {perks.map((p) => (
            <div key={p.label} className="hiw__perk">
              <span className="hiw__perk-icon">{p.icon}</span>
              <span className="hiw__perk-label">{p.label}</span>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="hiw__trust">
          <div className="hiw__trust-content">
            <MdStar size={20} style={{ color: 'var(--gold)' }} />
            <p><strong>Rated 4.9/5</strong> by over 50,000 travellers across India</p>
          </div>
          <div className="hiw__trust-logos">
            <span className="hiw__trust-badge">Featured in Times of India</span>
            <span className="hiw__trust-badge">YourStory Startup of Year</span>
            <span className="hiw__trust-badge">Best Travel App 2024</span>
          </div>
        </div>
      </div>
    </section>
  );
}
