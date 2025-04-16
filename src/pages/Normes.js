import React, { useState, useEffect } from "react";
import "../pages/Normes.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import { FaArrowUp , FaChevronUp, FaChevronDown  } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";

const rawNormesData = [
  { id: 1, title: 'ISO 13485', desc: 'Gestion de la qualité pour les dispositifs médicaux', detail: 'Spécifie les exigences pour un système de management de la qualité propre aux dispositifs médicaux.' },
  { id: 2, title: 'ISO 14971', desc: 'Gestion des risques pour les dispositifs médicaux', detail: 'Fournit un cadre pour l’identification, l’évaluation et la maîtrise des risques liés aux dispositifs médicaux.' },
  { id: 3, title: 'ISO 9001', desc: 'Système de gestion de la qualité', detail: 'Norme générique de management de la qualité, adaptée ici pour améliorer les services, la satisfaction client et la conformité.' },
  { id: 4, title: 'ISO 15189', desc: 'Exigences de qualité et de compétence dans les laboratoires médicaux', detail: 'Établit les exigences spécifiques de qualité et de compétence pour les laboratoires médicaux.' },
  { id: 5, title: 'ISO/IEC 27001', desc: "Système de gestion de la sécurité de l'information", detail: 'Décrit les exigences pour un système de gestion de la sécurité de l’information (SMSI).' },
  { id: 6, title: 'ISO/IEC 27002', desc: "Code de bonnes pratiques pour la gestion de la sécurité de l'information", detail: 'Propose des lignes directrices et bonnes pratiques pour renforcer la sécurité de l’information.' },
  { id: 7, title: 'ISO/IEC 20000-1', desc: 'Gestion des services IT', detail: 'Norme pour la gestion de services informatiques selon une approche structurée et orientée client.' },
  { id: 8, title: 'ISO 14001', desc: 'Gestion environnementale', detail: 'Norme pour la mise en place d’un système de management environnemental.' },
  { id: 9, title: 'ISO 22000', desc: 'Système de gestion de la sécurité alimentaire', detail: 'Système de gestion de la sécurité des denrées alimentaires.' },
  { id: 10, title: 'ISO 26000', desc: 'Responsabilité sociétale des entreprises', detail: 'Guide sur la responsabilité sociétale des entreprises (RSE).' },
  { id: 11, title: 'ISO 50001', desc: "Gestion de l'énergie", detail: 'Fournit un cadre pour gérer et améliorer la performance énergétique.' },
  { id: 12, title: 'ISO 41001', desc: 'Gestion des installations', detail: 'Norme dédiée à la gestion des installations (facility management).' },
  { id: 13, title: 'ISO 31000', desc: 'Gestion des risques', detail: 'Fournit les principes et lignes directrices pour la gestion des risques.' },
  { id: 14, title: 'ISO 45001', desc: 'Système de gestion de la santé et de la sécurité au travail', detail: 'Spécifie les exigences pour un système de gestion de la santé et sécurité au travail.' },
  { id: 15, title: 'ISO 22301', desc: 'Gestion de la continuité des activités', detail: 'Norme de gestion de la continuité d’activité en cas de crise ou interruption.' },
  { id: 16, title: 'ISO 39001', desc: 'Gestion de la sécurité routière', detail: 'Concerne les systèmes de gestion pour améliorer la sécurité routière.' },
  { id: 17, title: 'ISO 28000', desc: "Système de gestion de la sécurité de la chaîne d'approvisionnement", detail: 'Traite de la sécurité dans la chaîne d’approvisionnement.' },
  { id: 18, title: 'ISO 6165', desc: 'Terminologie des équipements de transport', detail: 'Définit la terminologie normalisée pour les équipements de transport.' },
  { id: 19, title: 'ISO 14064', desc: 'Gestion des émissions de gaz à effet de serre', detail: 'Spécifie les principes pour la quantification et le reporting des émissions de gaz à effet de serre.' },
  { id: 20, title: 'ISO 55001', desc: 'Gestion des actifs pour les infrastructures énergétiques', detail: 'Norme pour la gestion stratégique des actifs (infrastructures, équipements) dans l’énergie.' },
  { id: 21, title: 'ISO 21542', desc: 'Accessibilité des bâtiments et environnements bâtis', detail: 'Norme sur l’accessibilité des bâtiments pour les personnes à mobilité réduite.' },
  { id: 22, title: 'ISO 30415', desc: "Gestion de la diversité et de l'inclusion en entreprise", detail: 'Cadre pour promouvoir la diversité et l’inclusion dans le management des ressources humaines.' },
  { id: 23, title: 'ISO 14046', desc: "Évaluation de l'empreinte eau des produits, processus et organisations", detail: 'Évalue l’empreinte eau des produits, processus ou systèmes.' },
  { id: 24, title: 'ISO 14025', desc: 'Étiquetage environnemental des produits', detail: 'Donne les règles pour un étiquetage environnemental basé sur des déclarations vérifiables.' },
  { id: 25, title: 'ISO 17025', desc: 'Compétence des laboratoires d’essai et d’étalonnage', detail: 'Définit les exigences pour les laboratoires d’essais et de calibration.' },
  { id: 26, title: 'ISO 19650', desc: "Gestion de l'information dans les projets de construction avec le BIM", detail: 'Gère l’information dans les projets utilisant le BIM (modélisation des données du bâtiment).' },
  { id: 27, title: 'ISO 3834', desc: 'Exigences pour la qualité en soudage', detail: 'Garantit la qualité du soudage dans les procédés de fabrication.' },
  { id: 28, title: 'ISO 17296', desc: 'Fabrication additive - Guide et exigences', detail: 'Norme dédiée à la fabrication additive (impression 3D industrielle).' },
  { id: 29, title: 'ISO 10816', desc: 'Vibration des machines et équipement industriel', detail: 'Mesure et contrôle les vibrations dans les équipements mécaniques.' },
];

  const normesData = Array.from(
    new Map(rawNormesData.map((item) => [item.title, item])).values()
  );

