import React, { useState, useEffect } from "react";
import "../pages/Home.css";
import { FaArrowUp, FaHeartbeat, FaPlane, FaExchangeAlt, FaLeaf, FaLightbulb, FaShieldAlt, FaAppleAlt, FaGlobe } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import imghome from "../assets/img-home.png";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { BiWorld } from "react-icons/bi";
import { GrTechnology } from "react-icons/gr";

const sectors = [
    { icon: <GrTechnology />, label: "Informatique et technologies connexes" },
    { icon: <FaHeartbeat />, label: "Santé" },
    { icon: <FaPlane />, label: "Transport" },
    { icon: <FaExchangeAlt />, label: "Gestion et services" },
    { icon: <FaLeaf />, label: "Durabilité environnementale" },
    { icon: <FaLightbulb />, label: "Énergie" },
    { icon: <FaGlobe />, label: "Sécurité, sûreté et risques" },
    { icon: <TbBuildingSkyscraper />, label: "Bâtiment et construction" },
    { icon: <FaShieldAlt />, label: "Matériels" },
    { icon: <FaAppleAlt />, label: "Alimentation et agriculture" },
    { icon: <MdSettings />, label: "Ingénierie" },
    { icon: <BiWorld />, label: "Diversité et inclusion" }
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
          <h2><span className="pre">PreCertify :</span> votre plateforme de recommandation de pré-audit <br></br>pour la certification ISO HCQM</h2>
          <p>
            Vous aide à garantir <span className="kelma">fiabilité et conformité.</span> Optimisez vos démarches  <br></br>et atteignez 
            <span className="kelma"> les plus hauts standards de qualité.</span>
          </p>
          <p>Rendre la vie plus facile, plus sûre et meilleure.</p>
        </div>
        <img src={imghome} className="imghome" alt="Plateforme PreCertify" />
      </section>

      <section className="normes-section">
        <h2>Que peuvent <span className="partie2-home">faire les normes pour vous</span> ?</h2>
        <p className="normes-description">
          Les normes internationales garantissent que les produits et services que vous utilisez au quotidien sont <strong>sûrs</strong>, <strong>fiables</strong> et de <strong>haute qualité</strong>. Elles guident également les entreprises dans l’adoption de pratiques <strong>durables</strong> et <strong>éthiques</strong>, contribuant ainsi à créer un avenir où vos achats seront non seulement excellents, mais protégeront également notre planète. En substance, les normes associent harmonieusement qualité et conscience, améliorant ainsi vos expériences et vos choix au quotidien.
        </p>
        <div className="normes-cards">
          <div className="card">
            <h3>Qu’est-ce qu’une norme ?</h3>
            <p>Plongez dans le monde de la qualité et de <br></br>la cohérence.</p>
            <a href="#">En savoir plus sur les normes</a>
          </div>
          <div className="card2">
            <h3>Vous souhaitez obtenir une certification ?</h3>
            <p>Découvrez comment la conformité à une norme est <br></br>évaluée par les organismes de certification et autres</p>
            <a href="#">En savoir plus sur la certification</a>
          </div>
        </div>
      </section>

      <section className="sector-container">
      <h2>Explorer par secteur</h2>
      <div className="sector-grid">
        {sectors.map((sector, index) => (
          <div key={index} className={`sector-card ${sector.active ? "active" : ""}`}>
            <div className="icon">{sector.icon}</div>
            <p>{sector.label}</p>
          </div>
        ))}
      </div>
    </section>
    
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Home;
