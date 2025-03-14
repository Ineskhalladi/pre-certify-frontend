import React from "react";
import "../pages/ContactUs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import phone from "../assets/phonenoir.png";
import mail from "../assets/mailnoir.png";
import location from "../assets/locationnoir.png";



const ContactUs = () => {
  return (
    <div className="contact-container">
      {/* Section Contact avec le fond */}
      <section className="contact-section">
        <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
        <div className="content">
          <h2>Contact Us</h2>
          <img src={line} className="line" alt="Ligne décorative" />
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
          <img src={phone} className="icon" />
          <p className="info-text">71 900 975 - 71 900 977</p>
          <p className="info-description">Contact us via phone</p>
        </div>
        <div className="info-box">
          <img src={mail} className="icon" />
          <p className="info-text">precertify-info@gmail.com</p>
          <p className="info-description">Get in touch via email</p>
        </div>
        <div className="info-box">
          <img src={location} className="icon" />
          <p className="info-text">Av. Habib Bourguiba, Bou Hjar Monastir</p>
          <p className="info-description">Visit us at our location</p>
        </div>
      </div>
    </div>
  
  );
};

export default ContactUs;
