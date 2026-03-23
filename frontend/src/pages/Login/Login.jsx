import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../../lib/api';
import logo from '../../assets/LyfeStaysLogo.png';
import './Login.css';

export default function Login({ onAuthSuccess, session }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (session) {
      navigate('/', { replace: true });
    }
  }, [navigate, session]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', form);

      onAuthSuccess({
        token: data.token,
        user: data.user,
      });

      navigate('/', { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Unable to sign in right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth__left">
        <div className="auth__left-bg" />
        <div className="auth__left-content">
          <img src={logo} alt="LyfeStays" className="auth__logo" />
          <h2 className="auth__left-title">Welcome Back, Traveller</h2>
          <p className="auth__left-sub">
            Sign in to continue your extraordinary journey with LyfeStays.
          </p>
          <div className="auth__left-props">
            {[
              'Manage your bookings',
              'Save favourite stays',
              'Earn LyfeCoins rewards',
              'Exclusive member deals',
            ].map((item) => (
              <div key={item} className="auth__left-prop">+ {item}</div>
            ))}
          </div>
          <div className="auth__left-bg-card">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80"
              alt=""
            />
            <div className="auth__left-bg-info">
              <p className="auth__bg-title">Himalayan Sky Villa</p>
              <p className="auth__bg-loc">Manali, HP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth__right">
        <div className="auth__form-card">
          <h1 className="auth__form-title">Sign In</h1>
          <p className="auth__form-sub">
            Don't have an account? <Link to="/register" className="auth__link">Create one free</Link>
          </p>

          {location.state?.message && (
            <div className="auth__alert auth__alert--success">{location.state.message}</div>
          )}
          {error && <div className="auth__alert auth__alert--error">{error}</div>}

          <div className="auth__social">
            <button className="auth__social-btn" type="button">Continue with Google</button>
            <button className="auth__social-btn" type="button">Continue with Apple</button>
          </div>
          <div className="auth__divider"><span>or sign in with email</span></div>

          <form className="auth__form" onSubmit={handleSubmit}>
            <div className="auth__field">
              <label>Email Address</label>
              <div className="auth__input-wrap">
                <FiMail className="auth__input-icon" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="auth__field">
              <div className="auth__field-header">
                <label>Password</label>
                <button type="button" className="auth__forgot auth__forgot-btn">
                  Forgot password?
                </button>
              </div>
              <div className="auth__input-wrap">
                <FiLock className="auth__input-icon" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Enter your password"
                  required
                />
                <button type="button" className="auth__eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary auth__submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="auth__terms">
            By signing in you agree to our <a href="/">Terms of Service</a> and <a href="/">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
