import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaDraftingCompass,
    FaWheelchair,
    FaCubes,
    FaBuilding,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import bimImg from '../assets/modelisationbim.jpg';
  import accessibiliteImg from '../assets/accessibilitébatiment.jpg';
  import materiauxImg from '../assets/Matériauxconstruction.jpg';
  import structureImg from '../assets/structurebatiment.jpg';
  import autreImg from '../assets/autrebatiment.jpg';
  
  const servicesData = [
    {
      title: "Modélisation des informations du bâtiment (BIM)",
      description: "Numérisation des processus de construction.",
      icon: <FaDraftingCompass />,
      img: bimImg,
      text: "Le BIM permet une représentation numérique collaborative des caractéristiques physiques et fonctionnelles d’un bâtiment.",
      text2: "Il améliore la coordination entre les intervenants, réduit les erreurs et facilite la maintenance des infrastructures.",
    },
    {
      title: "Accessibilité des bâtiments",
      description: "Conception inclusive pour tous les usagers.",
      icon: <FaWheelchair />,
      img: accessibiliteImg,
      text: "L’accessibilité vise à garantir que les bâtiments soient utilisables par tous, y compris les personnes à mobilité réduite.",
      text2: "Cela inclut les rampes, ascenseurs, signalisations et dimensions adaptées selon les normes universelles.",
    },
    {
      title: "Matériaux de construction",
      description: "Choix durable et performant des matériaux.",
      icon: <FaCubes />,
      img: materiauxImg,
      text: "Les matériaux de construction influencent la durabilité, la sécurité et l’impact environnemental des bâtiments.",
      text2: "Leur sélection repose sur des critères de résistance, d’isolation, de recyclabilité et de disponibilité locale.",
    },
    {
      title: "Structures des bâtiments",
      description: "Stabilité et sécurité des constructions.",
      icon: <FaBuilding />,
      img: structureImg,
      text: "Les structures assurent la résistance mécanique des bâtiments face aux charges et aux aléas naturels.",
      text2: "Elles intègrent des normes strictes d’ingénierie pour garantir la sûreté des occupants et la longévité de l’ouvrage.",
    },
    {
      title: "Autre",
      description: "Sujets émergents dans le domaine du bâtiment.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette catégorie couvre des aspects innovants comme la construction modulaire, les bâtiments à énergie positive ou la robotique sur chantier.",
      text2: "Elle reflète l’évolution des technologies et des pratiques dans un secteur en constante mutation.",
    },
  ];
  
   


const Batiment = () => {
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
        <h2>Bâtiment et Construction</h2>
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

export default Batiment;
