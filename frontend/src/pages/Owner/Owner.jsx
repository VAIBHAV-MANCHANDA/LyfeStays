import { useState } from 'react';
import { FiCheck, FiDollarSign, FiBarChart2, FiShield, FiUsers, FiPlus } from 'react-icons/fi';
import './Owner.css';

const steps = [
  { num: '01', title: 'Register as Host', desc: 'Complete KYC with Aadhaar & property documents in under 10 minutes.' },
  { num: '02', title: 'List Your Property', desc: 'Add photos, set pricing, block unavailable dates. Go live in 24 hrs.' },
  { num: '03', title: 'Accept Bookings', desc: 'Review guest requests, auto-accept, or keep it manual — your choice.' },
  { num: '04', title: 'Earn & Grow', desc: 'Get paid within 24 hrs of check-in via direct bank transfer. No delays.' },
];

export default function Owner() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '', propertyType: '', nights: 20, pricePerNight: 5000
  });

  const projectedMonthly = form.nights * form.pricePerNight * 0.88; // 12% platform fee
  const projectedAnnual = projectedMonthly * 12;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="owner page">
      {/* Hero */}
      <div className="owner__hero">
        <div className="owner__hero-bg" />
        <div className="container owner__hero-inner">
          <span className="section-tag">💼 For Property Owners</span>
          <h1 className="owner__hero-title">
            Turn Your Property Into<br />
            <span className="gradient-text">Steady Income</span>
          </h1>
          <p className="owner__hero-sub">
            Join 8,000+ hosts earning ₹50,000–₹3,00,000/month with LyfeStays. List for free, earn more.
          </p>
          <div className="owner__hero-ctas">
            <button className="btn-primary" onClick={() => document.getElementById('list-form').scrollIntoView({ behavior: 'smooth' })}>
              List My Property Free
            </button>
            <button className="btn-secondary">Book an Expert Call</button>
          </div>
          <div className="owner__hero-social-proof">
            <div className="owner__avatars">
              {['women/44', 'men/32', 'women/22', 'men/55', 'women/33'].map((a, i) => (
                <img key={i} src={`https://randomuser.me/api/portraits/${a}.jpg`} alt="" className="owner__avatar" />
              ))}
            </div>
            <p className="owner__social-text">Join <strong>8,000+</strong> hosts already earning</p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Strip */}
        <div className="owner__stats-strip">
          {[
            { icon: '💰', value: '₹1.2L', label: 'Avg. monthly earnings' },
            { icon: '⚡', value: '24hr', label: 'Go live timeline' },
            { icon: '🤝', value: '12%', label: 'Platform fee only' },
            { icon: '📈', value: '92%', label: 'Occupancy rate' },
          ].map((s) => (
            <div key={s.label} className="owner__stat">
              <span className="owner__stat-icon">{s.icon}</span>
              <div className="owner__stat-value">{s.value}</div>
              <div className="owner__stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="owner__how-section">
          <div className="section-header">
            <span className="section-tag">📋 Simple Process</span>
            <h2 className="section-title">Start Earning in <span className="gradient-text">4 Steps</span></h2>
          </div>
          <div className="owner__steps">
            {steps.map((s) => (
              <div key={s.num} className="owner__step">
                <div className="owner__step-num">{s.num}</div>
                <h3 className="owner__step-title">{s.title}</h3>
                <p className="owner__step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Calc + Form side by side */}
        <div className="owner__main-grid" id="list-form">
          {/* Earnings Calculator */}
          <div className="owner__calculator">
            <h2 className="owner__calc-title">
              <FiBarChart2 /> Estimate Your Earnings
            </h2>
            <div className="owner__calc-fields">
              <div className="owner__calc-field">
                <label>Avg. Nights Booked / Month</label>
                <div className="owner__calc-value">{form.nights} nights</div>
                <input type="range" min={5} max={30} value={form.nights} name="nights" onChange={handleChange} className="rent__slider" />
              </div>
              <div className="owner__calc-field">
                <label>Price per Night (₹)</label>
                <div className="owner__calc-value">₹{form.pricePerNight.toLocaleString()}</div>
                <input type="range" min={1000} max={20000} step={500} value={form.pricePerNight} name="pricePerNight" onChange={handleChange} className="rent__slider" />
              </div>
            </div>
            <div className="owner__calc-result">
              <div className="owner__calc-result-box">
                <span>Monthly Income</span>
                <span className="owner__calc-big gradient-text">₹{projectedMonthly.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="owner__calc-result-box">
                <span>Annual Income</span>
                <span className="owner__calc-big">₹{projectedAnnual.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            <p className="owner__calc-note">*After 12% platform fee. Estimates based on similar properties in your area.</p>
            <div className="owner__perks">
              {['Free listing forever', 'Instant payouts T+1', '₹0 setup cost', 'Dedicated host manager', 'Property insurance cover', 'Smart pricing AI'].map((p) => (
                <div key={p} className="owner__perk">
                  <FiCheck className="owner__perk-check" /> {p}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="owner__form-card">
            <h2 className="owner__form-title">List Your Property</h2>
            <p className="owner__form-sub">Fill in the details below — our host relations team will call you within 2 hours.</p>

            {/* Step Progress */}
            <div className="owner__form-progress">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`owner__progress-step ${step >= s ? 'owner__progress-step--active' : ''}`}>
                  <div className="owner__progress-dot">{step > s ? <FiCheck size={12} /> : s}</div>
                  <span>{s === 1 ? 'Personal' : s === 2 ? 'Property' : 'Confirm'}</span>
                </div>
              ))}
            </div>

            <form className="owner__form" onSubmit={(e) => { e.preventDefault(); if (step < 3) setStep(s => s + 1); }}>
              {step === 1 && (
                <>
                  <div className="owner__field"><label>Full Name</label><input name="name" value={form.name} onChange={handleChange} placeholder="Rajesh Kumar" required /></div>
                  <div className="owner__field"><label>Email</label><input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required /></div>
                  <div className="owner__field"><label>Phone Number</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required /></div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="owner__field"><label>Property City</label><input name="city" value={form.city} onChange={handleChange} placeholder="e.g. Manali, Goa, Kerala" required /></div>
                  <div className="owner__field">
                    <label>Property Type</label>
                    <select name="propertyType" value={form.propertyType} onChange={handleChange}>
                      <option value="">Select type...</option>
                      {['Villa', 'Cottage', 'Bungalow', 'Apartment', 'Farm Stay', 'Heritage', 'Houseboat', 'Other'].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="owner__field"><label>Number of Bedrooms</label><select name="bedrooms"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div>
                </>
              )}
              {step === 3 && (
                <div className="owner__confirm">
                  <span className="owner__confirm-icon">🎉</span>
                  <h3>Almost There!</h3>
                  <p>One of our host experts will call you at <strong>{form.phone || 'your number'}</strong> within 2 hours to complete your listing. Get ready to start earning!</p>
                </div>
              )}

              {step < 3 ? (
                <div className="owner__form-actions">
                  {step > 1 && <button type="button" className="btn-secondary" onClick={() => setStep(s => s - 1)}>Back</button>}
                  <button type="submit" className="btn-primary">
                    {step === 2 ? 'Submit & Get Called' : 'Continue'} →
                  </button>
                </div>
              ) : (
                <button type="button" className="btn-primary owner__reset-btn" onClick={() => { setStep(1); setForm({ name: '', email: '', phone: '', city: '', propertyType: '', nights: 20, pricePerNight: 5000 }); }}>
                  List Another Property
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Host Testimonials */}
        <div className="owner__host-testi">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
            Hosts Love <span className="gradient-text">LyfeStays</span>
          </h2>
          <div className="owner__host-cards">
            {[
              { name: 'Simran Bhatia', loc: 'Shimla Host', earn: '₹96,000/month', text: 'My property was sitting empty for 6 months. Within 2 weeks on LyfeStays it had its first booking. I now earn more from it than my salary!', img: 'women/55' },
              { name: 'Rajesh Malhotra', loc: 'Manali Host', earn: '₹2.1L/month', text: 'The host dashboard is incredible — I can see bookings, payments and reviews all in one place. Support team is always just a WhatsApp away.', img: 'men/72' },
              { name: 'Kavitha Rao', loc: 'Coorg Host', earn: '₹1.4L/month', text: 'The LyfeStays professional photography team came to my estate and made it look stunning. Bookings tripled in the first month after the listing went live.', img: 'women/33' },
            ].map((h) => (
              <div key={h.name} className="owner__host-card">
                <div className="owner__host-earn">{h.earn}</div>
                <p className="owner__host-text">"{h.text}"</p>
                <div className="owner__host-author">
                  <img src={`https://randomuser.me/api/portraits/${h.img}.jpg`} alt={h.name} />
                  <div>
                    <p className="owner__host-name">{h.name}</p>
                    <p className="owner__host-loc">{h.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="owner__bottom-cta">
          <div className="owner__bottom-cta-inner">
            <h2>Ready to Start Earning? <span className="gradient-text">It's Free.</span></h2>
            <p>List in 10 minutes. Get your first booking within days. No commission until you earn.</p>
            <button className="btn-primary" onClick={() => { setStep(1); document.getElementById('list-form').scrollIntoView({ behavior: 'smooth' }); }}>
              Start Listing Now — Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
