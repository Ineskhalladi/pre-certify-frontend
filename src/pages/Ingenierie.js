import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaDraftingCompass,
    FaTools,
    FaCogs,
    FaRobot,
    FaScrewdriver,
    FaLayerGroup,
    FaMicroscope,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import dessinImg from '../assets/designetsymbole.png';
  import soudageImg from '../assets/soudage.jpeg';
  import automatisationImg from '../assets/automatisation.png';
  import robotiqueImg from '../assets/robotique.jpg';
  import fixationImg from '../assets/fixations.jpg';
  import fabricationAdditiveImg from '../assets/fabricationadd.jpg';
  import nanoImg from '../assets/nanotecnologia.png';
  import autreImg from '../assets/autreingenerie.jpg';
  
  const servicesData = [
    {
      title: "Dessins et symboles",
      description: "Langage graphique utilisé en ingénierie technique.",
      icon: <FaDraftingCompass />,
      img: dessinImg,
      text: "Les dessins et symboles techniques sont essentiels pour communiquer des spécifications précises entre les équipes d'ingénierie.",
      text2: "Ils permettent de standardiser la conception, d’éviter les erreurs d’interprétation et d’assurer la cohérence dans les processus de fabrication.",
    },
    {
      title: "Soudage",
      description: "Procédés d'assemblage permanent des matériaux.",
      icon: <FaTools />,
      img: soudageImg,
      text: "Le soudage est une technique de base en ingénierie pour assembler durablement des pièces métalliques ou thermoplastiques.",
      text2: "Il existe plusieurs types de soudage, chacun adapté à des besoins spécifiques de résistance, de précision et de sécurité.",
    },
    {
      title: "Automatisation industrielle",
      description: "Contrôle automatique des processus de production.",
      icon: <FaCogs />,
      img: automatisationImg,
      text: "L’automatisation industrielle optimise les performances en réduisant les coûts, les erreurs humaines et les temps d'arrêt.",
      text2: "Elle s'appuie sur des systèmes de capteurs, d'actionneurs et de logiciels pour gérer les chaînes de production.",
    },
    {
      title: "Robotique",
      description: "Utilisation de robots pour exécuter des tâches techniques.",
      icon: <FaRobot />,
      img: robotiqueImg,
      text: "La robotique permet d’automatiser des tâches complexes, répétitives ou dangereuses dans l’industrie.",
      text2: "Elle intègre la mécanique, l’électronique et l’intelligence artificielle pour améliorer la productivité et la précision.",
    },
    {
      title: "Fixations",
      description: "Éléments d’assemblage mécanique des composants.",
      icon: <FaScrewdriver />,
      img: fixationImg,
      text: "Les fixations garantissent la stabilité, la sécurité et la performance des structures mécaniques.",
      text2: "Le choix des vis, boulons, rivets ou colles dépend des contraintes mécaniques et environnementales de chaque application.",
    },
    {
      title: "Fabrication additive",
      description: "Impression 3D de composants industriels.",
      icon: <FaLayerGroup />,
      img: fabricationAdditiveImg,
      text: "La fabrication additive révolutionne l’ingénierie par la création de pièces sur mesure avec moins de matière et de déchets.",
      text2: "Elle permet une innovation rapide, la réduction des délais de prototypage et des conceptions complexes auparavant irréalisables.",
    },
    {
      title: "Nanotechnologie",
      description: "Ingénierie à l’échelle nanométrique.",
      icon: <FaMicroscope />,
      img: nanoImg,
      text: "Les nanotechnologies ouvrent la voie à de nouveaux matériaux, capteurs et dispositifs ultra-performants.",
      text2: "Elles transforment l’ingénierie dans des secteurs comme l’électronique, la médecine, l’énergie et l’environnement.",
    },
    {
      title: "Autre",
      description: "Sujets avancés en ingénierie moderne.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette catégorie regroupe des sujets innovants comme l'ingénierie quantique, l’éthique de l’IA ou l’ingénierie durable.",
      text2: "Elle reflète l’évolution constante du domaine et l’importance de la veille technologique dans les pratiques d’ingénierie.",
    },
  ];
  


const Ingenerie = () => {
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
        <h2>Ingénierie</h2>
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

export default Ingenerie;
