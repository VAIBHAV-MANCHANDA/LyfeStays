import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import {
  FiStar,
  FiMapPin,
  FiUsers,
  FiShare2,
  FiHeart,
  FiCalendar,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiMinus,
  FiPlus,
  FiMoon,
  FiShield,
} from 'react-icons/fi';
import { MdOutlineBed, MdOutlineBathtub, MdVerified } from 'react-icons/md';
import { properties } from '../../data/properties';
import './PropertyDetail.css';

function RazorpayButton({ property }) {
  const isRent = property.type === 'rent';

  const handlePay = () => {
    const options = {
      key: 'rzp_test_XXXXXXXXXX',
      amount: (isRent ? property.price : 50000) * 100,
      currency: 'INR',
      name: 'LyfeStays',
      description: `Booking: ${property.title}`,
      theme: { color: '#E91E8C' },
      handler: (response) => {
        alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
      },
    };

    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      alert('Razorpay SDK not loaded. Add your Razorpay key to enable payments.');
    }
  };

  return (
    <button type="button" className="detail__pay-btn" onClick={handlePay}>
      {isRent ? `Confirm and Pay Rs ${property.price.toLocaleString()}` : 'Express Interest'}
    </button>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((item) => item.id === Number(id));
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);

  if (!property) {
    return (
      <div
        className="page"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 20,
          minHeight: '80vh',
        }}
      >
        <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          Property not found
        </h2>
        <Link to="/rent" className="btn-primary">Browse All Stays</Link>
      </div>
    );
  }

  const isRent = property.type === 'rent';
  const nights =
    checkin && checkout
      ? Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000))
      : 3;
  const subtotal = property.price * nights;
  const platformFee = Math.round(subtotal * 0.05);
  const total = subtotal + platformFee;
  const similar = properties
    .filter((item) => item.id !== property.id && item.type === property.type)
    .slice(0, 3);

  const handleGuestChange = (nextValue) => {
    setGuests(Math.max(1, Math.min(property.guests, nextValue)));
  };

  return (
    <div className="detail page">
      <div className="container">
        <nav className="detail__breadcrumb">
          <Link to="/">Home</Link>
          <span>{'>'}</span>
          <Link to={`/${property.type}`}>{isRent ? 'Rent' : 'Buy'}</Link>
          <span>{'>'}</span>
          <span>{property.title}</span>
        </nav>

        <div className="detail__title-row">
          <div>
            <div className="detail__badges">
              {property.tag && <span className="badge badge-pink">{property.tag}</span>}
              <span className={`badge ${isRent ? 'badge-teal' : 'badge-gold'}`}>
                {isRent ? 'Rent' : 'Buy'}
              </span>
            </div>
            <h1 className="detail__title">{property.title}</h1>
            <div className="detail__meta">
              <div className="detail__rating">
                <FiStar className="detail__star" />{property.rating}
                <span className="detail__reviews">({property.reviews} reviews)</span>
              </div>
              <span className="detail__sep">.</span>
              <div className="detail__location"><FiMapPin /> {property.location}</div>
              <span className="detail__sep">.</span>
              <div className="detail__host-meta">
                <MdVerified style={{ color: 'var(--secondary)' }} /> Verified Host
              </div>
            </div>
          </div>
          <div className="detail__actions">
            <button
              type="button"
              className="detail__action-btn"
              onClick={() => navigator.share?.({ url: window.location.href }) || alert('Link copied')}
            >
              <FiShare2 /> Share
            </button>
            <button
              type="button"
              className={`detail__action-btn ${liked ? 'detail__action-btn--liked' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <FiHeart /> {liked ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <div className="detail__gallery">
          <div className="detail__gallery-main">
            <img src={property.images[imgIdx]} alt={property.title} className="detail__main-img" />
            <button
              type="button"
              className="detail__gallery-nav detail__gallery-nav--prev"
              onClick={() => setImgIdx((current) => (current === 0 ? property.images.length - 1 : current - 1))}
            >
              <FiChevronLeft />
            </button>
            <button
              type="button"
              className="detail__gallery-nav detail__gallery-nav--next"
              onClick={() => setImgIdx((current) => (current === property.images.length - 1 ? 0 : current + 1))}
            >
              <FiChevronRight />
            </button>
            <div className="detail__gallery-counter">{imgIdx + 1} / {property.images.length}</div>
          </div>
          <div className="detail__gallery-thumbs">
            {property.images.map((img, index) => (
              <button
                type="button"
                key={img}
                className={`detail__thumb ${index === imgIdx ? 'detail__thumb--active' : ''}`}
                onClick={() => setImgIdx(index)}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="detail__grid">
          <div className="detail__left">
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

            <div className="detail__host">
              <img src={property.hostImage} alt={property.host} className="detail__host-img" />
              <div>
                <p className="detail__host-name">Hosted by {property.host}</p>
                <p className="detail__host-since">Superhost · Member since 2022 · 100% response rate</p>
              </div>
              <button type="button" className="detail__host-contact">Contact Host</button>
            </div>

            <div className="detail__section">
              <h2 className="detail__section-title">About This Property</h2>
              <p className="detail__description">{property.description}</p>
              <p className="detail__description" style={{ marginTop: 14 }}>
                This {property.category} in {property.location} is the perfect destination for travellers seeking an authentic and luxurious experience. Whether you are planning a romantic getaway, a family vacation, or a solo spiritual journey, every detail here has been curated to leave you breathless.
              </p>
            </div>

            <div className="detail__section">
              <h2 className="detail__section-title">What's Included</h2>
              <div className="detail__amenities">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="detail__amenity">
                    <span className="detail__amenity-icon"><FiCheck /></span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail__section">
              <h2 className="detail__section-title">Property Rules</h2>
              <div className="detail__rules">
                {[
                  'Check-in after 2:00 PM',
                  'Check-out before 11:00 AM',
                  'No smoking indoors',
                  'Pets allowed',
                  'Events allowed with prior approval',
                ].map((rule) => (
                  <div key={rule} className="detail__rule">
                    <FiCheck className="detail__rule-check" /> {rule}
                  </div>
                ))}
              </div>
            </div>

            <div className="detail__section">
              <h2 className="detail__section-title">Location</h2>
              <div className="detail__map-placeholder">
                <FiMapPin />
                <div>
                  <p className="detail__map-title">{property.location}</p>
                  <p className="detail__map-sub">Exact address provided after booking</p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail__right">
            <div className="detail__booking-card">
              <div className="detail__price-row">
                <div>
                  <span className="detail__price">
                    {isRent ? `Rs ${property.price.toLocaleString()}` : `Rs ${(property.price / 100000).toFixed(1)}L`}
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
                      <input
                        type="date"
                        value={checkin}
                        onChange={(event) => setCheckin(event.target.value)}
                      />
                    </div>
                    <div className="detail__date-field">
                      <label><FiCalendar /> Check-out</label>
                      <input
                        type="date"
                        value={checkout}
                        min={checkin || undefined}
                        onChange={(event) => setCheckout(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="detail__booking-summary">
                    <div className="detail__summary-pill">
                      <FiMoon /> {nights} nights
                    </div>
                    <div className="detail__summary-pill">
                      <FiShield /> Free cancellation in 24 hrs
                    </div>
                  </div>

                  <div className="detail__guests-field">
                    <label><FiUsers /> Guests</label>
                    <div className="detail__guest-stepper">
                      <button
                        type="button"
                        className="detail__guest-btn"
                        onClick={() => handleGuestChange(guests - 1)}
                        aria-label="Decrease guests"
                      >
                        <FiMinus />
                      </button>
                      <div className="detail__guest-count">
                        <strong>{guests}</strong>
                        <span>{guests === 1 ? 'guest' : 'guests'}</span>
                      </div>
                      <button
                        type="button"
                        className="detail__guest-btn"
                        onClick={() => handleGuestChange(guests + 1)}
                        aria-label="Increase guests"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>

                  <RazorpayButton property={property} />

                  <div className="detail__price-breakdown">
                    <div className="detail__breakdown-row">
                      <span>Rs {property.price.toLocaleString()} x {nights} nights</span>
                      <span>Rs {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="detail__breakdown-row">
                      <span>Service fee (5%)</span>
                      <span>Rs {platformFee.toLocaleString()}</span>
                    </div>
                    <div className="detail__breakdown-total">
                      <span>Total</span>
                      <span>Rs {total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="detail__buy-info">
                    Interested in purchasing this property? Our real estate advisor will guide you through the entire process.
                  </p>
                  <RazorpayButton property={property} />
                  <button type="button" className="detail__schedule-btn">
                    <FiCalendar /> Schedule a Visit
                  </button>
                </>
              )}

              <p className="detail__booking-note">
                You will not be charged yet. Free cancellation within 24 hours.
              </p>
            </div>

            <div className="detail__trust">
              {[
                'Identity verified host',
                'Secure Razorpay payments',
                '24/7 LyfeStays support',
                'Instant booking confirmation',
              ].map((item) => (
                <div key={item} className="detail__trust-item">
                  <FiCheck className="detail__trust-icon" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail__similar">
          <h2 className="detail__section-title">You May Also Like</h2>
          <div className="rent__grid" style={{ marginTop: 24 }}>
            {similar.map((item) => <PropertyCard key={item.id} property={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
