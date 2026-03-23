import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiMapPin, FiUsers, FiHome } from 'react-icons/fi';
import { MdOutlineBed, MdOutlineBathtub } from 'react-icons/md';
import './PropertyCard.css';

export default function PropertyCard({ property, variant = 'default' }) {
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!property) return null;

  const isRental = property.type === 'rent';
  const priceLabel = isRental
    ? `₹${property.price.toLocaleString()}/night`
    : `₹${(property.price / 100000).toFixed(1)}L`;

  return (
    <div className={`property-card property-card--${variant}`}>
      {/* Image Wrapper */}
      <div className="property-card__image-wrap">
        <Link to={`/property/${property.id}`}>
          {!imgLoaded && <div className="property-card__skeleton" />}
          <img
            src={property.image}
            alt={property.title}
            className={`property-card__image ${imgLoaded ? 'property-card__image--loaded' : ''}`}
            onLoad={() => setImgLoaded(true)}
            loading="lazy"
          />
          <div className="property-card__image-overlay" />
        </Link>

        {/* Tag */}
        {property.tag && (
          <span className="property-card__tag">{property.tag}</span>
        )}

        {/* Type Badge */}
        <span className={`property-card__type ${isRental ? 'property-card__type--rent' : 'property-card__type--buy'}`}>
          {isRental ? '🏕️ Rent' : '🏠 Buy'}
        </span>

        {/* Wishlist */}
        <button
          type="button"
          className={`property-card__wish ${liked ? 'property-card__wish--active' : ''}`}
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          aria-label="Add to wishlist"
        >
          <FiHeart />
        </button>
      </div>

      {/* Content */}
      <div className="property-card__body">
        {/* Rating */}
        <div className="property-card__meta">
          <div className="property-card__rating">
            <FiStar className="property-card__star" />
            <span>{property.rating}</span>
            <span className="property-card__reviews">({property.reviews})</span>
          </div>

        </div>

        {/* Title */}
        <Link to={`/property/${property.id}`}>
          <h3 className="property-card__title">{property.title}</h3>
        </Link>

        {/* Location */}
        <div className="property-card__location">
          <FiMapPin className="property-card__location-icon" />
          <span>{property.location}</span>
        </div>

        {/* Stats */}
        <div className="property-card__stats">
          <div className="property-card__stat">
            <FiUsers size={13} />
            <span>{property.guests} guests</span>
          </div>
          <div className="property-card__stat">
            <MdOutlineBed size={14} />
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="property-card__stat">
            <MdOutlineBathtub size={13} />
            <span>{property.bathrooms} baths</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="property-card__amenities">
          {property.amenities.slice(0, 3).map((a) => (
            <span key={a} className="property-card__amenity">{a}</span>
          ))}
          {property.amenities.length > 3 && (
            <span className="property-card__amenity property-card__amenity--more">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="property-card__footer">
          <div className="property-card__price-wrap">
            <span className="property-card__price">{priceLabel}</span>
            {isRental && <span className="property-card__price-label">per night</span>}
          </div>
          <Link
            to={`/property/${property.id}`}
            className="property-card__btn"
          >
            {isRental ? 'Book Now' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
}
