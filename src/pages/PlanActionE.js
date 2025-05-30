import React, { useState, useEffect} from "react";
import "../pages/PlanActionE.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import "../pages/PlanActionE.css"
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BiEdit } from "react-icons/bi";
import { Link,useNavigate } from "react-router-dom";

const PlanActionE = () => {
  const navigate = useNavigate();

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

    // فلترة اللي عندهم conformite = "NC"
    const ncData = allData.filter((item) => item.conformite === "NC");

    const uniqueDomaines = [...new Set(ncData.map((item) => item.domaine).filter(Boolean))];
    const uniqueNatures = [...new Set(ncData.map((item) => item.nature).filter(Boolean))];

    setDomaines(uniqueDomaines);
    setNatures(uniqueNatures);
    setData(ncData); // نخزنو فقط البيانات اللي عندها NC
    setFilteredData(ncData);
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
    const allExigences = response.data.data;

    const ncExigences = allExigences.filter((item) => item.statut === "NC");

    setExigences(ncExigences);         // إذا تستعملها في مكان آخر
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
    <h3 className="text-base"><FaFolderOpen />Plan d'action</h3>
    
  </div>
<div className="line-horiz"></div>


{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>

</div>

    </div>
 <table>
  <thead>
    <tr>
      <th>Référence</th>
      <th>Av/C/NC</th>
      <th>Exigences</th>
      <th>Av/C/NC</th>
      <th>Editer</th>
    <th>Action</th>
    <th>Responsable</th>
    <th>Echeance</th>
    <th>Validation</th>
    <th>EditerAction</th>
    </tr>
  </thead>
<tbody>
  {filteredData.map((texte, index) => {
    const exigenceAssociee = exigences.find(
      (item) =>
        item.texteId &&
        item.texteId._id?.toString() === texte._id.toString()
    );

    const hasAction =
      exigenceAssociee &&
      (exigenceAssociee.action ||
        exigenceAssociee.responsable ||
        exigenceAssociee.echeance ||
        exigenceAssociee.validation);

    return (
      <tr key={index}>
        <td>{texte.reference}</td>

        <td>
          <div className="Status-container">
            <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>
              {texte.conformite || ""}
            </div>
          </div>
        </td>

        <td>
          {exigenceAssociee && (
            <div className="exigence-texte">{exigenceAssociee.texte}</div>
          )}
        </td>

        <td>
          {exigenceAssociee && (
            <div className="Status-container">
              <div className={`status-label status-${exigenceAssociee.statut?.toLowerCase()}`}>
                {exigenceAssociee.statut}
              </div>
            </div>
          )}
        </td>

        <td>
          <BiEdit onClick={() => navigate("/ajoutaction")} />
        </td>

        {/* 🔽 Ici on affiche soit les 5 colonnes normalement, soit une seule avec colSpan=5 */}
        {hasAction ? (
          <>
            <td>{exigenceAssociee?.action}</td>
            <td>{exigenceAssociee?.responsable}</td>
            <td>{exigenceAssociee?.echeance}</td>
            <td>{exigenceAssociee?.validation}</td>
            <td>
              <BiEdit onClick={() => navigate(`/editaction/${exigenceAssociee._id}`)} />
            </td>
          </>
        ) : (
          <td colSpan="5" style={{ fontStyle: 'italic', color: 'gray', textAlign: 'center' }}>
            Aucune action pour cette exigence
          </td>
        )}
      </tr>
    );
  })}
</tbody>


</table>
  </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default PlanActionE;
