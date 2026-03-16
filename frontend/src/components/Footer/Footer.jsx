import { Link } from 'react-router-dom';
import {
  FiInstagram, FiTwitter, FiYoutube, FiFacebook,
  FiMail, FiPhone, FiHeart
} from 'react-icons/fi';
import logo from '../../assets/LyfeStaysLogo.png';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Grid */}
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">

            {/* Brand */}
            <div className="footer__brand">
              <Link to="/">
                <img src={logo} alt="LyfeStays" className="footer__logo" />
              </Link>
              <p className="footer__desc">
                Handpicked luxury stays across India's most breathtaking destinations.
              </p>
              <div className="footer__socials">
                <a href="#" className="footer__social" aria-label="Instagram"><FiInstagram /></a>
                <a href="#" className="footer__social" aria-label="Twitter"><FiTwitter /></a>
                <a href="#" className="footer__social" aria-label="YouTube"><FiYoutube /></a>
                <a href="#" className="footer__social" aria-label="Facebook"><FiFacebook /></a>
              </div>
            </div>

            {/* Explore */}
            <div className="footer__col">
              <h4 className="footer__col-title">Explore</h4>
              <ul className="footer__links">
                <li><Link to="/rent">Rent a Stay</Link></li>
                <li><Link to="/buy">Buy Property</Link></li>
                <li><Link to="/owner">List Property</Link></li>
                <li><Link to="/">Luxury Villas</Link></li>
                <li><Link to="/">Beach Getaways</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer__col">
              <h4 className="footer__col-title">Company</h4>
              <ul className="footer__links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Partnerships</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__col-title">Contact</h4>
              <ul className="footer__links footer__links--contact">
                <li>
                  <FiPhone className="footer__contact-icon" />
                  <a href="tel:+911800LYFE">+91 1800-LYFE-STAY</a>
                </li>
                <li>
                  <FiMail className="footer__contact-icon" />
                  <a href="mailto:hello@lyfe-stays.com">hello@lyfe-stays.com</a>
                </li>
              </ul>
              {/* Newsletter */}
              <form className="footer__nl" onSubmit={(e) => e.preventDefault()}>
                <input type="email" className="footer__nl-input" placeholder="Your email" />
                <button type="submit" className="footer__nl-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__container footer__bottom-inner">
          <p className="footer__copyright">
            © {currentYear} LyfeStays · Made with <FiHeart className="footer__heart" /> for Indian travellers
          </p>
          <div className="footer__legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cancellations</a>
          </div>
          <div className="footer__trust-badges">
            <span>🔒 SSL Secured</span>
            <span>✅ Verified Hosts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
