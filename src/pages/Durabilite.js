import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import{
    FaRecycle,
    FaTree,
    FaCloudSun,
    FaSmog,
    FaCity,
    FaTint,
    FaSeedling,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import environnementImg from '../assets/Gestionenvironnement.jpg';
  import economieCirculaireImg from '../assets/economiecirculaire.jpg';
  import climatImg from '../assets/changementclimatique.jpg';
  import qualiteAirImg from '../assets/qualitélaire.png';
  import villeIntelligenteImg from '../assets/Villesintelligentes.png';
  import solImg from '../assets/qualitésol.jpg';
  import eauImg from '../assets/qualiteeau.jpg';
  import autreImg from '../assets/autredurabilite.jpg';
  
  const servicesData = [
    {
      title: "Gestion de l'environnement",
      description: "Protection et gestion durable des ressources naturelles.",
      icon: <FaTree />,
      img: environnementImg,
      text: "La gestion de l'environnement vise à équilibrer les besoins humains et la préservation des écosystèmes naturels.",
      text2: "Elle repose sur des politiques de conservation, de prévention de la pollution et de valorisation de la biodiversité.",
    },
    {
      title: "Économie circulaire",
      description: "Système économique basé sur la réutilisation des ressources.",
      icon: <FaRecycle />,
      img: economieCirculaireImg,
      text: "L'économie circulaire favorise la réduction des déchets et l’optimisation des ressources par le recyclage, la réparation et la réutilisation.",
      text2: "Elle contribue à un modèle plus durable en limitant l'extraction de matières premières et les émissions polluantes.",
    },
    {
      title: "Changement climatique",
      description: "Lutte contre le réchauffement de la planète.",
      icon: <FaCloudSun />,
      img: climatImg,
      text: "Le changement climatique est un défi mondial nécessitant des actions urgentes pour réduire les émissions de gaz à effet de serre.",
      text2: "Les stratégies incluent la transition énergétique, la finance climatique et l’adaptation des territoires aux événements extrêmes.",
    },
    {
      title: "Qualité de l'air",
      description: "Surveillance et amélioration de l'air ambiant.",
      icon: <FaSmog />,
      img: qualiteAirImg,
      text: "La qualité de l'air affecte directement la santé publique et l’environnement.",
      text2: "Elle nécessite des politiques de réduction des émissions industrielles, des transports et du chauffage domestique.",
    },
    {
      title: "Villes intelligentes",
      description: "Urbanisme durable intégrant les technologies numériques.",
      icon: <FaCity />,
      img: villeIntelligenteImg,
      text: "Les villes intelligentes utilisent la technologie pour améliorer la gestion de l'énergie, des déchets et de la mobilité.",
      text2: "Elles favorisent la participation citoyenne et l’efficience énergétique pour un développement urbain durable.",
    },
    {
      title: "Qualité du sol",
      description: "Préservation de la fertilité et de la structure des sols.",
      icon: <FaSeedling />,
      img: solImg,
      text: "La qualité du sol est essentielle pour l’agriculture, la biodiversité et la régulation de l’eau.",
      text2: "Sa dégradation par l’érosion, la pollution ou l’artificialisation pose un enjeu majeur pour l’avenir des écosystèmes.",
    },
    {
      title: "Qualité de l'eau",
      description: "Gestion durable des ressources en eau douce.",
      icon: <FaTint />,
      img: eauImg,
      text: "L’accès à une eau propre et saine est un droit fondamental et un enjeu écologique crucial.",
      text2: "La préservation des nappes phréatiques, des rivières et des zones humides passe par une surveillance stricte et un traitement efficace.",
    },
    {
      title: "Autre",
      description: "Sujets émergents en lien avec l'environnement.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Cette catégorie regroupe des enjeux transversaux liés à la durabilité environnementale, comme la résilience écologique ou l’innovation verte.",
      text2: "Elle appelle à une veille constante pour intégrer les nouvelles pratiques et connaissances dans les politiques environnementales.",
    },
  ];
   


const Durabilite = () => {
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
        <h2>Durabilité Environnementale</h2>
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

export default Durabilite;
