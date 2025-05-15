import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaFlask,
    FaAtom,
    FaGem,
    FaCubes,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import produitsChimiquesImg from '../assets/produitchimique.jpg';
  import terresRaresImg from '../assets/terrerares.jpeg';
  import mineraisMetauxImg from '../assets/minerais.jpg';
  import materiauxNonMetalliquesImg from '../assets/Matériauxnonmétalliques.avif';
  import autreImg from '../assets/autremateriaux.jpeg';
  
  const servicesData = [
    {
      title: "Produits chimiques",
      description: "Utilisation responsable des substances chimiques.",
      icon: <FaFlask />,
      img: produitsChimiquesImg,
      text: "Les produits chimiques sont utilisés dans de nombreux secteurs industriels et nécessitent une gestion rigoureuse pour limiter les risques sanitaires et environnementaux.",
      text2: "Les normes encadrent leur production, leur manipulation, leur stockage et leur élimination en toute sécurité.",
    },
    {
      title: "Terres rares",
      description: "Éléments critiques pour les technologies modernes.",
      icon: <FaAtom />,
      img: terresRaresImg,
      text: "Les terres rares sont essentielles à la fabrication d’équipements électroniques, de batteries et d’énergies renouvelables.",
      text2: "Leur extraction et leur traitement posent des défis environnementaux et géopolitiques majeurs.",
    },
    {
      title: "Minerais et métaux",
      description: "Ressources stratégiques pour l'industrie.",
      icon: <FaGem />,
      img: mineraisMetauxImg,
      text: "Les minerais et métaux sont des matières premières indispensables à la construction, à l’énergie et aux technologies.",
      text2: "L’exploitation responsable vise à réduire les impacts environnementaux et à promouvoir le recyclage.",
    },
    {
      title: "Matériaux non métalliques",
      description: "Ressources alternatives aux métaux.",
      icon: <FaCubes />,
      img: materiauxNonMetalliquesImg,
      text: "Les matériaux non métalliques incluent le verre, les plastiques techniques, les céramiques et les composites.",
      text2: "Ils offrent des solutions performantes mais nécessitent aussi des approches durables de production et de fin de vie.",
    },
    {
      title: "Autre",
      description: "Autres sujets liés aux matériaux.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette catégorie regroupe des enjeux transversaux comme la circularité des matériaux, l’innovation ou la traçabilité des ressources.",
      text2: "Elle soutient le développement de matériaux durables, sûrs et éthiquement sourcés.",
    }
  ];
  


const Materiaux = () => {
  const [selectedService, setSelectedService] = useState(servicesData[0]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const scrollTo = document.getElementById("scrollToService");
    scrollTo.addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById("afficheservise").scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  }, []);

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
    <div id="contact-container">
        <section className="contact-section">
      
      <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
      <div className="content">
        <h2>Matériaux</h2>
        <img src={line} className="line-cont" alt="Ligne décorative" />
        <p>
          Lorem ipsum dolor sit amet. In voluptas rerum aut voluptatem et quia natus qui
          perferendis soluta.
        </p>
      </div>
      <img src={flechet} className="fleche fleche2" alt="Flèche droite" />
      </section>
      <a href="#afficheservise" id="scrollToService">
        <section className="services-list">
          {servicesData.map((service, index) => (
            <div
              className="service-card"
              key={index}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => {
                setSelectedService(service);
                setSelectedServiceIndex(index);
              }}
            >
              <h2>
                <i className="fa">{service.icon}</i> {service.title}
              </h2>
              <p>{service.description}</p>
              <p style={{ fontSize: "10px" }}>Cliquez pour plus d'informations</p>
            </div>
          ))}
        </section>
      </a>
      <section className="bgs">
      <div id="afficheservise">
        <div id="imgg">
          <img src={selectedService.img} alt="Service" />
        </div>
        <div id="part2">
          <section className="service-detail">
            <h2 className="titre">
              <i className="fa">{selectedService.icon}</i> {selectedService.title}
            </h2>
            <br />
            <p className="parp1">{selectedService.text}</p>
            <p>{selectedService.text2}</p>
          </section>
        </div>
      </div>

      <div className="circles-wrapper">
        {servicesData.map((_, i) => (
          <span key={i} className={`circle ${selectedServiceIndex === i ? "active-circle" : ""}`}></span>
        ))}
      </div>
      </section>
       {/* Bouton pour remonter en haut */}
         {showButton && (
              <button className="scroll-to-top" onClick={scrollToTop}>
                <FaArrowUp />
              </button>
            )}
    </div>
  );
};

export default Materiaux;
