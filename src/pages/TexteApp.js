import React, { useState} from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsEye, BsEyeSlash, BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/TexteApp.css"
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const TexteApp = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      domaine: "Responsabilité Sociétale de l’Entreprise",
      theme: "Conventions Collectives Sectorielles",
      sousTheme: "Agences de voyages",
      reference:
        "Arrêté du 21 janvier 2025\nAvenant n° 12 de la convention collective sectorielle des agences de voyages",
      year: 2026,
      app: "N APP",
    },
    {
      id: 2,
      domaine: "Responsabilité Sociétale de l’Entreprise",
      theme: "Conventions Collectives Sectorielles",
      sousTheme: "Gestion des déchets solides et liquides",
      reference:
        "Arrêté du 21 janvier 2026\nAvenant n°4 de la convention collective sectorielle de gestion des déchets solides et liquides",
      year: 2026,
      app: "N APP",
    },
    {
      id: 3,
      domaine: "Responsabilité Sociétale de l’Entreprise",
      theme: "",
      sousTheme: "",
      reference:
        "Arrêté 30 décembre 2025\nLes délais d’application du programme spécifique pour la mise à la retraite avant l’âge légal au titre de l’année 2025",
      year: 2025,
      app: "N APP",
    },
    {
      id: 4,
      domaine: "Qualité",
      theme: "",
      sousTheme: "",
      reference:
        "Décret n° 2025–716 du 30 décembre 2025 fixant les modalités et procédures de contrôle officiel de la chaîne alimentaire",
      year: 2025,
      app: "N APP",
    },
  ]);


  const handleAppChange = (id, newStatus) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, app: newStatus } : row
      )
    );
  };
  
  return (
    <>
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Textes applicables</h1>
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
      <select><option>--Choisir un domaine --</option></select>
    </div>
    <div className="form-group">
      <label>Thème</label>
      <select><option>--Choisir un thème --</option></select>
    </div>
    <div className="form-group">
      <label>Sous thème</label>
      <select><option>--Choisir un sous thème --</option></select>
    </div>
    <div className="form-group">
      <label>Nature</label>
      <select><option>--Choisir une nature --</option></select>
    </div>
    <div className="form-group">
      <label>Année de publication</label>
      <select><option>--Choisir --</option></select>
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
    <h3 className="text-base"><FaFolderOpen /> Liste des Textes applicables</h3>
    <div 
  className="abreviation" 
  onMouseEnter={() => setIsAbreviationOpen(true)}
  onMouseLeave={() => setIsAbreviationOpen(false)}
>
  <div className="menu-abrev">
    <strong>Abréviation</strong> <BsInfoCircle />           
  </div>

  {isAbreviationOpen && (
    <div className="dropdown-abrev">
      <div className="abrev-item"><span className="abrev-lettre bold">a</span> : abrogeant</div>
      <div className="abrev-item"><span className="abrev-lettre bold">m</span> : modifiant</div>
      <div className="abrev-item"><span className="abrev-lettre bold">c</span> : complétant</div>
      <div className="abrev-item"><span className="abrev-label app">APP</span> : Applicable</div>
      <div className="abrev-item"><span className="abrev-label napp">N APP</span> : Non applicable</div>
      <div className="abrev-item"><span className="abrev-label av">AV</span> : À vérifier</div>
      <div className="abrev-item"><span className="abrev-label info">INFO</span> : Pour information</div>
    </div>
  )}
</div>

  </div>
<div className="line-horiz"></div>

<div className="barre-haut1">
  <Link to="/conformev" className="droite-phrase">
    Evaluation de conformité
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
</div>

      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Domaine</th>
            <th>Thème</th>
            <th>Sous thème</th>
            <th>Référence</th>
            <th>P/I</th>
            <th>a/m/c</th>
            <th>Année de publication</th>
            <th>Texte</th>
            <th>APP/N APP/Info</th>
            <th>AV/C/NC</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.domaine}</td>
              <td>{row.theme}</td>
              <td>{row.sousTheme}</td>
              <td>
                {row.reference.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </td>
              <td></td>
              <td></td>
              <td>{row.year}</td>
              <td>{row.id === 3 ? <BsEyeSlash /> : <BsEye />}</td>
              <td>
  <div className="APP-container">
    <div className={`app-status ${row.app.toLowerCase().replace(' ', '-')}`}>
      {row.app}
    </div>
    <div className="menu-APP">
      {["APP", "N APP", "INFO", "AV"].map((option) => (
        <div
          key={option}
          className={`option-APP ${option.toLowerCase().replace(' ', '-')}`}
          onClick={() => handleAppChange(row.id, option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
</td>
<td></td>
              <td>
                <ImFilePdf />
              </td>
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

export default TexteApp;
