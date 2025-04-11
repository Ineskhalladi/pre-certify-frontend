import React from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsEye, BsEyeSlash, BsInfoCircle } from "react-icons/bs";
import { VscFilePdf } from "react-icons/vsc";

const data = [
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
];
const BaseGenerale = () => {
  return (
    <>
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Base générale</h1>
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
    <h3 className="text-base"><FaFolderOpen /> Liste des Textes</h3>
    <div className="abbr"><strong>Abréviation</strong> <BsInfoCircle /></div>
  </div>

  <div className="search-avril">
    <label>Recherche texte Avril</label>
    <select className="text-avil">
      <option>--Texte Avril--</option>
    </select>
  </div>


      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Domaine</th>
            <th>Thème</th>
            <th>Sous thème</th>
            <th>Référence</th>
            <th>P/II</th>
            <th>A/M/C</th>
            <th>aim/c</th>
            <th>Année de publication</th>
            <th>Texte</th>
            <th>APP/N APP/Info</th>
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
              <td></td>
              <td>{row.year}</td>
              <td>{row.id === 3 ? <BsEyeSlash /> : <BsEye />}</td>
              <td><span className={`app-status ${row.app === "N APP" ? "not-app" : "app"}`}>
                 {row.app}
                 </span></td>
              <td>
                <VscFilePdf />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default BaseGenerale;
