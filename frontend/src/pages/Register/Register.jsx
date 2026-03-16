import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import logo from '../../assets/LyfeStaysLogo.png';
import './Register.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'traveller' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/'); }, 1500);
  };

  return (
    <div className="auth">
      <div className="auth__left">
        <div className="auth__left-bg" />
        <div className="auth__left-content">
          <img src={logo} alt="LyfeStays" className="auth__logo" />
          <h2 className="auth__left-title">Join 50,000+ Travellers</h2>
          <p className="auth__left-sub">Create your free LyfeStays account and start exploring India's most extraordinary stays today.</p>
          <div className="auth__left-props">
            {['₹2,000 welcome bonus on first stay', 'Access to exclusive member deals', 'Earn LyfeCoins on every booking', 'Priority customer support'].map((p) => (
              <div key={p} className="auth__left-prop">🎁 {p}</div>
            ))}
          </div>
          <div className="auth__left-bg-card">
            <img src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500&q=80" alt="" />
            <div className="auth__left-bg-info">
              <p className="auth__bg-title">Munnar Glass Treehouse</p>
              <p className="auth__bg-loc">📍 Munnar, Kerala</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth__right">
        <div className="auth__form-card">
          <h1 className="auth__form-title">Create Account</h1>
          <p className="auth__form-sub">Already have an account? <Link to="/login" className="auth__link">Sign in here</Link></p>

          {/* Role Selector */}
          <div className="auth__roles" style={{ marginBottom: 24 }}>
            <button
              className={`auth__role-btn ${form.role === 'traveller' ? 'auth__role-btn--active' : ''}`}
              onClick={() => setForm(f => ({ ...f, role: 'traveller' }))}
              type="button"
            >
              <span className="auth__role-icon">🧳</span>
              <span className="auth__role-label">I'm a Traveller</span>
            </button>
            <button
              className={`auth__role-btn ${form.role === 'owner' ? 'auth__role-btn--active' : ''}`}
              onClick={() => setForm(f => ({ ...f, role: 'owner' }))}
              type="button"
            >
              <span className="auth__role-icon">🏠</span>
              <span className="auth__role-label">I'm an Owner</span>
            </button>
          </div>

          {/* Social Signup */}
          <div className="auth__social">
            <button className="auth__social-btn">🔵 Continue with Google</button>
          </div>
          <div className="auth__divider"><span>or create with email</span></div>

          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
              <label>Full Name</label>
              <div className="auth__input-wrap">
                <FiUser className="auth__input-icon" />
                <input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Rajesh Kumar" required />
              </div>
            </div>

            <div className="auth__field">
              <label>Email Address</label>
              <div className="auth__input-wrap">
                <FiMail className="auth__input-icon" />
                <input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" required />
              </div>
            </div>

            <div className="auth__field">
              <label>Password</label>
              <div className="auth__input-wrap">
                <FiLock className="auth__input-icon" />
                <input
                  type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="Min. 8 characters" required minLength={8}
                />
                <button type="button" className="auth__eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary auth__submit" disabled={loading}>
              {loading ? 'Creating Account...' : `Create ${form.role === 'owner' ? 'Host' : 'Traveller'} Account — Free`}
            </button>
          </form>

          <p className="auth__terms">
            By registering you agree to our <a href="#">Terms of Service</a>, <a href="#">Privacy Policy</a>, and <a href="#">Community Standards</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
