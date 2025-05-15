import React, { useState, useEffect} from "react";
import "../pages/ConformeE.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import "../pages/ConformeV.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ConformeE = () => {


  const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesNormaux, setTextesNormaux] = useState([]);

  useEffect(() => {
    const fetchTextes = async () => {
      try {
        console.log("📥 Début récupération des textes");
  
        const token = localStorage.getItem("token");
        if (!token) throw new Error("❌ Aucun token trouvé");
  
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        console.log("✅ ID utilisateur :", userId);
  
        const entrepriseData = JSON.parse(localStorage.getItem("entrepriseToken"));
        const identre = entrepriseData.identre;
        console.log("🏢 ID entreprise :", identre);
  
        const textesRes = await axios.get("http://localhost:5000/api/auth/alltexte");
        const allTextes = textesRes.data;
        console.log("📚 Tous les textes :", allTextes);
  
  
        // ✅ Récupérer les textes cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${identre}`);
        const texteIDs = textesCochesRes.data.textes || [];
        console.log("☑️ IDs des textes cochés :", texteIDs);

// ✅ Tous les textes de type "exigence"
const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase() === "exigence");
console.log("📄 Tous les textes normaux :", textesNormaux);
setTextesNormaux(textesNormaux);

// ✅ Filtrer uniquement les textes cochés avec type "exigence"
const textesFiltres = textesNormaux.filter((texte) => texteIDs.includes(texte._id));

// ✅ Récupérer les états des textes
const textesApplicableRes = await axios.get(`http://localhost:5000/api/auth/exall/${identre}`);
const textesApplicable = textesApplicableRes.data || [];
console.log("📄 États des textes exigences :", textesApplicable);

        // ✅ Fusionner avec état
        const textesAvecEtat = textesFiltres.map((texte) => {
          const match = textesApplicable.exigences.find((t) => t.texteId === texte._id);
          return {
            ...texte,
            etat: match?.etat || "APP"
          };
        });
  
        // ✅ State final
        setCheckedTextes(textesAvecEtat);
  
      } catch (err) {
        console.error("❌ Erreur :", err.message);
        alert("Erreur lors du chargement des textes");
      }
    };
  
    fetchTextes();
  }, []);
  


  // 1. Pour les domaines
const [domainesParSecteur, setDomainesParSecteur] = useState({});
const fetchDomainesBySecteur = async (secteurId) => {
  if (domainesParSecteur[secteurId]) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/domaines/bySecteur/${secteurId}`);
    setDomainesParSecteur(prev => ({
      ...prev,
      [secteurId]: res.data,
    }));
  } catch (error) {
    console.error("Erreur chargement domaines du secteur :", error);
  }
};
const Comparedomaine = (domaineId, secteurId) => {
  const domaines = domainesParSecteur[secteurId];
  if (!domaines) {
    fetchDomainesBySecteur(secteurId);
    return "Chargement domaine...";
  }
  const domaine = domaines.find((d) => d._id === domaineId);
  return domaine ? domaine.nom : "Domaine inconnu";
};





// Fonction de gestion du changement d'état dans l'interface utilisateur
const handleAppChange = (id, newStatus) => {
  // 🔁 Mise à jour du bon state : checkedTextes
  setCheckedTextes(prev =>
    prev.map(texte =>
      texte._id === id ? { ...texte, etat: newStatus } : texte
    )
  );

  };
   
    
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
      <select >
  <option value="">--Choisir un domaine--</option>
 
</select>
    </div>
    
    
    <div className="form-group">
      <label>Nature</label>
      <select>
  <option>--Choisir une nature --</option>
 
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
  

  </div>
<div className="line-horiz"></div>


{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>

</div>

      <table>
        <thead>
          <tr>
            <th>Domaine</th>
            <th>Nature</th>
            <th>Référence</th>
            <th>AV/C/NC</th>
            <th>APP/N APP/AV</th>
            <th>PDF</th>
            <th>Exigences</th>
            <th>AV/C/NC</th>
            <th>Ajouter monitorning</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
     {Array.isArray(checkedTextes) && checkedTextes.map((texte, index) => (
                <tr key={texte._id}>
                  <td>{Comparedomaine(texte.domaine, texte.secteur)|| '---'}</td>
                  <td> {texte.nature} </td>
                  <td>
              <div>
               {texte.reference}
              </div>
              <div style={{ paddingTop: "5px" }}>
                {texte.texte?.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </td>
                 
            <td>
  <div className="Status-container">
  <div className="status-label status">
</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
  
  >
    {option}
  </div>
))}

    </div>
  </div>
</td>
            <td>
              <div className="APP-container">
                <div className={`app-status ${texte.etat?.toLowerCase().replace(' ', '-')}`}>
                  {texte.etat || "mich mawjoud"}
                </div>
                <div className="menu-APP">
                  {["APP", "N APP", "AV"].map((option) => (
                    <div
                      key={option}
                      className={`option-APP ${option.toLowerCase().replace(' ', '-')}`}
                      onClick={() => handleAppChange(texte._id, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </td>
           
               <td> <ImFilePdf /></td>
            
         <td> </td>
       
              <td>
  <div className="Status-container">
  <div className="status-label status">

</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
  
  >
    {option}
  </div>
))}

    </div>
  </div>
</td>
              <td><input className="boxC" type="checkbox"/></td>
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

export default ConformeE;
