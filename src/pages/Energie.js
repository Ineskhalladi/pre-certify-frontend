import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
        FaSolarPanel,
        FaSeedling,
        FaRadiationAlt,
        FaBurn,
        FaOilCan,
        FaLeaf,
        FaEllipsisH,
        FaArrowUp
 } from "react-icons/fa";
      
 import renouvelableImg from '../assets/energieren.jpg';
 import biocarburantImg from '../assets/biocarburant.jpg';
 import nucleaireImg from '../assets/energienucleaire.jpg';
 import hydrogeneImg from '../assets/hydrogene.jpg';
 import fossileImg from '../assets/combustiblefossile.jpg';
 import economieImg from '../assets/economieenergie.jpg';
 import autreEnergieImg from '../assets/autreenergie.avif';
 
 const servicesData = [
   {
     title: "Énergies renouvelables",
     description: "Production d'énergie à partir de sources durables et propres.",
     icon: <FaSolarPanel />,
     img: renouvelableImg,
     text: "Les énergies renouvelables, telles que l'éolien et le solaire, offrent des solutions durables pour répondre aux besoins énergétiques tout en réduisant les émissions de gaz à effet de serre.",
     text2: "Cependant, leur intégration dans le réseau électrique nécessite des infrastructures adaptées et une gestion efficace pour assurer la stabilité de l'approvisionnement.",
   },
   {
     title: "Biocarburants",
     description: "Carburants produits à partir de matières organiques renouvelables.",
     icon: <FaSeedling />,
     img: biocarburantImg,
     text: "Les biocarburants représentent une alternative aux combustibles fossiles, utilisant des ressources biologiques pour produire de l'énergie.",
     text2: "Toutefois, leur production peut entrer en concurrence avec les cultures alimentaires et entraîner des impacts environnementaux si elle n'est pas gérée de manière durable.",
   },
   {
     title: "Énergie nucléaire",
     description: "Production d'électricité via des réactions nucléaires contrôlées.",
     icon: <FaRadiationAlt />,
     img: nucleaireImg,
     text: "L'énergie nucléaire offre une source d'électricité à faible émission de carbone, contribuant à la réduction des gaz à effet de serre.",
     text2: "Cependant, elle nécessite des mesures strictes de sûreté pour prévenir les accidents et gérer les déchets radioactifs sur le long terme.",
   },
   {
     title: "Hydrogène",
     description: "Vecteur énergétique propre pour diverses applications industrielles.",
     icon: <FaBurn />,
     img: hydrogeneImg,
     text: "L'hydrogène est considéré comme un vecteur énergétique prometteur pour décarboner les secteurs industriels et des transports.",
     text2: "Sa production, son stockage et son utilisation requièrent des infrastructures spécifiques et des normes de sécurité rigoureuses pour prévenir les risques d'explosion.",
   },
   {
     title: "Combustibles fossiles",
     description: "Sources d'énergie traditionnelles issues de la décomposition organique.",
     icon: <FaOilCan />,
     img: fossileImg,
     text: "Les combustibles fossiles, tels que le charbon, le pétrole et le gaz naturel, ont historiquement alimenté la croissance industrielle mondiale.",
     text2: "Cependant, leur utilisation est associée à des émissions élevées de gaz à effet de serre et à des impacts environnementaux significatifs.",
   },
   {
     title: "Économie d'énergie",
     description: "Optimisation de la consommation énergétique pour réduire les coûts et l'impact environnemental.",
     icon: <FaLeaf />,
     img: economieImg,
     text: "L'économie d'énergie vise à réduire la consommation énergétique grâce à des technologies efficaces et des comportements responsables.",
     text2: "Elle joue un rôle crucial dans la transition énergétique en diminuant la demande et en facilitant l'intégration des énergies renouvelables.",
   },
   {
     title: "Autre",
     description: "Domaines émergents ou transversaux liés à l'énergie.",
     icon: <FaEllipsisH />,
     img: autreEnergieImg,
     text: "Cette catégorie englobe des innovations et des technologies émergentes dans le secteur de l'énergie, telles que le stockage avancé ou les réseaux intelligents.",
     text2: "Elle nécessite une veille constante et une adaptation des réglementations pour intégrer efficacement ces nouvelles solutions.",
   },
 ];
 


const Energie = () => {
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
        <h2>Énergie</h2>
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

export default Energie;
