import React, { useState, useEffect } from "react";
import "../pages/Normes.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import { FaArrowUp , FaChevronUp, FaChevronDown  } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import iso from "../assets/img iso 1.png";

const rawNormesData = [
  { id: 1, title: 'ISO 13485', desc: 'Gestion de la qualité pour les dispositifs médicaux', detail: 'La norme ISO 13485 définit un cadre spécifique pour garantir la qualité dans la conception, la fabrication et la distribution des dispositifs médicaux. Elle spécifie les exigences pour un système de management de la qualité propre aux dispositifs médicaux.' },
  { id: 2, title: 'ISO 14971', desc: 'Gestion des risques pour les dispositifs médicaux', detail: 'ISO 14971 fournit une approche structurée pour identifier, évaluer et maîtriser les risques liés à l’utilisation des dispositifs médicaux, assurant ainsi leur sécurité tout au long de leur cycle de vie.' },
  { id: 3, title: 'ISO 9001', desc: 'Système de gestion de la qualité', detail: 'Reconnue mondialement, la norme ISO 9001 aide les organisations à améliorer la qualité de leurs produits et services. Elle définit les exigences pour un système de management de la qualité axé sur la satisfaction client et l’amélioration continue.' },
  { id: 4, title: 'ISO 15189', desc: 'Exigences de qualité et de compétence dans les laboratoires médicaux', detail: 'ISO 15189 s’applique aux laboratoires médicaux et établit des exigences pour garantir la qualité et la compétence dans les services d’analyse médicale.' },
  { id: 5, title: 'ISO/IEC 27001', desc: "Système de gestion de la sécurité de l'information", detail: 'Cette norme établit les exigences pour mettre en œuvre un système de gestion de la sécurité de l’information (SMSI), visant à protéger les données sensibles des entreprises.' },
  { id: 6, title: 'ISO/IEC 27002', desc: "Code de bonnes pratiques pour la gestion de la sécurité de l'information", detail: 'Complémentaire à la norme ISO 27001, elle fournit des lignes directrices pratiques pour la mise en œuvre des contrôles de sécurité de l’information.' },
  { id: 7, title: 'ISO/IEC 20000-1', desc: 'Gestion des services IT', detail: 'Cette norme encadre la gestion des services informatiques en assurant qualité, efficacité et amélioration continue dans le delivery des services IT.' },
  { id: 8, title: 'ISO 14001', desc: 'Gestion environnementale', detail: 'ISO 14001 fournit un cadre pour la mise en place d’un système de management environnemental, aidant les entreprises à réduire leur impact écologique.' },
  { id: 9, title: 'ISO 22000', desc: 'Système de gestion de la sécurité alimentaire', detail: 'Elle définit les exigences pour un système de management garantissant la sécurité des denrées alimentaires tout au long de la chaîne de production.' },
  { id: 10, title: 'ISO 26000', desc: 'Responsabilité sociétale des entreprises', detail: 'ISO 26000 propose des lignes directrices sur la responsabilité sociétale des organisations, les incitant à adopter un comportement éthique et transparent.' },
  { id: 11, title: 'ISO 50001', desc: "Gestion de l'énergie", detail: 'Cette norme aide les organisations à mettre en œuvre un système de management de l’énergie afin d’améliorer leur performance énergétique de façon durable.' },
  { id: 12, title: 'ISO 41001', desc: 'Gestion des installations', detail: 'Elle établit les principes de gestion des installations (facility management) pour améliorer l’efficacité des environnements bâtis.' },
  { id: 13, title: 'ISO 31000', desc: 'Gestion des risques', detail: 'ISO 31000 fournit des principes généraux et des lignes directrices pour la gestion des risques dans tous les types d’organisations.' },
  { id: 14, title: 'ISO 45001', desc: 'Système de gestion de la santé et de la sécurité au travail', detail: 'Cette norme internationale vise à améliorer la sécurité des employés, à réduire les risques sur le lieu de travail et à créer de meilleures conditions de travail.' },
  { id: 15, title: 'ISO 22301', desc: 'Gestion de la continuité des activités', detail: 'ISO 22301 définit les exigences pour planifier, établir, mettre en œuvre et maintenir un système de gestion de la continuité d’activité face aux incidents.' },
  { id: 16, title: 'ISO 39001', desc: 'Gestion de la sécurité routière', detail: 'Cette norme vise à améliorer la sécurité routière en réduisant le nombre de décès et de blessures graves liés aux accidents de la route.' },
  { id: 17, title: 'ISO 28000', desc: "Système de gestion de la sécurité de la chaîne d'approvisionnement", detail: 'Elle traite de la sécurité dans toutes les phases de la chaîne logistique, en évaluant et en contrôlant les risques.' },
  { id: 18, title: 'ISO 6165', desc: 'Terminologie des équipements de transport', detail: 'La norme ISO 6165 établit une terminologie normalisée pour les équipements utilisés dans le secteur du transport.' },
  { id: 19, title: 'ISO 14064', desc: 'Gestion des émissions de gaz à effet de serre', detail: 'ISO 14064 fournit des outils pour la quantification, le suivi et le reporting des émissions de gaz à effet de serre.' },
  { id: 20, title: 'ISO 55001', desc: 'Gestion des actifs pour les infrastructures énergétiques', detail: 'Cette norme propose un cadre pour une gestion stratégique et efficace des actifs, notamment dans le secteur de l’énergie.' },
  { id: 21, title: 'ISO 21542', desc: 'Accessibilité des bâtiments et environnements bâtis', detail: 'Elle définit des exigences pour améliorer l’accessibilité physique des bâtiments aux personnes en situation de handicap.' },
  { id: 22, title: 'ISO 30415', desc: "Gestion de la diversité et de l'inclusion en entreprise", detail: 'Cette norme aide les entreprises à intégrer la diversité, l’équité et l’inclusion dans leurs pratiques de gestion des ressources humaines.' },
  { id: 23, title: 'ISO 14046', desc: "Évaluation de l'empreinte eau des produits, processus et organisations", detail: 'ISO 14046 fournit des principes pour évaluer et déclarer l’empreinte eau des produits, services ou organisations.' },
  { id: 24, title: 'ISO 14025', desc: 'Étiquetage environnemental des produits', detail: 'Elle définit les règles pour les déclarations environnementales de type III, basées sur des données vérifiables et transparentes.' },
  { id: 25, title: 'ISO 17025', desc: 'Compétence des laboratoires d’essai et d’étalonnage', detail: 'Cette norme établit les exigences pour garantir la compétence des laboratoires d’essais et de calibration.' },
  { id: 26, title: 'ISO 19650', desc: "Gestion de l'information dans les projets de construction avec le BIM", detail: 'Elle fournit une approche structurée pour gérer l’information dans les projets de construction en utilisant la modélisation des données du bâtiment (BIM).' },
  { id: 27, title: 'ISO 3834', desc: 'Exigences pour la qualité en soudage', detail: 'ISO 3834 définit les exigences relatives à la qualité dans les procédés de soudage par fusion des matériaux métalliques.' },
  { id: 28, title: 'ISO 17296', desc: 'Fabrication additive - Guide et exigences', detail: 'Cette norme encadre les processus de fabrication additive, notamment l’impression 3D, en termes de qualité, documentation et bonnes pratiques.' },
  { id: 29, title: 'ISO 10816', desc: 'Vibration des machines et équipement industriel', detail: 'Elle propose des lignes directrices pour la mesure et l’évaluation des vibrations mécaniques dans les équipements industriels.' },
  { id: 30, title: 'ISO 21001', desc: 'Système de management des organismes d’éducation', detail: 'La norme ISO 21001 établit les exigences pour un système de management dédié aux établissements d’enseignement, visant à améliorer les processus éducatifs et répondre aux besoins des apprenants.' }
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
        <div className="container-avant-iso">
      <div className="avantages">
        <p className="normesH-description0">
        L’ISO a été fondée avec l’idée de répondre à une question fondamentale : « Quelle est la meilleure façon de procéder ? »
        </p>
        <p>
        Cela a commencé avec des choses évidentes comme les poids et les mesures, et au cours des 50 dernières années, s’est développé pour devenir une famille de normes qui couvrent tout, des chaussures que nous portons aux réseaux Wi-Fi qui nous connectent de manière invisible les uns aux autres.
        </p>
        <p>
        Pour répondre à tous ces problèmes et à bien d’autres encore, les Normes internationales permettent aux consommateurs d’avoir l’assurance que leurs produits sont sûrs, fiables et de bonne qualité. Les normes ISO sur la sécurité routière, la sécurité des jouets et les emballages médicaux sécurisés ne sont que quelques-unes de celles qui contribuent à rendre le monde plus sûr.
        </p>
        <p>
        Les organismes de réglementation et les gouvernements comptent sur les normes ISO pour les aider à élaborer une meilleure réglementation, sachant qu’elles reposent sur des bases solides grâce à l’implication d’experts établis à l’échelle mondiale.
        </p>
        <p>
        C’est dans cette logique que s’inscrit la <strong> norme ISO 25800 </strong>, dont les lignes directrices en matière de responsabilité sociétale touchent presque tous les aspects de la vie quotidienne et accompagnent les entreprises, grandes et petites, vers des pratiques plus durables. Avec des normes internationales sur la qualité de l’air, de l’eau et du sol, sur les émissions de gaz et de radiations, et les aspects environnementaux des produits, elles protègent la santé de la planète et des personnes, au-delà des avantages économiques.
        </p>
        </div>
        <div className="img-iso">
        <img src={iso}></img>
        </div>
        </div>
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
