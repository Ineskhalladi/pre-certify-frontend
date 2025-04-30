import React, { useEffect, useState} from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
const AjouteTexte = () => {
 
  const navigate = useNavigate();
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
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Texte</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaUserPlus className="icon-res" />
    <h2>Ajouter Texte </h2>
  </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="form-compte">
    
    <label>Secteurs</label>
    <select className="input-compte-select">
    <option value="">-- Choisir un secteur --</option>
                <option value="Sante">Santé</option>
                <option value="Informatique">Informatique et technologies connexes</option>
                <option value="gestion">Gestion et services</option>
                <option value="securite">Sécurité et risque</option>
                <option value="transport">Transport</option>
                <option value="energie">Énergie</option>
                <option value="diversite">Diversité et inclusion</option>
                <option value="durabilite">Durabilité environnementale</option>
                <option value="alimentation">Alimentation et agriculture</option>
                <option value="materiels">Matériels</option>
                <option value="batiment">Bâtiment et construction</option>
                <option value="ingenierie">Ingénierie</option>
    </select>

    <label>Domaine</label>
    <select className="input-compte-select">
      <option value="">-- Sélectionner le domaine --</option>
    </select>

      <label>Thème</label>
      <select className="input-compte-select" onChange={(e) => setSelectedTheme(e.target.value)}>
  <option value="">--Choisir un thème--</option>
  {themes.map((theme, index) => (
    <option key={index} value={theme._id}>
      {theme.nom}
    </option>
  ))}
</select>

      <label>Sous thème</label>
      <select className="input-compte-select">
  <option>--Choisir un sous thème --</option>
  {sousThemes.map((sousTheme, index) => (
    <option key={index} value={sousTheme._id}>
      {sousTheme.nom}
    </option>
  ))}
</select>    
      <label>Nature</label>
      <select className="input-compte-select">
  <option>--Choisir une nature --</option>
  {natures.map((nature, idx) => (
    <option key={idx} value={nature}>{nature}</option>
  ))}
</select>
<label>Texte</label>
    <textarea className="input-compte" placeholder="Ajouter le texte"  />
    <input type="file"  className="input-compte"/>
 
  </div>
 

<div className="button-group">
    <button className="btn-search"><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default AjouteTexte ;
