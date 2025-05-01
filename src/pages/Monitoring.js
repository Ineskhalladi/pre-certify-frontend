import React, { useState} from "react";
import "../pages/Monitoring.css";
import {FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";

const Monitoring = () => {
  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

  
  return (
    <>
     
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Monitoring</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
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
      <strong>Codes Couleurs</strong> <BsInfoCircle />           
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
    </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="content-res">
       <div className="search-label-group">
         <label htmlFor="searchInput" className="label-recherche">Recherche :</label>
         <input
           type="text"
           id="searchInput"
            className="search-res"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
     </div>
     <table>
          <thead>
            <tr>
              <th>Parametre</th>
              <th>Référence</th>
              <th>Juill-2025</th>
              <th>Aout-2025</th>
              <th>Sep-2025</th>
              <th>Oct-2025</th>
              <th>Nov-2025</th>
              <th>Dec-2025</th>
            </tr>
          </thead>
          <tbody>
        
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
                <td></td>
                
              </tr>
        
          </tbody>
        </table>
  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default Monitoring;
