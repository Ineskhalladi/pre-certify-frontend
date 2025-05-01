import React, { useState, useEffect} from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/ConformeV.css"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ConformeV = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      theme: "Conventions Collectives Sectorielles",
      sousTheme: "Agences de voyages",
      reference:
        "Arrêté du 21 janvier 2025\nAvenant n° 12 de la convention collective sectorielle des agences de voyages",
      statusAvant: "",
      statusApres: "",
    },
    {
      id: 2,
      theme: "Conventions Collectives Sectorielles",
      sousTheme: "Gestion des déchets solides et liquides",
      reference:
        "Arrêté du 21 janvier 2026\nAvenant n°4 de la convention collective sectorielle de gestion des déchets solides et liquides",
      statusAvant: "",
      statusApres: "",
    },
    {
      id: 3,
      theme: "",
      sousTheme: "",
      reference:
        "Arrêté 30 décembre 2025\nLes délais d’application du programme spécifique pour la mise à la retraite avant l’âge légal au titre de l’année 2025",
      statusAvant: "",
      statusApres: "",
    },
    {
      id: 4,
      theme: "",
      sousTheme: "",
      reference:
        "Décret n° 2025–716 du 30 décembre 2025 fixant les modalités et procédures de contrôle officiel de la chaîne alimentaire",
      statusAvant: "",
      statusApres: "",
    },
  ]);
  


  const handleStatusChange = (id, newStatus, champ) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, [champ]: newStatus } : row
      )
    );
  };
  

  const [domaines, setDomaines] = useState([]);
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [natures, setNatures] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [sousThemes, setSousThemes] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id; // ou decoded._id selon ton backend
  
        axios
          .get(`http://localhost:5000/api/auth/user/${userId}/domaines`)
          .then((res) => {
            setDomaines(res.data);
          })
          .catch((err) => {
            console.error("Erreur lors du chargement des domaines :", err);
          });
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    } else {
      console.warn("Token non trouvé dans le localStorage");
    }
  }, []);
  
  useEffect(() => {
    if (selectedDomaine) {
      axios.get(`http://localhost:5000/api/auth/themes/byDomaine/${selectedDomaine}`)
        .then(res => {
          setThemes(res.data); // On suppose que res.data est un tableau de thèmes
        })
        .catch(err => console.error("Erreur lors du chargement des thèmes :", err));
    } else {
      setThemes([]); // Vide si aucun domaine sélectionné
    }
  }, [selectedDomaine]);
  
  useEffect(() => {
    if (selectedTheme) {
      axios.get(`http://localhost:5000/api/auth/sousthemes/byTheme/${selectedTheme}`)
        .then(res => {
          setSousThemes(res.data);
        })
        .catch(err => console.error("Erreur lors du chargement des sous-thèmes :", err));
    } else {
      setSousThemes([]);
    }
  }, [selectedTheme]);
  
  return (
    <>
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Evaluation de Conformité</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaSearch className="icon-search" />
    <h2>Recherche Multicritères</h2>
  </div>

<div className="base-rech">
  <div className="filters">
    <div className="form-group">
      <label>Domaine</label>
      <select value={selectedDomaine} onChange={(e) => {
  const selectedId = e.target.value;
  setSelectedDomaine(selectedId);

  // Trouve le domaine sélectionné
  const domaineChoisi = domaines.find(d => d._id === selectedId);
  // Mets à jour la liste des natures
  setNatures(domaineChoisi ? domaineChoisi.nature : []);

}}>
  <option value="">--Choisir un domaine--</option>
  {domaines.map((domaine) => (
    <option key={domaine._id} value={domaine._id}>
      {domaine.nom}
    </option>
  ))}
</select>
    </div>
    <div className="form-group">
      <label>Thème</label>
      <select onChange={(e) => setSelectedTheme(e.target.value)}>
  <option value="">--Choisir un thème--</option>
  {themes.map((theme, index) => (
    <option key={index} value={theme._id}>
      {theme.nom}
    </option>
  ))}
</select>
   </div>
    <div className="form-group">
      <label>Sous thème</label>
      <select>
  <option>--Choisir un sous thème --</option>
  {sousThemes.map((sousTheme, index) => (
    <option key={index} value={sousTheme._id}>
      {sousTheme.nom}
    </option>
  ))}
</select>    </div>
    <div className="form-group">
      <label>Nature</label>
      <select>
  <option>--Choisir une nature --</option>
  {natures.map((nature, idx) => (
    <option key={idx} value={nature}>{nature}</option>
  ))}
</select>
    </div>

    <div className="form-group">
      <label>Mot clé</label>
      <input type="text" placeholder="" />
    </div>
  </div>

  <div className="button-group">
    <button className="btn-search"><FaSearch /> Recherche</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>
</div>

        <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Liste des Textes pour évaluation de conformité</h3>
    <div 
  className="abreviation" 
  onMouseEnter={() => setIsAbreviationOpen(true)}
  onMouseLeave={() => setIsAbreviationOpen(false)}
>
  <div className="menu-abrev2">
    <strong>Abréviation</strong> <BsInfoCircle />           
  </div>

  {isAbreviationOpen && (
    <div className="dropdown-abrev2">
      <div className="abrev-item2"><span className="abrev-label c">C</span> : Conforme</div>
      <div className="abrev-item2"><span className="abrev-label avc">AV</span> : A vérifier</div>
      <div className="abrev-item2"><span className="abrev-label nc">NC</span> : Non confrome</div>
    </div>
  )}
</div>

  </div>
<div className="line-horiz"></div>

<div className="barre-haut">
  <Link to="/texteapp" className="gauche-phrase">
    <FiArrowLeft className="icon-app" />
   Textes applicables
  </Link>
  <Link to="/planactionv" className="droite-phrase">
    Mon plan d'action
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
  <button className="exp-pdf">Sauvegarder dans historique<RiRefreshLine /></button>

</div>

      <table>
        <thead>
          <tr>
            <th>Thème</th>
            <th>Sous thème</th>
            <th>Référence</th>
            <th>AV/C/NC</th>
            <th>Exigences</th>
            <th>AV/C/NC</th>
            <th>Constat</th>
            <th>Preuve</th>
            <th>Ajouter monitorning</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.theme}</td>
              <td>{row.sousTheme}</td>
              <td>
                {row.reference.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </td>
              <td>
  <div className="Status-container">
  <div className={`status-label status-${row.statusAvant?.toLowerCase()}`}>
  {row.statusAvant}
</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
    onClick={() => handleStatusChange(row.id, option, "statusAvant")}
  >
    {option}
  </div>
))}

    </div>
  </div>
</td>



              <td></td>
              <td>
  <div className="Status-container">
  <div className={`status-label status-${row.statusAvant?.toLowerCase()}`}>
  {row.statusApres}
</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
    onClick={() => handleStatusChange(row.id, option, "statusAvant")}
  >
    {option}
  </div>
))}

    </div>
  </div>
</td>

              <td></td>
              <td> <ImFilePdf /></td>
              <td><input className="boxC" type="checkbox"/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
  <ul className="pagination">
    <li className="btn-item">Précédent</li>
    <li className="btn-item active">1</li>
    <li className="btn-item">2</li>
    <li className="btn-item">3</li>
    <li className="btn-item">Suivant</li>
    <li className="btn-item">Fin</li>
  </ul>
</div>

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default ConformeV;
