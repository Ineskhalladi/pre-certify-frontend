import React from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt, FaRegFileAlt, FaDownload, FaInfoCircle, FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";

const SearchFilters = () => {
  return (
    <div className="search-container">
      <h2 className="titre-base">🔍 Recherche Multicritères</h2>
      <div className="filters">
        <select>
          <option>--Choisir un domaine--</option>
        </select>
        <select>
          <option>--Choisir un thème--</option>
        </select>
        <select>
          <option>--Choisir un sous-thème--</option>
        </select>
        <select>
          <option>--Choisir une nature--</option>
        </select>
        <select>
          <option>--Choisir une année--</option>
        </select>
        <input type="text" placeholder="Mot clé" />
        <button className="btn-search"><FaSearch /> Recherche</button>
        <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
      </div>
    </div>
  );
};

const TextList = () => {
  return (
    <div className="text-list-container">
      <h3 className="text-base"><FaFolderOpen /> Liste des Textes</h3>
      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Domaine</th>
            <th>Thème</th>
            <th>Sous-thème</th>
            <th>Référence</th>
            <th>P/II</th>
            <th>A/M/C</th>
            <th>alm/c</th>
            <th>Année de publication</th>
            <th>Texte</th>
            <th>APP/N APP/Info <FaInfoCircle /></th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Responsabilité Sociétale de l'Entreprise</td>
            <td>Conventions Collectives Sectorielles</td>
            <td>Agences de voyages</td>
            <td>Arrêté du 21 janvier 2025</td>
            <td></td>
            <td></td>
            <td></td>
            <td>2026</td>
            <td><FaRegFileAlt /></td>
            <td>N APP</td>
            <td><FaDownload /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const  BaseGenerale = () => {
  return (
    <>
    <NavBar2/>

    <div className="page-container">
      <SearchFilters />
      <TextList />
    </div>
    </>
  );
};

export default BaseGenerale;
