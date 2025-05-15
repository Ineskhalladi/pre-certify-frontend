import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaSpaceShuttle,
    FaTrain,
    FaRoad,
    FaShip,
    FaCarSide,
    FaTruckLoading,
    FaBoxOpen,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import aeroImg from '../assets/aerospatial.jpg';
  import railImg from '../assets/rail.jpg';
  import routeImg from '../assets/route.png';
  import eauImg from '../assets/eau.jpeg';
  import smartImg from '../assets/systemvehicule.jpg';
  import logistiqueImg from '../assets/logistique.avif';
  import conteneurImg from '../assets/Conteneur.png';
  import autreImg from '../assets/autreTransport.png';
  
  const servicesData = [
    {
      title: "Aérospatial",
      description: "Sécurité et efficacité des systèmes et transports aériens et spatiaux.",
      icon: <FaSpaceShuttle />,
      img: aeroImg,
      text: "Le domaine aérospatial comprend la gestion des risques liés aux vols, à la navigation aérienne, et aux systèmes orbitaux.",
      text2: "Il repose sur des normes strictes, des protocoles de sécurité, la maintenance préventive et des innovations en ingénierie aérospatiale.",
    },
    {
      title: "Rail",
      description: "Exploitation sécurisée et durable des réseaux ferroviaires.",
      icon: <FaTrain />,
      img: railImg,
      text: "Le rail nécessite un contrôle rigoureux des voies, des signalisations, et des équipements roulants.",
      text2: "La sécurité ferroviaire inclut aussi la cybersécurité des systèmes de commande et la gestion des passagers et marchandises.",
    },
    {
      title: "Route",
      description: "Sécurité des infrastructures, véhicules et conducteurs sur route.",
      icon: <FaRoad />,
      img: routeImg,
      text: "Le transport routier couvre la prévention des accidents, la surveillance du trafic, et le contrôle des normes techniques.",
      text2: "Les systèmes intelligents, les radars, les protocoles de secours et la formation des conducteurs sont essentiels.",
    },
    {
      title: "Eau",
      description: "Navigation sécurisée sur mers, fleuves, canaux et ports.",
      icon: <FaShip />,
      img: eauImg,
      text: "Le transport maritime et fluvial implique la sécurité des navires, des équipages, et des marchandises.",
      text2: "Les normes de navigation, les systèmes de balisage, les ports intelligents et les secours en mer sont déterminants.",
    },
    {
      title: "Systèmes et véhicules intelligents",
      description: "Automatisation, IA et connectivité dans les transports modernes.",
      icon: <FaCarSide />,
      img: smartImg,
      text: "Ce domaine intègre les véhicules autonomes, les capteurs intelligents et les réseaux V2X (Vehicle to Everything).",
      text2: "Il exige une réglementation spécifique, une cybersécurité renforcée et des protocoles d'interopérabilité fiables.",
    },
    {
      title: "Logistique",
      description: "Gestion optimisée du flux de biens et de services dans la chaîne de transport.",
      icon: <FaTruckLoading />,
      img: logistiqueImg,
      text: "La logistique couvre la planification, l’entreposage, le transport et la traçabilité des produits.",
      text2: "La sécurité concerne les cargaisons, les itinéraires critiques, et les systèmes numériques de suivi.",
    },
    {
      title: "Conteneurs de fret",
      description: "Sécurisation du transport et du stockage des marchandises conteneurisées.",
      icon: <FaBoxOpen />,
      img: conteneurImg,
      text: "Les conteneurs nécessitent une traçabilité, un contrôle d’accès et des inspections régulières.",
      text2: "Les normes ISO relatives aux conteneurs garantissent leur conformité, leur résistance et leur sûreté globale.",
    },
    {
      title: "Autres",
      description: "Thématiques émergentes ou transversales dans le secteur du transport.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette catégorie inclut les innovations non classées comme les drones logistiques ou les transports hybrides.",
      text2: "Elle nécessite une veille technologique, une analyse d'impact et une réglementation adaptable.",
    },
  ];
  

const Transport = () => {
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
        <h2>Transport</h2>
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

export default Transport;