const Normes = () => {
  const [showButton, setShowButton] = useState(false);
  const [openCard, setOpenCard] = useState(null);
  const [visibleCount, setVisibleCount] = useState(7); // Affiche 4+3 au début
const [cardsPerClick] = useState(8); // Charge 2 lignes à chaque clic

const loadMore = () => {
  setVisibleCount((prev) => Math.min(prev + cardsPerClick, normesData.length));
};


  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const toggleCard = (id) => {
    setOpenCard(openCard === id ? null : id);
  };

  
  return (
    <div className="contact-container">
      <section className="normesH-section">
        <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
        <div className="content-normesH">
          <h2>Normes</h2>
          <img src={line} className="line-normes" alt="Ligne décorative" />
          <p>
            Lorem ipsum dolor sit amet. In voluptas rerum aut voluptatem et quia natus qui
            perferendis soluta.
          </p>
        </div>
        <img src={flechet} className="fleche fleche2" alt="Flèche droite" />
      </section>
      <section className="normesH-section2">
        <h2 className="titre-normesH">Avantages des normes ISO</h2>
        <p className="normesH-description0">
        L’ISO a été fondée avec l’idée de répondre à une question fondamentale : « Quelle est la meilleure façon de procéder ? »
        </p>
        <p className="normesH-description">
        Cela a commencé avec des choses évidentes comme les poids et les mesures, et au cours des 50 dernières années, s’est développé pour devenir une famille de normes qui couvrent tout, des chaussures que nous portons aux réseaux Wi-Fi qui nous connectent de manière invisible les uns aux autres.
        </p>
        <p className="normesH-description">
        Pour répondre à tous ces problèmes et à bien d’autres encore, les Normes internationales permettent aux consommateurs d’avoir l’assurance que leurs produits sont sûrs, fiables et de bonne qualité. Les normes ISO sur la sécurité routière, la sécurité des jouets et les emballages médicaux sécurisés ne sont que quelques-unes de celles qui contribuent à rendre le monde plus sûr.
        </p>
        <p className="normesH-description">
        Les organismes de réglementation et les gouvernements comptent sur les normes ISO pour les aider à élaborer une meilleure réglementation, sachant qu’elles reposent sur des bases solides grâce à l’implication d’experts établis à l’échelle mondiale.
        </p>
        <p className="normesH-description">
        C’est dans cette logique que s’inscrit la <strong> norme ISO 25800 </strong>, dont les lignes directrices en matière de responsabilité sociétale touchent presque tous les aspects de la vie quotidienne et accompagnent les entreprises, grandes et petites, vers des pratiques plus durables. Avec des normes internationales sur la qualité de l’air, de l’eau et du sol, sur les émissions de gaz et de radiations, et les aspects environnementaux des produits, elles protègent la santé de la planète et des personnes, au-delà des avantages économiques.
        </p>
        </section>
        <section className="les-normes">
        <h2>Des normes de pointe</h2>
        <div className="gridH-row">
  {normesData.slice(0, visibleCount).map((norme, index) => (
    <div
      key={norme.id}
      className={`card-normeH ${index % 7 < 4 ? "row-of-4" : "row-of-3"}`}
    >
      <div className="card-contentH">
        <div className="left-side">
          <h3 className="iso-titleH">{norme.title}</h3>
          <p className="descr-normesH">{norme.desc}</p>
        </div>
        <div className="right-side">
          <div className="btn-lire" onClick={() => toggleCard(norme.id)}>
            {openCard === norme.id ? <FaChevronDown/> : <FaChevronUp/>}
          </div>
        </div>
      </div>
      {openCard === norme.id && (
        <p className="detail-normeH">{norme.detail}</p>
      )}
    </div>
  ))}

  {/* Bouton de chargement si on n’a pas tout affiché */}
  {visibleCount < normesData.length && (
    <div className="card-normeH load-moreH" onClick={loadMore}>
      <BiPlus className="plusH" />
      <p>Charger plus</p>
    </div>
  )}
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

export default Normes;
