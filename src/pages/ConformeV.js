import React, { useState, useEffect} from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/ConformeV.css"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import ConformeE from "./ConformeE";

const ConformeV = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesNormaux, setTextesNormaux] = useState([]);
  const [textesExigence, setTextesExigence] = useState([]);
  const [conformite, setConformite] = useState([]);
  
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
  
        // 📌 Tous les textes type normal (même s'ils ne sont pas cochés)
        const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase());
        console.log("📄 Tous les textes normaux :", textesNormaux);
        setTextesNormaux(textesNormaux);
  
        // ✅ Récupérer les textes cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${identre}`);
        const texteIDs = textesCochesRes.data.textes || [];
        console.log("☑️ IDs des textes cochés :", texteIDs);
  
  
        // ✅ Filtrer les textes cochés avec type normal
        const textesFiltres = allTextes.filter(
          (texte) => texteIDs.includes(texte._id) && texte.typeTexte?.toLowerCase()
        );

        console.log("✅ Textes cochés détaillés :", textesFiltres);
        // ✅ Récupérer les états des textes
        const textesApplicableRes = await axios.get(`http://localhost:5000/api/auth/etat/${identre}`);
        const textesApplicable = textesApplicableRes.data?.filter(etat => etat.etat === "APP") || [];
        console.log("📄 États des textes applicables :", textesApplicable);

        const textesApplicablesDetail = textesFiltres.filter((texte) =>
          textesApplicable.some((etat) => etat.texteId === texte._id)
        );
        
// ✅ Récupérer la conformité pour chaque texte applicable
    console.log("📡 Envoi de la requête vers l'API avec identre et conformite :");
    const conformitesRes = await axios.get(`http://localhost:5000/api/auth/conforallv/${identre}`);
    const conformites = conformitesRes.data || [];
    console.log("🟢 Conformités récupérées :", conformites);


// 🔁 Associer la conformité à chaque texte applicable
const textesAvecConformite = textesApplicablesDetail.map((texte) => {
  const conformiteTexte = conformites.find(c => c.texteId.toString() === texte._id.toString());
  return {
    ...texte,
    conformite: conformiteTexte?.conformite || "Non défini",
  };
});

setCheckedTextes(textesAvecConformite);

          // 🟡 1. Filtrer les textes cochés et applicables de type exigence
          const textesExigenceApplicables = allTextes.filter(
            (texte) =>
              texte.typeTexte?.toLowerCase() === "exigence" &&
              texteIDs.includes(texte._id)
          );
    
          console.log("📌 Textes exigences applicables :", textesExigenceApplicables);
    
          // ✅ 2. Ajouter automatiquement les exigences avec état "APP"
          for (const texte of textesExigenceApplicables) {
            try {
              await axios.post("http://localhost:5000/api/auth/exigence", {
                identre,
                texteId: texte._id,
              });
              console.log(`✅ Texte ${texte._id} ajouté comme exigence`);
            } catch (err) {
              if (err.response && err.response.status === 409) {
              } else {
                console.error(`❌ Erreur ajout exigence pour texte ${texte._id}:`, err.message);
              }
            }
          }
   // 🔹 7. Récupérer conformité des exigences
   const conformitesExRes = await axios.get(`http://localhost:5000/api/auth/confoalle/${identre}`);
   const conformitesEx = conformitesExRes.data || [];

   const textesExigenceAvecConformite = textesExigenceApplicables.map((texte) => {
     const conf = conformitesEx.find(c => c.texteId === texte._id);
     return {
       ...texte,
       conformiteE: conf?.conformiteE || "Non défini",
     };
   });

   setTextesExigence(textesExigenceAvecConformite);

      } catch (err) {
        console.error("❌ Erreur :", err.message);
        alert("Erreur lors du chargement des textes");
      }
    };
  
    fetchTextes();
  }, []);
  


// 2. Pour les thèmes
const [themesParDomaine, setThemesParDomaine] = useState({});
const fetchThemesByDomaine = async (domaineId) => {
  if (themesParDomaine[domaineId]) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/themes/byDomaine/${domaineId}`);
    setThemesParDomaine(prev => ({
      ...prev,
      [domaineId]: res.data,
    }));
  } catch (error) {
    console.error("Erreur chargement des thèmes :", error);
  }
};

const Comparetheme = (themeId, domaineId) => {
  const themes = themesParDomaine[domaineId];
  console.log("🔍 Comparetheme ID reçu :", themeId, "DomaineID :", domaineId);

  if (!themes) {
    fetchThemesByDomaine(domaineId);
    return "Chargement thème...";
  }
  const theme = themes.find((t) => t._id === themeId);
  return theme ? theme.nom : "Thème inconnu";
};

// 3. Pour les sous-thèmes
const [sousThemesParTheme, setSousThemesParTheme] = useState({});
const fetchSousThemesByTheme = async (themeId) => {
  if (sousThemesParTheme[themeId]) return;
  try {
    const res = await axios.get(`http://localhost:5000/api/auth/sousthemes/byTheme/${themeId}`);
    setSousThemesParTheme(prev => ({
      ...prev,
      [themeId]: res.data,
    }));
  } catch (error) {
    console.error("Erreur chargement des sous-thèmes :", error);
  }
};
const ComparesousTheme = (sousThemeId, themeId) => {
  const sousThemes = sousThemesParTheme[themeId];
  console.log("🔍 ComparesousTheme ID reçu :", sousThemeId, "ThemeID :", themeId);

  if (!sousThemes) {
    fetchSousThemesByTheme(themeId);
    return "Chargement sous-thème...";
  }
  const sousTheme = sousThemes.find((s) => s._id === sousThemeId);
  return sousTheme ? sousTheme.nom : "Sous-thème inconnu";
};

