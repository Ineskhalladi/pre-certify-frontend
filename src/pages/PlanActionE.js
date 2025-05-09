import React, { useState, useEffect} from "react";
import "../pages/PlanActionE.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import "../pages/PlanActionE.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const PlanActionE = () => {

  const [data, setData] = useState([
    {
      id: 1,
      action: "",
      responsbale: "",
      efficacité:"",
    statusAvant: "",
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
    
   
    
    return (
      <>
    
        <div className="base-container">
        <div className="search-container">
    <div className="header-top">
      <h1 className="titre-base">Mon plan d'action</h1>
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
    <h3 className="text-base"><FaFolderOpen />Plan d'action</h3>
    
  </div>
<div className="line-horiz"></div>


{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>

</div>

      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Responsable</th>
            <th>Référence</th>
            <th>Echéance</th>
            <th>Avancement</th>
            <th>Efficacité</th>
            <th>Conformité</th>
            <th>Editer</th>
          
        
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.action}</td>
              <td>{row.responsbale}</td>
              <td>
                {row.efficacité.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </td>
              <td></td>
              <td></td>
              <td></td>

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

export default PlanActionE;
