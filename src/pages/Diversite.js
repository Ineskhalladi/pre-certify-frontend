import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaUniversalAccess,
    FaVenusMars,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import accessibiliteImg from '../assets/accessibilité.jpeg';
  import genreImg from '../assets/genre.avif';
  import autreDiversiteImg from '../assets/autrediversité.jpg';
  
  const servicesData = [
    {
      title: "Accessibilité",
      description: "Favoriser l’accès équitable aux services pour tous, y compris les personnes en situation de handicap.",
      icon: <FaUniversalAccess />,
      img: accessibiliteImg,
      text: "L'accessibilité vise à garantir que les infrastructures, services et informations soient utilisables par toutes les personnes, quelles que soient leurs capacités.",
      text2: "Cela inclut des aménagements physiques, numériques et organisationnels pour une inclusion totale dans la société et le monde du travail.",
    },
    {
      title: "Genre",
      description: "Égalité entre les femmes, les hommes et les minorités de genre dans tous les domaines.",
      icon: <FaVenusMars />,
      img: genreImg,
      text: "L’approche genre vise à éliminer les discriminations et à promouvoir des politiques équitables en matière d’emploi, de rémunération, et de représentation.",
      text2: "Elle implique aussi la sensibilisation, la formation et des indicateurs pour évaluer les progrès vers une société plus juste.",
    },
    {
      title: "Autre",
      description: "Autres formes de diversité culturelle, religieuse, sociale, etc.",
      icon: <FaEllipsisH />,
      img: autreDiversiteImg,
      text: "Cette catégorie inclut la reconnaissance et la valorisation des différences culturelles, linguistiques, religieuses ou sociales dans les organisations et les politiques publiques.",
      text2: "Elle favorise le vivre-ensemble, la cohésion sociale et l’enrichissement mutuel dans un contexte de pluralité.",
    },
  ];
  


const Diversite = () => {
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
      <div className="contentG">
        <h2>Diversité et Inclusion</h2>
        <img src={line} className="line-contG" alt="Ligne décorative" />
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

export default Diversite;
