import React, { useEffect, useState } from "react";
import "./Secteurs.css";

const servicesData = [
  {
    title: "Gestion simplifiée",
    description: "Gérez facilement vos fiches de paie pour plusieurs entreprises à partir d’une seule plateforme intuitive.",
    icon: "fa-check-circle",
    /*img: require("./assets/simple/oneclick.jpg"),*/
    text: "Avec PayTrack, nous avons réduit le nombre d’étapes et de démarches au strict minimum. Nous vous proposons une application intelligente et fluide où vous n’avez pas besoin de saisir des informations compliquées ou de suivre des procédures longues.",
    text2: "Notre objectif est clair : maximiser votre productivité en minimisant votre charge de travail.",
  },
  {
    title: "Solutions fiables",
    description: "Nous vous offrons des solutions sécurisées et adaptées pour toutes les tailles d'entreprises.",
    icon: "fa-cogs",
    /*img: require("./assets/fiable/fiable.jpg"),*/
    text: "Nous proposons des solutions sécurisées, adaptées à toutes les tailles d'entreprises, pour garantir la protection de vos données et simplifier la gestion de vos fiches de paie.",
    text2: "Que vous soyez une petite entreprise ou une grande organisation, nos solutions sont conçues pour répondre à vos besoins spécifiques tout en assurant une sécurité maximale.",
  },
  {
    title: "Personnalisation complète",
    description: "Personnalisez vos modèles de fiches de paie selon les besoins spécifiques de votre entreprise.",
    icon: "fa-sliders-h",
    /*img: require("./assets/personaliser/personaliser1.jpg"),*/
    text: "Personnalisation complète signifie que vous pouvez adapter les modèles de fiches de paie selon les besoins de votre entreprise.",
    text2: "Cela permet à chaque entreprise de personnaliser ses fiches de paie selon ses préférences.",
  },
  {
    title: "Exportation facile",
    description: "Exportez vos données en PDF ou ZIP en quelques clics, pour un archivage facile et rapide.",
    icon: "fa-archive",
    /*img: require("./assets/exporte.jpg"),*/
    text: "Avec PayTrack, vous pouvez exporter vos données en quelques clics seulement.",
    text2: "Chaque année est exportée et sauvegardée dans un fichier ZIP spécifique.",
  },
  {
    title: "Sauvegarde automatique",
    description: "Avec PayTrack, vos données sont automatiquement sauvegardées pour garantir leur sécurité.",
    icon: "fa-save",
   /* img: require("./assets/automatiquer.jpg"),*/
    text: "Toutes les données que vous entrez sont enregistrées automatiquement.",
    text2: "Elles sont sécurisées et accessibles à tout moment.",
  },
  {
    title: "Sécurité renforcée",
    description: "Nous offrons un niveau de sécurité avancé pour protéger les informations sensibles de votre entreprise.",
    icon: "fa-lock",
    /*img: require("./assets/securitee.jpg"),*/
    text: "Il est important de chiffrer les fichiers avant de les stocker.",
    text2: "Utilisez des services de stockage avec chiffrement supplémentaire.",
  },
  {
    title: "Statistiques en temps réel",
    description: "Accédez à des statistiques détaillées sur toutes vos entreprises.",
    icon: "fa-chart-bar",
    /*img: require("./assets/statstiquer.jpg"),*/
    text: "Visualisation dynamique et actualisée des salaires nets mensuels.",
    text2: "Cela facilite la planification budgétaire.",
  },
  {
    title: "Pointage simplifié",
    description: "Importez facilement les heures de travail via des fichiers Excel ou saisissez-les manuellement.",
    icon: "fa-file-excel",
    /*img: require("./assets/excel.jpg"),*/
    text: "Méthode rapide, intuitive et efficace pour enregistrer les heures de travail.",
    text2: "Cela réduit les erreurs et améliore la gestion RH.",
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
    <div id="service-page">
      <section className="service-intro">
        <h1>Nos Services</h1>
        <p>
          Découvrez les services que nous proposons pour vous aider à gérer vos fiches de paie et bien plus encore.
        </p>
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
                <i className={`fa ${service.icon}`}></i> {service.title}
              </h2>
              <p>{service.description}</p>
              <p style={{ fontSize: "10px" }}>Cliquez pour plus d'informations</p>
            </div>
          ))}
        </section>
      </a>

      <div id="afficheservise">
        <div id="imgg">
          <img src={selectedService.img} alt="Service" />
        </div>
        <div id="part2">
          <section className="service-detail">
            <h2 className="titre">
              <i className={`fa ${selectedService.icon}`}></i> {selectedService.title}
            </h2>
            <br />
            <p>{selectedService.text}</p>
            <p>{selectedService.text2}</p>
          </section>
        </div>
      </div>

      <div className="circles-wrapper">
        {servicesData.map((_, i) => (
          <span key={i} className={`circle ${selectedServiceIndex === i ? "active-circle" : ""}`}></span>
        ))}
      </div>
    </div>
  );
};

export default Sante;
