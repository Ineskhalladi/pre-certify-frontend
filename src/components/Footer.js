import "../components/Footer.css";
import { FaFacebook, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <h2 className="logo">PreCertify</h2>
          <p>
            PreCertify - Votre assistant de pré-audit ISO. Simplifiez votre conformité et
            préparez-vous efficacement aux certifications.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-section navigation">
          <h3>NAVIGATION</h3>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/normes">Normes</Link>
            <Link to="/secteurs">Secteurs</Link>
            <Link to="/actualites">Information et actualités</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/veille">Veille</Link>
          </div>
        </div>
        <div className="footer-section contact">
          <h3>COORDONNÉES</h3>
          <p><FaMapMarkerAlt className="icon" /> Av. Habib Bourguiba, Bou Hjar Monastir</p>
          <p><FaPhone className="icon" /> <a href="tel:+2171900975">71 900 975</a> - <a href="tel:+2171900977">71 900 977</a></p>
          <p><FaPhone className="icon" /> <a href="tel:+2171900976">71 900 976</a></p>
          <p><FaEnvelope className="icon" /> <a href="mailto:precertify-info@gmail.com">precertify-info@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p><a href="https://www.PreCertify.com" target="_blank" rel="noopener noreferrer">www.PreCertify.com</a></p>
        <p>Copyright © 2025 PreCertify. Tous les droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
