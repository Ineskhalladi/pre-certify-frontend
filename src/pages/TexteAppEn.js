import React, { useState, useEffect} from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen, FaPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { BsEye, BsEyeSlash, BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/TexteApp.css"
import { FiArrowRight } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const TexteAppEn = () => {
  const navigate = useNavigate();
  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [data, setData] = useState([ ]);
  const [textes, setTextes] = useState([]);
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
  
  
        const textesRes = await axios.get("http://localhost:5000/api/auth/alltexte");
        const allTextes = textesRes.data;
        console.log("📚 Tous les textes :", allTextes);
  
        // 📌 Tous les textes type normal (même s'ils ne sont pas cochés)
        const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase() === "normal");
        console.log("📄 Tous les textes normaux :", textesNormaux);
        setTextesNormaux(textesNormaux);
  
        // ✅ Récupérer les textes cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${userId}`);
        const texteIDs = textesCochesRes.data.textes || [];
        console.log("☑️ IDs des textes cochés :", texteIDs);
  
        // ✅ Récupérer les états des textes
        const textesApplicableRes = await axios.get(`http://localhost:5000/api/auth/etat/${userId}`);
        const textesApplicable = textesApplicableRes.data || [];
        console.log("📄 États des textes applicables :", textesApplicable);
  
        // ✅ Filtrer les textes cochés avec type normal
        const textesFiltres = allTextes.filter(
          (texte) => texteIDs.includes(texte._id) && texte.typeTexte?.toLowerCase() === "normal"
        );
        console.log("✅ Textes cochés détaillés :", textesFiltres);
  
        // ✅ Fusionner avec état
        const textesAvecEtat = textesFiltres.map((texte) => {
          const match = textesApplicable.find((t) => t.texteId === texte._id);
          return {
            ...texte,
            etat: match?.etat || ""
          };
        });
  
  

  
       // ✅ Récupérer la conformité pour chaque texte applicable
    console.log("📡 Envoi de la requête vers l'API avec identre et conformite :");
    const conformitesRes = await axios.get(`http://localhost:5000/api/auth/conforallv/${userId}`);
    const conformites = conformitesRes.data || [];
    console.log("🟢 Conformités récupérées :", conformites);


// 🔁 Associer la conformité à chaque texte applicable
const textesAvecConformite = textesAvecEtat.map((texte) => {
  const conformiteTexte = conformites.find(c => c.texteId._id?.toString() === texte._id?.toString());
  console.log("🔗 Conformité trouvée :", conformiteTexte);
  return {
    ...texte,
    conformite: conformiteTexte?.conformite || "Non défini",
  };
});

console.log("✅ Textes avec conformité associée :", textesAvecConformite);
const textesAvecInfos = await Promise.all(
textesAvecConformite.map(async (texte) => {
    const secteurId = texte.secteur; // ✅ صحّحت الاسم
    const domaineId = texte.domaine;
    const themeId = texte.theme;
    const sousThemeId = texte.sousTheme;
    const natureNomDirect = texte.nature; // على ما يبدو nature فيها الاسم مش الـ id

    let domaineNom = "";
    let themeNom = "";
    let sousThemeNom = "";
    let natureNom = natureNomDirect || "";

    try {
      if (domaineId && secteurId) {
        const domainesRes = await axios.get(`http://localhost:5000/api/auth/domaines/bySecteur/${secteurId}`);
        const domaine = domainesRes.data.find(d => d._id === domaineId);
        domaineNom = domaine?.nom || "Domaine inconnu";
      }

      if (themeId && domaineId) {
        const themesRes = await axios.get(`http://localhost:5000/api/auth/themes/byDomaine/${domaineId}`);
        const theme = themesRes.data.find(t => t._id === themeId);
        themeNom = theme?.nom || "Thème inconnu";
      }

      if (sousThemeId && themeId) {
        const sousThemesRes = await axios.get(`http://localhost:5000/api/auth/sousthemes/byTheme/${themeId}`);
        const sousTheme = sousThemesRes.data.find(s => s._id === sousThemeId);
        sousThemeNom = sousTheme?.nom || "Sous-thème inconnu";
      }

      // Pas besoin d'appeler l'API pour nature si texte.nature déjà contient le nom
    } catch (error) {
      console.error("❌ Erreur récupération des infos :", error);
    }

    return {
      ...texte,
      domaineNom,
      themeNom,
      sousThemeNom,
      natureNom,
    };
  })
);

setCheckedTextes(textesAvecInfos);  
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
const updateTexteEtat = async (texteId, etat) => {
  try {
    console.log("➡️ texteId :", texteId);
    console.log("➡️ Nouvel état :", etat);

    const token = localStorage.getItem("token");
    if (!token) throw new Error("❌ Aucun token trouvé");
    const decoded = jwtDecode(token);
        const userId = decoded.id;
        console.log("✅ ID utilisateur :", userId);
        console.log("userId extracted:", userId);

        const payload = {
          userId,
          texteId,
          etat,
        };
    // Envoi de la requête pour mettre à jour l'état du texte
    const response = await axios.post("http://localhost:5000/api/auth/appl",payload); 
    console.log("Payload being sent:", payload);

    console.log("✅ Texte mis à jour avec succès !");
    console.log("📥 Réponse du serveur :", response.data);
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour :", err.message);
  }
};

// Fonction de gestion du changement d'état dans l'interface utilisateur
const handleAppChange = (id, newStatus) => {
  // 🔁 Mise à jour du bon state : checkedTextes
  setCheckedTextes(prev =>
    prev.map(texte =>
      texte._id === id ? { ...texte, etat: newStatus } : texte
    )
  );

  // 📤 Mise à jour backend
  updateTexteEtat(id, newStatus);
};

// Fonction de gestion du changement d'état dans l'interface utilisateur
const handleTexteC = (id, newStatus) => {
  // 🔁 Mise à jour du bon state : checkedTextes
  setCheckedTextes(prev =>
    prev.map(texte =>
      texte._id === id ? { ...texte, conformite: newStatus } : texte
    )
  );

  };  

 const [selectedDomaine, setSelectedDomaine] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedSousTheme, setSelectedSousTheme] = useState("");
  const [selectedNature, setSelectedNature] = useState("");
  const [filteredTextes, setFilteredTextes] = useState([]); // tableau filtré
  
  const handleSearch = () => {
    const result = checkedTextes.filter(t => {
      return (
        (selectedDomaine === "" || t.domaineNom === selectedDomaine) &&
        (selectedTheme === "" || t.themeNom === selectedTheme) &&
        (selectedSousTheme === "" || t.sousThemeNom === selectedSousTheme) &&
        (selectedNature === "" || t.natureNom === selectedNature)
      );
    });
  
    setFilteredTextes(result);
  };
  
  const handleReset = () => {
    setSelectedDomaine("");
    setSelectedTheme("");
    setSelectedSousTheme("");
    setSelectedNature("");
    setFilteredTextes(checkedTextes); // تعاود تعرض الكل
  };
  
  useEffect(() => {
    setFilteredTextes(checkedTextes); // لما يجي texte جديد
  }, [checkedTextes]);
  
  return (
    <>
     
      <div className="base-container">
    <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Textes applicables</h1>
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
  {/* Domaine */}
  <div className="form-group">
    <label>Domaine</label>
    <select value={selectedDomaine} onChange={(e) => setSelectedDomaine(e.target.value)}>
  <option value="">--Choisir un domaine--</option>
  {[...new Set(checkedTextes.map(t => t.domaineNom))].filter(Boolean).map((nom, index) => (
    <option key={index} value={nom}>{nom}</option>
  ))}
</select>
  </div>

  {/* Thème */}
  <div className="form-group">
    <label>Thème</label>
  <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
  <option value="">--Choisir un thème--</option>
  {[...new Set(checkedTextes.map(t => t.themeNom))]
    .filter(Boolean)
    .map((nom, index) => (
      <option key={index} value={nom}>{nom}</option>
  ))}
</select>

  </div>

  {/* Sous Thème */}
  <div className="form-group">
    <label>Sous thème</label>
 <select value={selectedSousTheme} onChange={(e) => setSelectedSousTheme(e.target.value)}>
  <option value="">--Choisir un sous thème --</option>
  {[...new Set(checkedTextes.map(t => t.sousThemeNom))]
    .filter(Boolean)
    .map((nom, index) => (
      <option key={index} value={nom}>{nom}</option>
  ))}
</select>

  </div>

  {/* Nature */}
  <div className="form-group">
    <label>Nature</label>
  <select value={selectedNature} onChange={(e) => setSelectedNature(e.target.value)}>
  <option value="">--Choisir une nature --</option>
  {[...new Set(checkedTextes.map(t => t.natureNom))]
    .filter(Boolean)
    .map((nom, index) => (
      <option key={index} value={nom}>{nom}</option>
  ))}
</select>

  </div>
</div>

  <div className="button-group">
<button className="btn-search" onClick={handleSearch}>
  <FaSearch /> Recherche
</button>
<button className="btn-cancel" onClick={handleReset}>
  <FaSyncAlt /> Annuler
</button>
  </div>
  </div>
</div>


        <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Liste des Textes applicables</h3>
    <div 
  className="abreviation" 
  onMouseEnter={() => setIsAbreviationOpen(true)}
  onMouseLeave={() => setIsAbreviationOpen(false)}
>
  <div className="menu-abrev">
    <strong>Abréviation</strong> <BsInfoCircle />           
  </div>

  {isAbreviationOpen && (
    <div className="dropdown-abrev">

      <div className="abrev-item"><span className="abrev-label app">APP</span> : Applicable</div>
      <div className="abrev-item"><span className="abrev-label napp">N APP</span> : Non applicable</div>
      <div className="abrev-item"><span className="abrev-label av">AV</span> : À vérifier</div>
    </div>
  )}
</div>

  </div>
<div className="line-horiz"></div>

<div className="barre-haut1">
  <Link to="/conformev" className="droite-phrase">
    Evaluation de conformité
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section1">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
  
</div>

<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Domaine</th>
      <th>Thème</th>
      <th>Sous thème</th>
      <th>Référence</th>
      <th>Texte</th>
      <th>APP/N APP/Info</th>
      <th>AV/C/NC</th>
      <th>PDF</th>
    </tr>
  </thead>
  <tbody>
{Array.isArray(filteredTextes) && filteredTextes.map((texte, index) => (
    <tr key={texte._id}>
      <td>{index + 1}</td>
      <td>{Comparedomaine(texte.domaine, texte.secteur)|| '---'}</td>
      <td>{Comparetheme(texte.theme, texte.domaine)|| '---'}</td>
      <td>{ComparesousTheme(texte.sousTheme, texte.theme) || '---'}</td>
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
          <BsEye />
        </td>
        <td>
          <div className="APP-container">
            <div className={`app-status ${texte.etat?.toLowerCase().replace(' ', '-')}`}>
              {texte.etat || "--"}
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
               <td>
  <div className="Status-container">
    <div className={`status-label status-${texte.conformite?.toLowerCase()}`}> 
      {texte.conformite || ""}</div>
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
          <ImFilePdf />
        </td>
      </tr>
    ))}
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
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default TexteAppEn;
