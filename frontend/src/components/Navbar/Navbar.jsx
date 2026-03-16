import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FiMenu, FiX, FiSearch, FiUser, FiLogOut,
  FiHome, FiHeart, FiBriefcase, FiGlobe
} from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import logo from '../../assets/LyfeStaysLogo.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/rent', label: 'Rent', icon: <FiGlobe /> },
    { to: '/buy', label: 'Buy', icon: <FiHeart /> },
    { to: '/owner', label: 'Owner', icon: <FiBriefcase /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={logo} alt="LyfeStays" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
              >
                <span className="navbar__link-icon">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="navbar__right">
          <button className="navbar__search-btn" onClick={() => navigate('/rent')}>
            <FiSearch />
            <span>Explore Stays</span>
          </button>

          {/* Profile Dropdown */}
          <div className="navbar__profile" ref={profileRef}>
            <button
              className="navbar__avatar-btn"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <HiOutlineUserCircle size={28} />
              <FiMenu size={16} />
            </button>
            {profileOpen && (
              <div className="navbar__dropdown">
                <div className="navbar__dropdown-header">
                  <p className="navbar__dropdown-title">Welcome back</p>
                  <p className="navbar__dropdown-sub">Guest User</p>
                </div>
                <div className="navbar__dropdown-divider" />
                <Link to="/dashboard" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                  <FiUser size={15} /> My Bookings
                </Link>
                <Link to="/owner" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                  <FiBriefcase size={15} /> List Property
                </Link>
                <div className="navbar__dropdown-divider" />
                <Link to="/login" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>
                  <FiLogOut size={15} /> Sign In / Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
        <div className="navbar__mobile-actions">
          <Link to="/login" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Sign In
          </Link>
          <Link to="/register" className="btn-secondary" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
