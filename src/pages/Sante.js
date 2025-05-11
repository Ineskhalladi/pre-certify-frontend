import React, { useEffect, useState } from "react";
import "./Secteurs.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import {
  FaStethoscope,
  FaHospital,
  FaDna,
  FaDesktop,
  FaBlind,
  FaEllipsisH,
} from "react-icons/fa";
import equipementImg from '../assets/equipements.jpg';
import soinsImg from '../assets/servicesoins.png';
import biotechImg from '../assets/bioech.png';
import informatiqueImg from '../assets/infosante.jpeg';
import vieillissementImg from '../assets/veillsante.avif';
import autreImg from '../assets/autresanté.jpg';

const servicesData = [
  {
    title: "Équipement",
    description: "Dispositifs médicaux, matériel hospitalier, équipements de diagnostic ou chirurgicaux.",
    icon: <FaStethoscope />,
    img: equipementImg, 
    text: "Le domaine de l’équipement couvre tout le matériel nécessaire au bon fonctionnement des structures de soins. Cela comprend les dispositifs médicaux utilisés pour diagnostiquer, traiter ou surveiller des patients.",
    text2: "Par exemple, les hôpitaux utilisent des équipements sophistiqués comme les scanners, IRM, défibrillateurs, respirateurs, moniteurs cardiaques, ainsi que du mobilier médicalisé comme des lits réglables, chariots d’urgence ou lampes chirurgicales. Ces équipements doivent répondre à des normes strictes pour garantir leur sécurité, leur efficacité et leur conformité réglementaire.",
  },
  {
    title: "Services de soins",
    description: "Prestations médicales fournies aux patients par des professionnels de santé.",
    icon: <FaHospital />,
    img:soinsImg,  
    text: "Ce domaine englobe toutes les activités de soins directs destinées à préserver ou améliorer la santé des patients. Il comprend les services offerts par les hôpitaux, cliniques, centres de santé, mais aussi les soins à domicile.",
    text2: "Cela inclut les consultations médicales, les soins infirmiers, les actes chirurgicaux, la maternité, les urgences, la rééducation, les soins palliatifs, ainsi que les actions de prévention. Ces services impliquent une coordination entre différents professionnels (médecins, infirmiers, aides-soignants...) et doivent répondre à des exigences de qualité et de traçabilité des actes médicaux.",
  },
  {
    title: "Biotechnologie",
    description: "Recherche et développement dans les domaines pharmaceutiques, génétiques et biologiques.",
    icon: <FaDna />,
    img:biotechImg,
    text: "La biotechnologie en santé représente un domaine d’innovation majeur, combinant la biologie, la chimie, l’informatique et l’ingénierie pour améliorer les traitements médicaux. Elle est au cœur de la conception de nouveaux médicaments, vaccins et thérapies.",
    text2: "Par exemple, les thérapies géniques permettent de corriger des défauts génétiques, tandis que les biotechnologies moléculaires sont utilisées pour développer des traitements ciblés contre le cancer. Ces recherches sont encadrées par des protocoles stricts, notamment en matière d’essais cliniques, d’éthique et de sécurité sanitaire.",
  },
  {
    title: "Informatique de santé",
    description: "Outils numériques pour la gestion et le suivi des soins médicaux.",
    icon: <FaDesktop />,
    img: informatiqueImg,
    text: "Ce domaine désigne l’ensemble des solutions numériques utilisées dans les établissements de santé et les cabinets médicaux. Elles permettent de collecter, stocker, partager et analyser les données médicales de manière sécurisée.",
    text2: "Parmi ces outils : les dossiers médicaux partagés (DMP), les logiciels de gestion hospitalière, la téléconsultation, les plateformes de e-santé ou les applications mobiles de suivi des patients. Ces technologies facilitent la continuité des soins, réduisent les erreurs médicales et améliorent l’efficacité globale du système de santé.",
  },
  {
    title: "Vieillissement",
    description: "Accompagnement et soins des personnes âgées en perte d’autonomie.",
    icon: <FaBlind />,
    img: vieillissementImg,
    text: "Avec l’augmentation de l’espérance de vie, ce domaine devient prioritaire. Il englobe les dispositifs et structures destinés à accompagner les personnes âgées : EHPAD, services d’aide à domicile, soins gériatriques et équipements adaptés.",
    text2: "On y retrouve aussi les technologies d’assistance (bracelets de téléassistance, capteurs de chute, domotique) et des politiques de prévention de la perte d’autonomie. L’objectif est de permettre un maintien à domicile sécurisé et digne, ou une prise en charge adaptée en établissement.",
  },
  {
    title: "Autre",
    description: "Thématiques transversales ou émergentes dans le secteur de la santé.",
    icon: <FaEllipsisH />,
    img: autreImg,
    text: "Ce domaine permet de regrouper des sujets qui ne relèvent pas directement des grandes catégories classiques, mais qui ont un impact réel sur la santé publique.",
    text2: "Parmi ces sujets : la santé mentale, la santé environnementale (qualité de l’air, exposition aux toxines), la médecine du travail, les médecines alternatives (phytothérapie, acupuncture), la prévention des addictions, ou encore l’éducation à la santé. Ces thèmes transversaux exigent des approches pluridisciplinaires et des actions coordonnées entre santé, environnement, éducation et travail.",
  },
];



const Sante = () => {
  const [selectedService, setSelectedService] = useState(servicesData[0]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

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
      <div className="content">
        <h2>Santé</h2>
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
    </div>
  );
};

export default Sante;
