import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaAppleAlt,
    FaTractor,
    FaBacteria,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import securiteAlimentaireImg from '../assets/securitealimentaire.jpg';
  import machinesAgricolesImg from '../assets/machineagri.png';
  import microbiologieImg from '../assets/Microbiologie.jpeg';
  import autreImg from '../assets/autreAlimentation.jpg';
  
  const servicesData = [
    {
      title: "Sécurité alimentaire",
      description: "Accès garanti à une alimentation suffisante et saine.",
      icon: <FaAppleAlt />,
      img: securiteAlimentaireImg,
      text: "La sécurité alimentaire vise à garantir que chacun dispose, à tout moment, d'une alimentation suffisante, saine et nutritive.",
      text2: "Elle implique la surveillance des chaînes d'approvisionnement, la lutte contre la malnutrition et la gestion des risques sanitaires liés aux aliments.",
    },
    {
      title: "Machines agricoles",
      description: "Équipements mécanisés pour améliorer la productivité agricole.",
      icon: <FaTractor />,
      img: machinesAgricolesImg,
      text: "Les machines agricoles modernisent les pratiques agricoles et permettent une meilleure efficacité dans les cultures et les récoltes.",
      text2: "Cependant, leur coût et leur entretien nécessitent des investissements adaptés, en particulier dans les zones rurales à faibles ressources.",
    },
    {
      title: "Microbiologie des aliments",
      description: "Étude des micro-organismes dans les produits alimentaires.",
      icon: <FaBacteria />,
      img: microbiologieImg,
      text: "La microbiologie des aliments permet de garantir l’hygiène, la qualité et la sécurité sanitaire des produits consommés.",
      text2: "Elle joue un rôle clé dans la prévention des intoxications alimentaires et l'amélioration des procédés de conservation.",
    },
    {
      title: "Autre",
      description: "Sujets transversaux ou émergents en agriculture et alimentation.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette section couvre des thématiques variées comme l'agriculture urbaine, l'innovation agroalimentaire ou l'impact du changement climatique sur les cultures.",
      text2: "Elle appelle à une approche interdisciplinaire pour anticiper les défis futurs et assurer une transition vers des systèmes alimentaires durables.",
    },
  ];
  


const Alimentation = () => {
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
      <div className="contentI">
        <h2>Alimentation et Agriculture</h2>
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

export default Alimentation;
