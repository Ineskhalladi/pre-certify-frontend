import React, { useState } from "react";
import "../pages/MesUtilisateurs.css";
import {  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";


const MesServices = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
     
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Utilisateurs</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des Utilisateurs</h2>
          </div>
        </div>
        <div className="line-horiz-compte"></div>

       <div className="content-uti">
    <label htmlFor="searchInput" className="label-recherche1">Recherche :</label>
    <input
      type="text"
      id="searchInput"
       className="search-res1"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
 
</div>


 <table className="responsables-table">
         <thead>
         <tr>
              <th>Référence</th>
              <th>Echéance</th>
              <th>Raison social</th>
              <th>responsable abonnement</th>
              <th>responsable veille</th>
              <th>Email</th>
              <th>Etat</th>
              <th>Actions</th>


            </tr>
         </thead>
         <tbody>
            <tr>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           <td></td>
           </tr>
         </tbody>
       </table>

       <div className="pagination-container">
  <ul className="pagination">
    <li className="btn-item">Précédent</li>
    <li className="btn-item active">1</li>
    <li className="btn-item">Suivant</li>
    <li className="btn-item">Fin</li>
  </ul>
</div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default MesServices;
