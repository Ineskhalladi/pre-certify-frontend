import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
    FaUniversity,
    FaMoneyCheckAlt,
    FaChalkboardTeacher,
    FaGavel,
    FaUsers,
    FaSuitcaseRolling,
    FaBlind,
    FaHospitalUser,
    FaCity,
    FaRecycle,
    FaEllipsisH,
    FaArrowUp
  } from "react-icons/fa";
  
  import gestionImg from '../assets/systemgestion.png';
  import financeImg from '../assets/Banquefinance.jpeg';
  import educationImg from '../assets/Éducation.jpg';
  import gouvernanceImg from '../assets/Gouvernance.png';
  import rhImg from '../assets/RH.png';
  import tourismeImg from '../assets/tourisme.jpg';
  import vieillissementImg from '../assets/veillgestion.png';
  import soinsImg from '../assets/servicesoinsgestion.png';
  import villeImg from '../assets/Villesintelligentes.png';
  import environnementImg from '../assets/Gestionenvironnement.jpg';
  import autreImg from '../assets/Autregestion.jpg';
  
  const servicesData = [
    {
      title: "Systèmes de gestion",
      description: "Méthodes et outils pour organiser efficacement les processus d’une organisation.",
      icon: <FaUniversity />,
      img: gestionImg,
      text: "Les systèmes de gestion permettent d’optimiser la qualité, la sécurité, l’environnement ou encore l’énergie au sein d’une organisation. Ils reposent souvent sur des normes comme ISO 9001 ou ISO 14001.",
      text2: "Ces systèmes favorisent la performance globale, la conformité réglementaire et l’amélioration continue en documentant les processus, évaluant les risques et intégrant des actions correctives ou préventives.",
    },
    {
      title: "Banque et finance",
      description: "Normes et bonnes pratiques pour la gestion des services financiers.",
      icon: <FaMoneyCheckAlt />,
      img: financeImg,
      text: "Ce domaine couvre les exigences de sécurité, transparence et fiabilité dans les opérations bancaires et financières. Il s’applique aux banques, assurances, fintechs et institutions de crédit.",
      text2: "Les normes abordent la gestion des risques financiers, la sécurité des données (ISO/IEC 27001), la lutte contre le blanchiment d’argent et les exigences de conformité internationale.",
    },
    {
      title: "Éducation",
      description: "Qualité et management des services éducatifs et de formation.",
      icon: <FaChalkboardTeacher />,
      img: educationImg,
      text: "Ce domaine concerne les établissements scolaires, universitaires ou organismes de formation continue. Il vise à garantir des processus pédagogiques efficaces et équitables.",
      text2: "La norme ISO 21001 spécifie un cadre pour améliorer les services éducatifs, l’écoute des besoins des apprenants, l’inclusion, et le suivi des performances éducatives.",
    },
    {
      title: "Gouvernance",
      description: "Pilotage stratégique, conformité et éthique dans les organisations.",
      icon: <FaGavel />,
      img: gouvernanceImg,
      text: "La gouvernance d’entreprise ou publique s’appuie sur des principes de transparence, responsabilité, participation et performance durable.",
      text2: "Les normes telles que l’ISO 37000 aident à structurer les organes de direction, prévenir la corruption (ISO 37001), renforcer la confiance et assurer une prise de décision fondée sur des données objectives.",
    },
    {
      title: "Ressources humaines",
      description: "Gestion stratégique du capital humain et du bien-être au travail.",
      icon: <FaUsers />,
      img: rhImg,
      text: "Ce domaine traite de la gestion des compétences, du recrutement, de la formation, de la sécurité et du climat social au sein des organisations.",
      text2: "Les normes comme ISO 30414 (indicateurs RH) ou ISO 45001 (santé-sécurité au travail) permettent de structurer les politiques RH pour allier performance et bien-être des collaborateurs.",
    },
    {
      title: "Tourisme",
      description: "Qualité des services touristiques et durabilité des destinations.",
      icon: <FaSuitcaseRolling />,
      img: tourismeImg,
      text: "Ce domaine regroupe les bonnes pratiques pour les agences de voyage, hôtels, sites touristiques, afin de garantir un accueil, une sécurité et une expérience de qualité.",
      text2: "Les normes abordent l’accessibilité, la gestion environnementale, la formation du personnel, et la satisfaction client, en lien avec des standards internationaux du tourisme responsable.",
    },
    {
      title: "Vieillissement",
      description: "Services et accompagnement pour les personnes âgées.",
      icon: <FaBlind />,
      img: vieillissementImg,
      text: "Avec le vieillissement démographique, ce domaine couvre les services à domicile, établissements spécialisés, équipements adaptés, et accompagnement médical ou social.",
      text2: "Les solutions incluent la prévention de la perte d’autonomie, l’aide au maintien à domicile, la domotique, la téléassistance, et des politiques d’inclusion et de dignité.",
    },
    {
      title: "Services de soins",
      description: "Prestations médicales fournies aux patients.",
      icon: <FaHospitalUser />,
      img: soinsImg,
      text: "Ce domaine comprend l’ensemble des services médicaux assurant la prévention, le traitement et le suivi des patients dans les hôpitaux, cliniques ou à domicile.",
      text2: "Il implique une coordination interdisciplinaire et des normes sur la qualité des soins, la gestion des risques, la traçabilité et l’expérience patient.",
    },
    {
      title: "Villes intelligentes",
      description: "Utilisation des technologies pour une gestion durable des villes.",
      icon: <FaCity />,
      img: villeImg,
      text: "Les villes intelligentes intègrent des solutions connectées pour la mobilité, l’énergie, la sécurité, l’environnement et les services publics.",
      text2: "Les normes ISO pour les smart cities (ISO 37120, ISO 37122) fixent des indicateurs de performance urbaine et favorisent la résilience, la durabilité et la participation citoyenne.",
    },
    {
      title: "Gestion de l’environnement",
      description: "Stratégies de réduction de l’impact écologique des activités humaines.",
      icon: <FaRecycle />,
      img: environnementImg,
      text: "Ce domaine s’intéresse à la maîtrise des pollutions, la gestion des déchets, la préservation des ressources naturelles et la lutte contre le changement climatique.",
      text2: "Les normes ISO 14001 (management environnemental) ou ISO 50001 (énergie) accompagnent les organisations dans leur transition écologique et leur conformité réglementaire.",
    },
    {
      title: "Autre",
      description: "Thèmes transversaux non classés dans les grandes catégories.",
      icon: <FaEllipsisH />,
      img: autreImg,
      text: "Ce domaine regroupe des sujets comme la médiation sociale, l’économie sociale et solidaire, ou l’innovation sociale, souvent à la croisée de plusieurs champs.",
      text2: "Il s’agit de problématiques émergentes nécessitant des approches intersectorielles et des dispositifs souples d’expérimentation et d’évaluation.",
    },
  ];
  


const Gestion = () => {
  const [selectedService, setSelectedService] = useState(servicesData[0]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
const [showButton, setShowButton] = useState(false);

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

  useEffect(() => {
    const scrollTo = document.getElementById("scrollToService");
    scrollTo.addEventListener("click", (e) => {
      e.preventDefault();
      setTimeout(() => {
        document.getElementById("afficheservise").scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  }, []);

  return (
    <div id="contact-container">
        <section className="contact-section">
      
      <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
      <div className="contentG">
        <h2>Gestion et services</h2>
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
         {showButton && (
              <button className="scroll-to-top" onClick={scrollToTop}>
                <FaArrowUp />
              </button>
            )}
         
    </div>
  );
};

export default Gestion;
