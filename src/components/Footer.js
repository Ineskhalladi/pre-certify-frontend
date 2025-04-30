import "../components/Footer.css";
import logo from "../assets/logo.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import fixe  from "../assets/iconesfixe.png";
import { Link } from "react-router-dom";
import { BsFacebook, BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section ">
          <img src={logo} className="logo-footer" />
          <p className="p0">
            PreCertify - Votre assistant de pré-audit ISO. Simplifiez votre conformité et
            préparez-vous efficacement aux certifications.
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <BsFacebook className="icon-soc" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <BsLinkedin className="icon-soc" />
            </a>
          </div>
        </div>
        <div className=" navigation">
          <h2>NAVIGATION</h2>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/normes">Normes</Link>
            <Link to="/secteurs">Secteurs</Link>
            <Link to="/veilleReg">Veille</Link>
            <Link to="/contact">Contact</Link>
           
          </div>
        </div>
        <div className="contact">
          <h2>COORDONNÉES</h2>
          <p className="rue"><FaMapMarkerAlt className="icon-footer" /> <a href="https://maps.app.goo.gl/oNN7hBme1nnheWWy5">
          Av. Habib Bourguiba, Bou Hjar 
          <br/>Monastir </a></p>
          <p><FaPhoneAlt className="icon-footer" /> <a href="tel:+2171900975">71 900 975</a> - <a href="tel:+2171900977">71 900 977</a></p>
          <p><img src={fixe} className="icon-fixe" /> <a href="tel:+2171900976">71 900 976</a></p>
          <p><FaEnvelope className="icon-footer" /> <a href="mailto:precertify-info@gmail.com">precertify28@gmail.com</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="p1"><a href="https://www.PreCertify.com" target="_blank" rel="noopener noreferrer">www.PreCertify.com</a></p>
        <div className="line-footer"></div>
        <p className="p2">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