// Fonction pour mettre à jour l'état d'un texte dans le backend
const updateTexteconformite = async (texteId, conformite) => {
  try {
    const entrepriseData = JSON.parse(localStorage.getItem("entrepriseToken"));
    const identre = entrepriseData.identre;

    // Envoi de la requête pour mettre à jour l'état du texte
    await axios.post("http://localhost:5000/api/auth/confor", {
      identre,
      texteId,
      conformite,
    });

    console.log("✅ Texte mis à jour avec succès !");
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour :", err.message);
  }
};

// Fonction de gestion du changement d'état dans l'interface utilisateur
const handleTexteC = (id, newStatus) => {
  // 🔁 Mise à jour du bon state : checkedTextes
  setCheckedTextes(prev =>
    prev.map(texte =>
      texte._id === id ? { ...texte, conformite: newStatus } : texte
    )
  );

  // 📤 Mise à jour backend
  updateTexteconformite(id, newStatus);
};

const updateTexteconformiteEx = async (texteId, conformiteE) => {
  try {
    const { identre } = JSON.parse(localStorage.getItem("entrepriseToken"));
    await axios.post("http://localhost:5000/api/auth/conforex", { identre, texteId, conformiteE });
    console.log("✅ Texte mis à jour (exigence)");
  } catch (err) {
    console.error("❌ Erreur update exigence :", err.message);
  }
};

const handleTexteC2 = (id, newStatus) => {
  setTextesExigence(prev =>
    prev.map(texte => texte._id === id ? { ...texte, conformiteE: newStatus } : texte)
  );
  updateTexteconformiteEx(id, newStatus);
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
      <select>
  <option>--Choisir un domaine--</option>
 
</select>
    </div>
    <div className="form-group">
      <label>Thème</label>
      <select >
  <option>--Choisir un thème--</option>

</select>
   </div>
    <div className="form-group">
      <label>Sous thème</label>
      <select>
  <option>--Choisir un sous thème --</option>
  
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
    <div 
  className="abreviation" 
  onMouseEnter={() => setIsAbreviationOpen(true)}
  onMouseLeave={() => setIsAbreviationOpen(false)}
>
  <div className="menu-abrev2">
    <strong>Abréviation</strong> <BsInfoCircle />           
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
<div className="line-horiz"></div>

<div className="barre-haut">
  <Link to="/texteapp" className="gauche-phrase">
    <FiArrowLeft className="icon-app" />
   Textes applicables
  </Link>
  <Link to="/planactionv" className="droite-phrase">
    Mon plan d'action
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
  <button className="exp-pdf">Sauvegarder dans historique<RiRefreshLine /></button>

</div>

<table>
  <thead>
    <tr>
      <th>Thème</th>
      <th>Sous-thème</th>
      <th>Référence</th>
      <th>AV/C/NC</th>
      <th>Exigences</th>
      <th>AV/C/NC</th>
      <th>Ajouter monitoring</th>
    </tr>
  </thead>
  <tbody>
    {checkedTextes.map((texte) => (
      <tr key={texte._id}>
        <td>{Comparetheme(texte.theme, texte.domaine)}</td>
        <td>{ComparesousTheme(texte.sousTheme, texte.theme)}</td>
        <td>
          <div>
            {texte.nature} : {texte.reference}
          </div>
          <div style={{ paddingTop: "5px" }}>
            {texte.texte?.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </td>
        <td>
  <div className="Status-container">
    <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>{texte.conformite}</div>
    <div className="menu-Status">
      {["C", "AV", "NC"].map((option) => (
        <div
          key={option}
          className={`option-Status status-${option.toLowerCase().replace(' ', '-')}`}
          onClick={() => handleTexteC(texte._id, option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
</td>

        <td>
          {textesExigence.map((exigence, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <div>{exigence.reference}</div>
              <div style={{ paddingTop: "5px" }}>
                {exigence.texte?.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </div>
          ))}
        </td>
        <td>
  <div className="Status-container">
    <div className={`status-label status-${texte.conformiteE?.toLowerCase()}`}>
      {texte.conformiteE || "ND"}
    </div>
    <div className="menu-Status">
      {["C", "AV", "NC"].map((option) => (
        <div
          key={option}
          className={`option-Status status-${option.toLowerCase().replace(' ', '-')}`}
          onClick={() => handleTexteC2(texte._id, option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
</td>

        <td>
          <input className="boxC" type="checkbox" />
        </td>
      </tr>
    ))}
  </tbody>
</table>


      <div className="pagination-container">
  <ul className="pagination">
    <li className="btn-item">Précédent</li>
    <li className="btn-item active">1</li>
    <li className="btn-item">2</li>
    <li className="btn-item">3</li>
    <li className="btn-item">Suivant</li>
    <li className="btn-item">Fin</li>
  </ul>
</div>

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default ConformeV;
