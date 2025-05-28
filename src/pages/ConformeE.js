import React, { useState, useEffect} from "react";
import "../pages/ConformeE.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import "../pages/ConformeV.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ConformeE = () => {


  const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesExigence, setTextesExigence] = useState([]);



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
const [searchTerm, setSearchTerm] = useState("");
const [domaines, setDomaines] = useState([]);
const [natures, setNatures] = useState([]);
const [data, setData] = useState([]);
const [exigences, setExigences] = useState([]);
const [selectedTexteId, setSelectedTexteId] = useState(null);

// جلب جميع البيانات الخاصة بمحتوى mesEx
useEffect(() => {
  const fetchMesEx = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allmesEx");
      const allData = response.data;

      // استخراج المجالات والنatures بدون تكرار
      const uniqueDomaines = [...new Set(allData.map((item) => item.domaine).filter(Boolean))];
      const uniqueNatures = [...new Set(allData.map((item) => item.nature).filter(Boolean))];

      setDomaines(uniqueDomaines);
      setNatures(uniqueNatures);
      setData(allData);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données", error);
    }
  };

  fetchMesEx();
}, []);

// جلب جميع المتطلبات الأخرى (autreEx)
useEffect(() => {
  const fetchExigences = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allautreEx");
      setExigences(response.data.data); // تأكد إلي `data` هو المفتاح الصحيح
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des exigences :", error);
    }
  };

  fetchExigences();
}, []);


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
      <th>App/N APP/AV</th>
      <th>Av/C/NC</th>
      <th>Texte</th>
      <th>Exigences</th>
      <th>Av/C/NC</th>
    </tr>
  </thead>
<tbody>
  {data.map((texte, index) => {
    const exigenceAssociee = exigences.find(
      (item) =>
        item.texteId &&
        item.texteId._id?.toString() === texte._id.toString()
    );

    return (
      <tr key={index}>
        <td>{texte.domaine}</td>
        <td>{texte.nature}</td>
        <td>{texte.reference}</td>
        <td>
          <div className="APP-container">
            <div className={`app-status ${texte.applicabilite?.toLowerCase()}`}>
              {texte.applicabilite || ""}
            </div>
          </div>
        </td>
        <td>
          <div className="Status-container">
            <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>
              {texte.conformite || ""}
            </div>
          </div>
        </td>
        <td>{texte.texte}</td>

        {/* 🟩 Colonne Exigence */}
        <td>
          {exigenceAssociee && (
            <div className="exigence-texte">{exigenceAssociee.texte}</div>
          )}
        </td>

        {/* 🟩 Colonne Statut de l’exigence */}
        <td>
          {exigenceAssociee && (
            <div className="Status-container">
              <div className={`status-label status-${exigenceAssociee.statut?.toLowerCase()}`}>
                {exigenceAssociee.statut}
              </div>
            </div>
          )}
        </td>
      </tr>
    );
  })}
</tbody>

</table>
  

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default ConformeE;
