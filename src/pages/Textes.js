import React, { useState, useEffect} from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt, FaUser, FaSave, FaFolderOpen, FaPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BiEdit, BiTrash } from "react-icons/bi";
const Textes = () => {

  
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [responsables, setResponsables] = useState([]);
  
  

    
    return (
      <>
        <NavBar2 />
        <div className="base-container">
          <div className="search-container">
            <div className="header-top">
              <h1 className="titre-base">Textes</h1>
              <div className="icon-actions">
                <span className="icon-base" title="Réduire">─</span>
                <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
                <span className="icon-base" title="Agrandir">⛶</span>
              </div>
            </div>
  
            <div className="titre-multicritere">
              <FaFolderOpen className="icon-res" />
              <h2>Liste des textes</h2>
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
    <button className="add-res" onClick={() => navigate("/ajoutetexte")}>
    <FaPlus />
  </button>
  </div>
  
  
   <table className="responsables-table">
           <thead>
           <tr>
                <th>Domaine</th>
                <th>Theme</th>
                <th>Sous theme</th>
                <th>Nature</th>
                <th>Réference</th>
                <th>Action</th>

              </tr>
           </thead>
           <tbody>
      
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>

        <td>
          <div className="action-icones">
            <BiEdit  />
            <BiTrash  />
          </div>
        </td>
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
  
  export default Textes;
  