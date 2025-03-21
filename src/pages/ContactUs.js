import React, { useState, useEffect } from "react";
import "../pages/ContactUs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaArrowUp } from "react-icons/fa";


const ContactUs = () => {
  const [showButton, setShowButton] = useState(false);

  // Vérifier le scroll pour afficher le bouton
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="contact-container">
      {/* Section Contact avec le fond */}
      <section className="contact-section">
      
        <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
        <div className="content">
          <h2>Contact Us</h2>
          <img src={line} className="line-cont" alt="Ligne décorative" />
          <p>
            Lorem ipsum dolor sit amet. In voluptas rerum aut voluptatem et quia natus qui
            perferendis soluta.
          </p>
        </div>
        <img src={flechet} className="fleche fleche2" alt="Flèche droite" />
      </section>

      {/* Formulaire en dehors de la section avec un fond différent */}
     <div className="cont">
      <div className="contact-form">
        <div className="inputat">
          <input type="text" placeholder="Name" className="input" required />
          <input type="tel" placeholder="Phone" className="input" required pattern="[0-9]{8}" />
        </div>
        <input type="email" placeholder="Email" className="inputE" required />
        <textarea placeholder="Message" className="inputM"></textarea>
        <button className="envoyer">Envoyer</button>
     </div>
    
         <div className="news">
          <h1>Our Newsletter</h1>
          <p>Lorem ipsum dolor sit amet
            In voluptas rerum aut voluptatem et 
            quia natus qui perferendis soluta.
          </p>
            <input type="email" placeholder="Email" className="input3"/>
            <button className="btn">Submit Button</button>
        </div>
        </div>
        <div className="contact-info">
        <div className="info-box">
        <FaPhoneAlt className="icones2" />
          <p className="info-text"><a href="tel:+2171900975">71 900 975</a> - <a href="tel:+2171900977">71 900 977</a></p>
          <p className="info-description">Contact us via phone</p>
        </div>
        <div className="info-box">
        <FaEnvelope className="icones2" />
          <p className="info-text"><a href="mailto:precertify-info@gmail.com">precertify-info@gmail.com</a></p>
          <p className="info-description">Get in touch via email</p>
        </div>
        <div className="info-box">
        <FaMapMarkerAlt className="icones2" />
          <p className="info-text2"><a href="https://maps.app.goo.gl/oNN7hBme1nnheWWy5">Av. Habib Bourguiba, Bou Hjar Monastir</a></p>
          <p className="info-description">Visit us at our location</p>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.268391091146!2d10.85821457563429!3d35.67039287259064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130211a2bc90c5ed%3A0xab3e2f549428606b!2sSWConsulting!5e0!3m2!1sfr!2stn!4v1741984642706!5m2!1sfr!2stn" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" width="100%"
  height="300x" style={{border:0, marginTop:100}}></iframe>
   {/* Bouton pour remonter en haut */}
   {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
   
    </div>
  
  );
};

export default ContactUs;
