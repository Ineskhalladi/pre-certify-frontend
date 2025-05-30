import React, { useState, useEffect} from "react";
import "../pages/ConformeE.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import "../pages/ConformeV.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const ConformeE = () => {

const [searchTerm, setSearchTerm] = useState("");
const [domaines, setDomaines] = useState([]);
const [natures, setNatures] = useState([]);
const [data, setData] = useState([]);
const [exigences, setExigences] = useState([]);

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
      setFilteredData(allData);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données", error);
    }
  };
 // on initialise le tableau filtré avec toutes les données

  fetchMesEx();
}, []);

const [selectedTexteId, setSelectedTexteId] = useState(null);
const [selectedDomaine, setSelectedDomaine] = useState("");
const [selectedNature, setSelectedNature] = useState("");
const [filteredData, setFilteredData] = useState([]);

const handleSearch = () => {
  const results = data.filter((item) => {
    const domaineMatch = selectedDomaine ? item.domaine === selectedDomaine : true;
    const natureMatch = selectedNature ? item.nature === selectedNature : true;
    return domaineMatch && natureMatch;
  });
  setFilteredData(results);
};

const handleReset = () => {
  setSelectedDomaine("");
  setSelectedNature("");
  setFilteredData(data); // ترجع الكل
};

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

const handleUpdateTexteField = async (index, field, value) => {
  const updated = [...filteredData];
  updated[index][field] = value;
  setFilteredData(updated);

  const updatedTexte = updated[index];

  try {
    await axios.put(`http://localhost:5000/api/auth/updatemesEx/${updatedTexte._id}`, {
      [field]: value,
    });
    console.log("✅ Champ mis à jour avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du champ :", error);
  }
};

const handleUpdateExigenceStatut = async (texteId, newStatut) => {
  const updatedExigences = exigences.map((item) => {
    if (item.texteId?._id === texteId) {
      return { ...item, statut: newStatut };
    }
    return item;
  });
  setExigences(updatedExigences);

  const exigenceToUpdate = exigences.find(item => item.texteId?._id === texteId);

  if (exigenceToUpdate && exigenceToUpdate._id) {
    try {
      await axios.put(`http://localhost:5000/api/auth/upadateautreEx/${exigenceToUpdate._id}`, {
        statut: newStatut,
      });
      console.log("✅ Statut mis à jour avec succès");
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du statut :", error);
    }
  }
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
   <select value={selectedDomaine} onChange={(e) => setSelectedDomaine(e.target.value)}>
  <option value="">--Choisir un domaine--</option>
  {domaines.map((domaine, index) => (
    <option key={index} value={domaine}>{domaine}</option>
  ))}
</select>

  </div>

  <div className="form-group">
    <label>Nature</label>
    <select value={selectedNature} onChange={(e) => setSelectedNature(e.target.value)}>
  <option value="">--Choisir une nature--</option>
  {natures.map((nature, index) => (
    <option key={index} value={nature}>{nature}</option>
  ))}
</select>
  </div>
</div>

  
   <div className="button-group">
  <button className="btn-search" onClick={handleSearch}><FaSearch /> Recherche</button>
  <button className="btn-cancel" onClick={handleReset}><FaSyncAlt /> Annuler</button>
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
 {filteredData.map((texte, index) => {
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
            <div className="menu-APP">
              {["APP", "N APP", "AV"].map((option) => (
                <div
                  key={option}
                  className={`option-APP ${option.toLowerCase().replace(" ", "-")}`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </td>
  <td>
  <div className="Status-container">
    <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>
      {texte.conformite || ""}
    </div>
    <div className="menu-Status">
      {["C", "AV", "NC"].map((option) => (
        <div
          key={option}
          className={`option-Status status-${option.toLowerCase()}`}
          onClick={() => handleUpdateTexteField(index, "conformite", option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
</td>

        <td>{texte.texte}</td>

        {/* 🟩 Colonne Exigence */}
      <td>
  {exigenceAssociee && (
    <div className="Status-container">
      <div className={`status-label status-${exigenceAssociee.statut?.toLowerCase()}`}>
        {exigenceAssociee.statut}
      </div>
      <div className="menu-Status">
        {["C", "AV", "NC"].map((option) => (
          <div
            key={option}
            className={`option-Status status-${option.toLowerCase()}`}
            onClick={() =>
              handleUpdateExigenceStatut(texte._id, option)
            }
          >
            {option}
          </div>
        ))}
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
