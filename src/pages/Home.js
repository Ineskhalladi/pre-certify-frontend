import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import { FaArrowUp, FaHeartbeat, FaPlane, FaExchangeAlt, FaLeaf, FaLightbulb, FaAppleAlt, FaGlobe, FaExclamationTriangle } from "react-icons/fa";
import { MdSecurity, MdSettings } from "react-icons/md";
import imghome from "../assets/img-home.png";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { GrTechnology } from "react-icons/gr";
import iso9001 from "../assets/iso 9001.png";
import iso14001 from "../assets/iso 14001.png";
import iso45001 from "../assets/iso 45001.png";
import iso21001 from "../assets/iso 21001.png";
import iso26000 from "../assets/iso 26000.png";
import { BiPlus } from "react-icons/bi";
import { Link } from 'react-router-dom'; 

const sectors = [
    { icon: <GrTechnology />, label: "Informatique et technologies connexes" },
    { icon: <FaHeartbeat />, label: "Santé" },
    { icon: <FaPlane />, label: "Transport" },
    { icon: <FaExchangeAlt />, label: "Gestion et services" },
    { icon: <FaLeaf />, label: "Durabilité environnementale" },
    { icon: <FaLightbulb />, label: "Énergie" },
    { icon: <FaExclamationTriangle/>, label: "Sécurité, sûreté et risques" },
    { icon: <TbBuildingSkyscraper />, label: "Bâtiment et construction" },
    { icon: <MdSecurity  />, label: "Matériels" },
    { icon: <FaAppleAlt />, label: "Alimentation et agriculture" },
    { icon: <MdSettings />, label: "Ingénierie" },
    { icon: <FaGlobe />, label: "Diversité et inclusion" }
  ];
const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  return (
    <div className="home-container">
      <section className="home-section">
        <div className="content-home">
          <h2 className="sentence delay-1"><span className="pre">PreCertify :</span> votre plateforme de recommandation de pré-audit <br></br>pour la certification ISO HCQM</h2>
          <p className="sentence delay-2">
            Vous aide à garantir <span className="kelma">fiabilité et conformité.</span> Optimisez vos démarches  <br></br>et atteignez 
            <span className="kelma"> les plus hauts standards de qualité.</span>
          </p>
          <p className="sentence delay-3">Rendre la vie plus facile, plus sûre et meilleure.</p>
        </div>
        <img src={imghome} className="imghome" alt="Plateforme PreCertify" />
      </section>

      <section className="normes-section">
        <h2>Que peuvent <span className="partie2-home">faire les normes pour vous</span> ?</h2>
        <p className="normes-description">
          Les normes internationales garantissent que les produits et services que vous utilisez au quotidien sont
           <strong>sûrs</strong>, 
           <strong>fiables</strong>
            et de <strong>haute qualité</strong>.
             Elles guident également les entreprises dans l’adoption de pratiques 
             <strong>durables</strong> et 
             <strong>éthiques</strong>, 
             contribuant ainsi à créer un avenir où vos achats seront non seulement excellents,
              mais protégeront également notre planète. En substance, les normes associent harmonieusement qualité et conscience,
               améliorant ainsi vos expériences et vos choix au quotidien.
        </p>
        <div className="normes-cards">
          <div className="card">
            <h3>Qu’est-ce qu’une norme ?</h3>
            <p>Plongez dans le monde de la qualité et de <br></br>la cohérence.</p>
            <Link to="/normes">En savoir plus sur les normes</Link>
          </div>
          <div className="card2">
            <h3>Vous souhaitez obtenir une certification ?</h3>
            <p>Découvrez comment la conformité à une norme est <br></br>évaluée par les organismes de certification et autres</p>
            <a href="#">En savoir plus sur la certification</a>
          </div>
        </div>
      </section>

      <section className="sector-container">
      <h2>Explorer nom secteur</h2>
      <div className="sector-grid">
        {sectors.map((sector, index) => (
          <div key={index} className="sector-card" >
            <div className={`icones-explore icon-${sector.label.toLowerCase().replace(/ /g, '-')}`}>{sector.icon}</div>
            <p>{sector.label}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="contr-normes">
        <h2>Des normes de pointe</h2>
        <div className="grid-normes">
          <div className="normes-row">
            <div className="card-normes">
              <img src={iso9001} alt="ISO 9001" className="img-normes" />
              <h3 className="iso-title blue">ISO 9001</h3>
              <p className="description-normes">Système de gestion de la qualité</p>
            </div>
            <div className="card-normes">
              <img src={iso14001} alt="ISO 14001" className="img-normes" />
              <h3 className="iso-title green">ISO 14001</h3>
              <p className="description-normes">Gestion environnementale</p>
            </div>
            <div className="card-normes">
              <img src={iso45001} alt="ISO 45001" className="img-normes" />
              <h3 className="iso-title red">ISO 45001</h3>
              <p className="description-normes">Gestion de la santé et sécurité</p>
            </div>
          </div>
          <div className="normes-row">
            <div className="card-normes">
              <img src={iso21001} alt="ISO 21001" className="img-normes" />
              <h3 className="iso-title purple">ISO 21001</h3>
              <p className="description-normes">Système de management des organismes d’éducation</p>
            </div>
            <div className="card-normes">
              <img src={iso26000} alt="ISO 26000" className="img5-normes" />
              <h3 className="iso-title orange">ISO 26000</h3>
              <p className="description-normes">Responsabilité sociétale</p>
            </div>
            <div className="load-more">
            <Link to="/normes" style={{ textDecoration: 'none' }}>
             <BiPlus className="plus"/> 
              <p>Charger plus</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.268391091146!2d10.85821457563429!3d35.67039287259064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130211a2bc90c5ed%3A0xab3e2f549428606b!2sSWConsulting!5e0!3m2!1sfr!2stn!4v1741984642706!5m2!1sfr!2stn" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" width="100%"
  height="350x" style={{border:0, marginTop:100}}></iframe>
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
