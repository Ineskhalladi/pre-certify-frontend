import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaShieldAlt,
    FaHardHat,
    FaLock,
    FaUserSecret,
    FaBell,
    FaHome,
    FaExclamationTriangle,
    FaEllipsisH,
    FaArrowUp,
  } from "react-icons/fa";
  
  import securiteInfoImg from '../assets/risque.jpg';
  import travailImg from '../assets/securitétravail.jpg';
  import cyberImg from '../assets/securité.jpg';
  import crimeImg from '../assets/protection.jpg';
  import alarmeImg from '../assets/alarme.jpeg';
  import maisonImg from '../assets/domestique.png';
  import catastropheImg from '../assets/accidents.jpg';
  import autreSecuImg from '../assets/autresecurité.jpeg';
  
  const servicesData = [
    {
      title: "Gestion des risques",
      description: "Identification, évaluation et prévention des risques dans tous les secteurs.",
      icon: <FaShieldAlt />,
      img: securiteInfoImg,
      text: "La gestion des risques consiste à anticiper les menaces potentielles qui peuvent affecter la sécurité des personnes, des biens ou des systèmes.",
      text2: "Elle repose sur des méthodes d’analyse des vulnérabilités, des plans de prévention et des protocoles d’intervention pour limiter les impacts en cas de crise.",
    },
    {
      title: "Sécurité au travail",
      description: "Prévention des accidents et santé des travailleurs sur les lieux professionnels.",
      icon: <FaHardHat />,
      img: travailImg,
      text: "La sécurité au travail englobe toutes les mesures visant à protéger la santé physique et mentale des employés.",
      text2: "Elle comprend la formation, les équipements de protection individuelle, l'aménagement des postes et le respect des normes en vigueur (ex. ISO 45001).",
    },
    {
      title: "Sécurité de l'information",
      description: "Cybersécurité, confidentialité des données et systèmes de défense numérique.",
      icon: <FaLock />,
      img: cyberImg,
      text: "Ce domaine protège les données et les infrastructures numériques contre les accès non autorisés, les fuites ou les attaques.",
      text2: "Il comprend la cryptographie, les pare-feux, la détection d’intrusions, la sensibilisation des utilisateurs et le respect de standards comme ISO/IEC 27001.",
    },
    {
      title: "Protection contre la criminalité",
      description: "Prévention des actes criminels et lutte contre les menaces internes ou externes.",
      icon: <FaUserSecret />,
      img: crimeImg,
      text: "Cette thématique inclut les stratégies de surveillance, d’analyse comportementale et d’intervention en cas de comportements délictueux.",
      text2: "Elle s’applique aux lieux publics, aux entreprises ou en ligne, et repose sur la collaboration entre sécurité privée, forces de l’ordre et technologies modernes.",
    },
    {
      title: "Systèmes d’alarme et d’avertissement",
      description: "Détection et signalement rapide des dangers ou intrusions.",
      icon: <FaBell />,
      img: alarmeImg,
      text: "Les systèmes d’alarme permettent d’alerter en cas d’incendie, d’intrusion ou de toute situation critique nécessitant une réponse immédiate.",
      text2: "Ils comprennent des capteurs, des systèmes de contrôle, des sirènes, des notifications mobiles et des liaisons avec les centres de secours.",
    },
    {
      title: "Sécurité domestique",
      description: "Protection des habitations et des personnes dans l’environnement privé.",
      icon: <FaHome />,
      img: maisonImg,
      text: "La sécurité domestique concerne la prévention des vols, des incendies, des accidents domestiques et des agressions au sein du foyer.",
      text2: "Elle repose sur la domotique, les caméras, les capteurs, les alarmes, ainsi que sur l’éducation des occupants aux bons réflexes de sécurité.",
    },
    {
      title: "Contrôle des accidents et des catastrophes",
      description: "Réduction des impacts des événements naturels ou technologiques graves.",
      icon: <FaExclamationTriangle />,
      img: catastropheImg,
      text: "Ce domaine regroupe la préparation, la réponse et la résilience face aux catastrophes naturelles (séismes, inondations) ou industrielles.",
      text2: "Les plans d’urgence, les exercices de simulation, la coordination des secours et les technologies d’alerte rapide sont essentiels.",
    },
    {
      title: "Autres",
      description: "Sujets émergents ou transversaux liés à la sûreté et la résilience.",
      icon: <FaEllipsisH />,
      img: autreSecuImg,
      text: "Cette catégorie couvre les innovations ou enjeux spécifiques non classés ailleurs, comme la sécurité événementielle ou la résilience organisationnelle.",
      text2: "Elle exige une approche adaptable et interdisciplinaire, incluant la surveillance, la formation et l’analyse de données en temps réel.",
    },
  ];
  

const Securité = () => {
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
        <h2>Sécurité, sûreté et risque</h2>
        <img src={line} className="line-contI" alt="Ligne décorative" />
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

export default Securité;
