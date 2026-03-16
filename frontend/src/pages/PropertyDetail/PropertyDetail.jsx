import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {
  FiStar, FiMapPin, FiUsers, FiShare2, FiHeart, FiCalendar,
  FiCheck, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import { MdOutlineBed, MdOutlineBathtub, MdVerified } from 'react-icons/md';
import { properties } from '../../data/properties';
import './PropertyDetail.css';

const ICON_MAP = {
  'Mountain View': '⛰️', 'Private Pool': '🏊', 'Bonfire Area': '🔥', 'WiFi': '📶',
  'Heater': '♨️', 'Parking': '🅿️', 'Beach Access': '🏖️', 'Pool': '🏊',
  'Bar': '🍸', 'AC': '❄️', 'Caretaker': '👤', 'Ganga View': '🌊',
  'Yoga Deck': '🧘', 'Organic Breakfast': '🥗', 'Campfire': '🔥', 'Kayaking': '🚣',
  'Lake View': '🏞️', 'Heritage Design': '🏰', 'Private Butler': '🤵', 'Spa': '💆',
  'Coffee Plantation': '☕', 'Fireplace': '🔥', 'BBQ': '🍖', 'Home Chef': '👨‍🍳',
  'Sand Dune View': '🏜️', 'Rooftop': '🏙️', 'Camel Safari': '🐪', 'Star Gazing': '⭐',
  'Sea View': '🌊', 'Private Terrace': '🏗️', 'Jacuzzi': '🛁', 'Smart Home': '🏠',
  'Backwater Cruise': '⛵', 'Chef On Board': '🍳', 'Private Beach': '🏖️', 'Scuba Diving': '🤿',
};

function RazorpayButton({ property }) {
  const isRent = property.type === 'rent';

  const handlePay = () => {
    const options = {
      key: 'rzp_test_XXXXXXXXXX', // Replace with real key
      amount: (isRent ? property.price : 50000) * 100, // paise
      currency: 'INR',
      name: 'LyfeStays',
      description: `Booking: ${property.title}`,
      theme: { color: '#E91E8C' },
      handler: (response) => {
        alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
    };
    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Razorpay SDK not loaded. Add your Razorpay key to enable live payments.');
    }
  };

  return (
    <button className="detail__pay-btn" onClick={handlePay}>
      <span>⚡</span> {isRent ? 'Confirm & Pay ₹' + property.price.toLocaleString() : 'Express Interest'}
    </button>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === Number(id));
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  if (!property) {
    return (
      <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, minHeight: '80vh' }}>
        <span style={{ fontSize: '4rem' }}>🔍</span>
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>Property not found</h2>
        <Link to="/rent" className="btn-primary">Browse All Stays</Link>
      </div>
    );
  }

  const isRent = property.type === 'rent';
  const nights = checkin && checkout ? Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000)) : 3;
  const subtotal = property.price * nights;
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;
  const similar = properties.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 3);

  return (
    <div className="detail page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail__breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/${property.type}`}>{isRent ? 'Rent' : 'Buy'}</Link>
          <span>›</span>
          <span>{property.title}</span>
        </nav>

        {/* Title Row */}
        <div className="detail__title-row">
          <div>
            <div className="detail__badges">
              {property.tag && <span className="badge badge-pink">{property.tag}</span>}
              <span className={`badge ${isRent ? 'badge-teal' : 'badge-gold'}`}>{isRent ? '🏕️ Rent' : '🏠 Buy'}</span>
            </div>
            <h1 className="detail__title">{property.title}</h1>
            <div className="detail__meta">
              <div className="detail__rating">
                <FiStar className="detail__star" />{property.rating}
                <span className="detail__reviews">({property.reviews} reviews)</span>
              </div>
              <span className="detail__sep">·</span>
              <div className="detail__location"><FiMapPin /> {property.location}</div>
              <span className="detail__sep">·</span>
              <div className="detail__host-meta"><MdVerified style={{ color: 'var(--secondary)' }} /> Verified Host</div>
            </div>
          </div>
          <div className="detail__actions">
            <button className="detail__action-btn" onClick={() => navigator.share?.({ url: window.location.href }) || alert('Link copied!')}>
              <FiShare2 /> Share
            </button>
            <button className={`detail__action-btn ${liked ? 'detail__action-btn--liked' : ''}`} onClick={() => setLiked(!liked)}>
              <FiHeart /> {liked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="detail__gallery">
          <div className="detail__gallery-main">
            <img src={property.images[imgIdx]} alt={property.title} className="detail__main-img" />
            <button className="detail__gallery-nav detail__gallery-nav--prev" onClick={() => setImgIdx(i => (i === 0 ? property.images.length - 1 : i - 1))}>
              <FiChevronLeft />
            </button>
            <button className="detail__gallery-nav detail__gallery-nav--next" onClick={() => setImgIdx(i => (i === property.images.length - 1 ? 0 : i + 1))}>
              <FiChevronRight />
            </button>
            <div className="detail__gallery-counter">{imgIdx + 1} / {property.images.length}</div>
          </div>
          <div className="detail__gallery-thumbs">
            {property.images.map((img, i) => (
              <button key={i} className={`detail__thumb ${i === imgIdx ? 'detail__thumb--active' : ''}`} onClick={() => setImgIdx(i)}>
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="detail__grid">
          {/* Left Column */}
          <div className="detail__left">
            {/* Quick Stats */}
            <div className="detail__quick-stats">
              <div className="detail__quick-stat">
                <FiUsers /><span>{property.guests} guests</span>
              </div>
              <div className="detail__quick-stat">
                <MdOutlineBed /><span>{property.bedrooms} bedrooms</span>
              </div>
              <div className="detail__quick-stat">
                <MdOutlineBathtub /><span>{property.bathrooms} bathrooms</span>
              </div>
            </div>

            {/* Host */}
            <div className="detail__host">
              <img src={property.hostImage} alt={property.host} className="detail__host-img" />
              <div>
                <p className="detail__host-name">Hosted by {property.host}</p>
                <p className="detail__host-since">Superhost · Member since 2022 · 100% response rate</p>
              </div>
              <button className="detail__host-contact">Contact Host</button>
            </div>

            {/* Description */}
            <div className="detail__section">
              <h2 className="detail__section-title">About This Property</h2>
              <p className="detail__description">{property.description}</p>
              <p className="detail__description" style={{ marginTop: 14 }}>
                This {property.category} in {property.location} is the perfect destination for travellers seeking an authentic and luxurious experience. Whether you're planning a romantic getaway, a family vacation, or a solo spiritual journey — every detail here has been curated to leave you breathless.
              </p>
            </div>

            {/* Amenities */}
            <div className="detail__section">
              <h2 className="detail__section-title">What's Included</h2>
              <div className="detail__amenities">
                {property.amenities.map((a) => (
                  <div key={a} className="detail__amenity">
                    <span className="detail__amenity-icon">{ICON_MAP[a] || '✅'}</span>
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="detail__section">
              <h2 className="detail__section-title">Property Rules</h2>
              <div className="detail__rules">
                {['Check-in after 2:00 PM', 'Check-out before 11:00 AM', 'No smoking indoors', 'Pets allowed', 'Events allowed with prior approval'].map((r) => (
                  <div key={r} className="detail__rule">
                    <FiCheck className="detail__rule-check" /> {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="detail__section">
              <h2 className="detail__section-title">Location</h2>
              <div className="detail__map-placeholder">
                <span>📍</span>
                <div>
                  <p className="detail__map-title">{property.location}</p>
                  <p className="detail__map-sub">Exact address provided after booking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Booking Widget */}
          <div className="detail__right">
            <div className="detail__booking-card">
              <div className="detail__price-row">
                <div>
                  <span className="detail__price">
                    {isRent ? `₹${property.price.toLocaleString()}` : `₹${(property.price / 100000).toFixed(1)}L`}
                  </span>
                  {isRent && <span className="detail__price-unit"> / night</span>}
                </div>
                <div className="detail__card-rating">
                  <FiStar /> {property.rating} · {property.reviews} reviews
                </div>
              </div>

              {isRent ? (
                <>
                  <div className="detail__date-grid">
                    <div className="detail__date-field">
                      <label><FiCalendar /> Check-in</label>
                      <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
                    </div>
                    <div className="detail__date-field">
                      <label><FiCalendar /> Check-out</label>
                      <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
                    </div>
                  </div>

                  <div className="detail__guests-field">
                    <label><FiUsers /> Guests</label>
                    <select value={guests} onChange={(e) => setGuests(+e.target.value)}>
                      {[...Array(property.guests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <RazorpayButton property={property} />

                  <div className="detail__price-breakdown">
                    <div className="detail__breakdown-row">
                      <span>₹{property.price.toLocaleString()} × {nights} nights</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="detail__breakdown-row">
                      <span>Service fee (5%)</span>
                      <span>₹{platformFee.toLocaleString()}</span>
                    </div>
                    <div className="detail__breakdown-total">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="detail__buy-info">Interested in purchasing this property? Our real estate advisor will guide you through the entire process.</p>
                  <RazorpayButton property={property} />
                  <button className="detail__schedule-btn">
                    📅 Schedule a Visit
                  </button>
                </>
              )}

              <p className="detail__booking-note">
                🔒 You won't be charged yet · Free cancellation within 24 hrs
              </p>
            </div>

            {/* Trust Box */}
            <div className="detail__trust">
              {['Identity verified host', 'Secure Razorpay payments', '24/7 LyfeStays support', 'Instant booking confirmation'].map((t) => (
                <div key={t} className="detail__trust-item">
                  <FiCheck className="detail__trust-icon" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="detail__similar">
          <h2 className="detail__section-title">You May Also Like</h2>
          <div className="rent__grid" style={{ marginTop: 24 }}>
            {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
