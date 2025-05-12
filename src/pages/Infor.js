import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
  
  FaArrowUp,
    FaCode,
  FaEllipsisH,
  FaHeartbeat,
  FaLock,
  FaRobot,
  FaServer,
  FaVideo,
  FaWifi,
} from "react-icons/fa";
import iaImg from '../assets/ia.avif';
import securiteImg from '../assets/Sécurité info.jpg';
import logicielImg from '../assets/Codage.png';
import iotImg from '../assets/IoT.webp';
import infoSanteImg from '../assets/infosanteinfo.jpg';
import dataCenterImg from '../assets/Centresdonn.jpg';
import audiovisuelImg from '../assets/audiovisuel.jpg'; // Par défaut, même si tu peux changer si nécessaire
import autresTechImg from '../assets/autre info.jpeg'; // Par défaut aussi


const servicesData = [
    {
      title: "Intelligence Artificielle (IA)",
      description: "Applications de l'IA dans les diagnostics, la robotique, ou l'automatisation intelligente.",
      icon: <FaRobot />,
      img: iaImg,
      text: "L’intelligence artificielle transforme le secteur technologique en apportant des capacités de traitement autonome, d’analyse prédictive et d’apprentissage machine. Elle est utilisée dans des domaines variés allant de la reconnaissance vocale aux algorithmes de recommandations.",
      text2: "En santé, en finance, en logistique ou dans les transports, l’IA permet une prise de décision plus rapide et personnalisée. Elle s’appuie sur des bases de données massives, et nécessite des standards rigoureux en matière d’éthique, de transparence des algorithmes et de protection des données.",
    },
    {
      title: "Sécurité de l'information",
      description: "Protection des données, cybersécurité, conformité et résilience numérique.",
      icon: <FaLock />,
      img: securiteImg,
      text: "Ce domaine vise à protéger les systèmes informatiques, les réseaux et les données contre les attaques, les accès non autorisés et les fuites d’informations sensibles. Il couvre à la fois les aspects techniques et organisationnels.",
      text2: "Cela inclut les pare-feux, les protocoles de chiffrement, la gestion des identités, la surveillance des menaces, mais aussi les audits de sécurité et les plans de continuité d’activité. Les normes ISO/IEC 27001 sont souvent utilisées pour structurer la gouvernance de la sécurité informatique.",
    },
    {
      title: "Développement Logiciel",
      description: "Conception, programmation et maintenance d’applications numériques.",
      icon: <FaCode />,
      img: logicielImg,
      text: "Le développement logiciel regroupe les processus de création d'applications, du codage à la mise en production. Il s’appuie sur des langages de programmation, des frameworks, des méthodologies (Agile, DevOps) et des outils de versionnage.",
      text2: "Les logiciels peuvent être développés pour des ordinateurs, des mobiles ou des objets connectés, et doivent répondre à des critères de performance, de sécurité, d’ergonomie et d’accessibilité. La gestion des versions et la documentation sont essentielles pour assurer leur qualité et leur évolutivité.",
    },
    {
      title: "Internet des Objets (IoT)",
      description: "Appareils connectés, capteurs intelligents et communication machine-à-machine.",
      icon: <FaWifi />,
      img: iotImg,
      text: "L’IoT regroupe les objets capables de collecter et transmettre des données via Internet, sans intervention humaine. Ces objets sont présents dans la domotique, la santé, le transport, l’industrie et bien d'autres secteurs.",
      text2: "Ils permettent le suivi à distance, l’automatisation, l’analyse en temps réel et la maintenance prédictive. L’interopérabilité, la sécurité des communications et la gestion des flux de données sont des enjeux clés du domaine.",
    },
    {
      title: "Informatique de Santé",
      description: "Solutions numériques pour les soins, les dossiers médicaux et la télémédecine.",
      icon: <FaHeartbeat />,
      img: infoSanteImg,
      text: "Ce domaine allie les technologies informatiques à la gestion des soins médicaux. Il comprend les logiciels hospitaliers, les plateformes de téléconsultation, les applications de suivi patient et les outils d’aide au diagnostic.",
      text2: "L'informatique de santé améliore la coordination des soins, réduit les erreurs médicales et favorise la médecine préventive. Elle nécessite des standards d’interopérabilité, de confidentialité et d’accès sécurisé aux données médicales.",
    },
    {
      title: "Centres de Données",
      description: "Infrastructure physique pour le stockage et le traitement sécurisé des données.",
      icon: <FaServer />,
      img: dataCenterImg,
      text: "Les centres de données (data centers) sont des installations essentielles pour héberger serveurs, réseaux et solutions de stockage. Ils assurent la disponibilité, la sécurité et la résilience des services numériques.",
      text2: "Ils sont évalués selon leur niveau de redondance, d’efficacité énergétique (PUE) et de conformité (ISO/IEC 20000, 27001). Leurs infrastructures doivent être protégées contre les sinistres, les intrusions physiques et les défaillances électriques.",
    },
    {
      title: "Audiovisuel",
      description: "Technologies de production, de diffusion et de traitement des contenus multimédias.",
      icon: <FaVideo />,
      img: audiovisuelImg,
      text: "Le domaine audiovisuel couvre la création de contenus vidéo, audio et interactifs, ainsi que leur diffusion via des canaux numériques ou traditionnels (TV, streaming, podcasts).",
      text2: "Il englobe les systèmes de capture (caméras, micros), de postproduction (montage, effets visuels), de transmission (réseaux IP, satellites) et de gestion des droits numériques. L’intégration des technologies immersives (VR/AR) ouvre de nouvelles possibilités.",
    },
    {
      title: "Autres technologies",
      description: "Innovations émergentes et domaines transversaux dans les TIC.",
      icon: <FaEllipsisH />,
      img: autresTechImg,
      text: "Ce domaine regroupe les technologies innovantes ou transversales non classées ailleurs : blockchain, edge computing, métavers, quantique, etc.",
      text2: "Ces technologies apportent de nouvelles opportunités mais posent aussi des défis d’intégration, de réglementation et de compatibilité avec les systèmes existants. Une veille constante est nécessaire pour anticiper leur impact sur la société et l’économie.",
    },
  ];
  

const Infor = () => {
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
      <div className="contentI">
        <h2>Informatique et technologies connexes</h2>
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

export default Infor;
