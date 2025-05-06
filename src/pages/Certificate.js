import React, { useState, useEffect } from "react";
import "../pages/Certificate.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import { FaArrowUp } from "react-icons/fa";


const Certificate = () => {
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
    <div className="contact-container">
      <section className="veilleReg-section">
        <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
        <div className="content-veilleReg">
          <h2>Certification</h2>
          <img src={line} className="line-veille" alt="Ligne décorative" />
          <p>
            Lorem ipsum dolor sit amet. In voluptas rerum aut voluptatem et quia natus qui
            perferendis soluta.
          </p>
        </div>
        <img src={flechet} className="fleche fleche2" alt="Flèche droite" />
      </section>
  {/* Section 2 avec info-box */}
<section className="certification-section certification-flex">
  <div className="content-certification">
    <h2>Pourquoi obtenir une certification ?</h2>
    <p className="p21">
    La certification est essentielle pour garantir  que vos produits, services ou systèmes respectent des normes de qualité et de sécurité reconnues. Elle renforce la confiance des clients et partenaires en prouvant votre conformité aux exigences internationales. 
    </p>
    <p className="p22">Dans certains secteurs, elle est même obligatoire, que ce soit pour des raisons légales ou contractuelles. Par exemple,<span className="jaunes"> l'ISO 9001</span> pour la qualité ou <span className="jaunes">l'ISO 14001</span> pour l'environnement sont des normes couramment utilisées.

    </p>
    <p className="p22">
    Avec PreCertify, vous pouvez gérer toutes vos démarches liées à la certification de manière simple et organisée. La plateforme vous aide à suivre les progrès de votre conformité, à planifier vos actions et à faciliter l’obtention des certifications nécessaires, tout en valorisant votre engagement envers la qualité et la sécurité auprès de vos clients et partenaires.
    </p>
  </div>

  <div className="info-box">
    <p><strong>Certification</strong> – fourniture par un organisme indépendant d’une assurance écrite (un certificat) que le produit, le service ou le système en question répond à des exigences spécifiques.</p>
    <p><strong>Accréditation</strong> – la reconnaissance formelle par un organisme indépendant, généralement connu sous le nom d’organisme d’accréditation, qu’un organisme de certification fonctionne conformément aux normes internationales.</p>
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

export default Certificate;
