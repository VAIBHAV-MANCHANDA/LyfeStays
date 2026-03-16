import { useState } from 'react';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials } from '../../data/properties';
import './Testimonials.css';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section className="testi section">
      <div className="testi__bg" />
      <div className="container">
        <div className="section-header">
          <span className="section-tag">💬 Real Stories</span>
          <h2 className="section-title">
            What Travellers <span className="gradient-text">Say About Us</span>
          </h2>
          <p className="section-subtitle">
            Thousands of verified reviews from real guests who lived their best stories through LyfeStays.
          </p>
        </div>

        {/* Big Featured Quote */}
        <div className="testi__featured">
          <div className="testi__quote-mark">"</div>
          <p className="testi__quote">{testimonials[active].text}</p>
          <div className="testi__author">
            <img src={testimonials[active].avatar} alt={testimonials[active].name} className="testi__avatar" />
            <div>
              <p className="testi__name">{testimonials[active].name}</p>
              <p className="testi__location">📍 {testimonials[active].location} · {testimonials[active].property}</p>
            </div>
            <div className="testi__stars">
              {[...Array(testimonials[active].rating)].map((_, i) => (
                <FiStar key={i} className="testi__star" />
              ))}
            </div>
          </div>
          <div className="testi__nav">
            <button className="testi__nav-btn" onClick={prev}><FiChevronLeft /></button>
            <div className="testi__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testi__dot ${i === active ? 'testi__dot--active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <button className="testi__nav-btn" onClick={next}><FiChevronRight /></button>
          </div>
        </div>

        {/* Card Row */}
        <div className="testi__cards">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`testi__card ${i === active ? 'testi__card--active' : ''}`}
              onClick={() => setActive(i)}
            >
              <div className="testi__card-stars">
                {[...Array(t.rating)].map((_, j) => (
                  <FiStar key={j} size={12} style={{ color: 'var(--gold)' }} />
                ))}
              </div>
              <p className="testi__card-text">"{t.text.substring(0, 100)}..."</p>
              <div className="testi__card-author">
                <img src={t.avatar} alt={t.name} />
                <div>
                  <p className="testi__card-name">{t.name}</p>
                  <p className="testi__card-loc">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
