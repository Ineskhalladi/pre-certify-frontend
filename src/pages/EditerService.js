import React, { useState} from "react";
import "../pages/AjouterService.css";
import { FaSyncAlt, FaSave } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { FaFolderPlus } from "react-icons/fa6";

import axios from "axios";
import { useNavigate,useLocation  } from "react-router-dom";
const EditerService = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [nom, setNom] = useState(location.state?.nom || "");
    const [actif, setActif] = useState(location.state?.actif || false);
    const id = location.state?._id;
  
    const enregistrerService = async () => {
      try {
        if (id) {
          await axios.put(`http://localhost:5000/api/auth/updateservice/${id}`, { nom, actif });
        } else {
          await axios.post("http://localhost:5000/api/auth/ajoutservice", { nom, actif });
        }
        navigate("/messervices");
      } catch (error) {
        console.error("Erreur lors de l'enregistrement :", error);
      }
    };
 
  return (
    <>
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Service</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaFolderPlus className="icon-search" />
    <h2>Editer service </h2>
  </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="form-ajout-responsable">
      
    <div className="form-col">
    <label>Nom</label>
            <input
              type="text"
              className="input-res"
              placeholder="Entrer le nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
    </div>
 
    <div className="form-col2">
      <label>Actif</label>
      <label className="switch">
              <input
                type="checkbox"
                checked={actif}
                onChange={() => setActif(!actif)}
              />
        <span className="slider round"></span>
      </label>
    </div>
 </div>



<div className="button-group">
    <button className="btn-search" onClick={enregistrerService}><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default EditerService ;
