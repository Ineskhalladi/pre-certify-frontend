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

const ConformeV = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesNormaux, setTextesNormaux] = useState([]);
  const [textesExigence, setTextesExigence] = useState([]);
  
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
        const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase() === "normal");
        console.log("📄 Tous les textes normaux :", textesNormaux);
        setTextesNormaux(textesNormaux);
  
        // ✅ Récupérer les textes cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${identre}`);
        const texteIDs = textesCochesRes.data.textes || [];
        console.log("☑️ IDs des textes cochés :", texteIDs);
  
  
        // ✅ Filtrer les textes cochés avec type normal
        const textesFiltres = allTextes.filter(
          (texte) => 
            texte.typeTexte?.toLowerCase() === "normal" &&
            texteIDs.includes(texte._id)
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
const conformiteTexte = conformites.find(c =>
  c.texteId?._id?.toString() === texte._id?.toString()
);
  console.log("🔗 Conformité trouvée :", conformiteTexte);
  return {
    ...texte,
    conformite: conformiteTexte?.conformite || "--",
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
  

   // 🟡 1. Filtrer les textes cochés et applicables de type exigence
    const textesExigenceApplicables = allTextes.filter(
     (texte) =>
      texte.typeTexte?.toLowerCase() === "exigence" &&
       texteIDs.includes(texte._id)
     );
          
    
    console.log("📌 Textes exigences applicables :", textesExigenceApplicables);
    
      
   // 🔹 7. Récupérer conformité des exigences
   const conformitesExRes = await axios.get(`http://localhost:5000/api/auth/confoalle/${identre}`);
   const conformitesEx = conformitesExRes.data || [];

 const textesExigenceAvecConformite = textesExigenceApplicables.map((texte) => {
  const conf = conformitesEx.find(c => c.texteId?.toString() === texte._id?.toString());

  return {
    ...texte,
    conformiteE: conf?.conformiteE || "",
     constat: conf?.constat || "",
  };
});
console.log("🔍 Textes avec conformitéExigences : ", textesExigenceAvecConformite);

   setTextesExigence(textesExigenceAvecConformite);
// 🟣 دمج النصوص normal و exigence في array واحدة
const allFilteredTextes = [...textesAvecInfos, ...textesExigenceAvecConformite];
setFilteredTextes(allFilteredTextes); // هذا إذا كنت تستعمل filteredTextes في الـ render

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

const updateTexteconformiteEx = async (texteId, conformiteE, constat) => {
  try {
    const entrepriseData = JSON.parse(localStorage.getItem("entrepriseToken"));
    const identre = entrepriseData.identre;

    // نبني الجسم اللي باش نبعثو حسب المعطيات المتوفرة
    const payload = { identre, texteId };
    if (conformiteE !== null) payload.conformiteE = conformiteE;
    if (constat !== null) payload.constat = constat;

    await axios.post("http://localhost:5000/api/auth/exconforme", payload);
    console.log("✅ Texte mis à jour (exigence)");

  } catch (err) {
    console.error("❌ Erreur update exigence :", err.message);
  }
};


const handleTexteC2 = (id, newStatus) => {
  setTextesExigence(prev =>
    prev.map(texte => texte._id === id ? { ...texte, conformiteE: newStatus } : texte

    )
  );
  updateTexteconformiteEx(id, newStatus,null);
};
const handleSave = (id, constat) => {
  // نبعث البيانات للـ backend مع "constat" فقط
  updateTexteconformiteEx(id, null, constat); // Null لعدم تغيير conformiteE
};

const handleConstat = (id, newConstat) => {
  setTextesExigence(prev =>
    prev.map(texte => texte._id === id ? { ...texte, constat: newConstat } : texte)
  );

  // نبعث constat وحدو بلا ما نبعث conformiteE
  updateTexteconformiteEx(id, null, newConstat);
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

  // 🧠 Regrouper les textes par Domaine/Thème/SousThème
const groupesTextes = {};

checkedTextes.forEach((texte) => {
  const key = `${texte.domaine}-${texte.theme}-${texte.sousTheme}`;
  if (!groupesTextes[key]) groupesTextes[key] = { normal: [], exigence: [] };
  groupesTextes[key].normal.push(texte);
});

textesExigence.forEach((texte) => {
  const key = `${texte.domaine}-${texte.theme}-${texte.sousTheme}`;
  if (!groupesTextes[key]) groupesTextes[key] = { normal: [], exigence: [] };
  groupesTextes[key].exigence.push(texte);
});


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
      <th>Constat</th>
    </tr>
  </thead>
  <tbody>

  {Object.entries(groupesTextes).map(([key, group], groupIndex) => {
  const [domaine, theme, sousTheme] = key.split("-");
  const exigCount = group.exigence.length;

  return group.exigence.length > 0
    ? group.exigence.map((exigence, index) => (
        <tr key={`row-${key}-${index}`}>
          {/* Affichage texte normal une seule fois (sur la première ligne) */}
          {index === 0 ? (
            <>
              <td rowSpan={exigCount}>{Comparetheme(theme, domaine)}</td>
              <td rowSpan={exigCount}>{ComparesousTheme(sousTheme, theme)}</td>
              <td rowSpan={exigCount}>
                <div>{group.normal[0]?.nature} : {group.normal[0]?.reference}</div>
                <div style={{ paddingTop: "5px" }}>
                  {group.normal[0]?.texte?.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </td>
              <td rowSpan={exigCount}>
                <div className="Status-container">
                  <div className={`status-label status-${group.normal[0]?.conformite?.toLowerCase()}`}>
                    {group.normal[0]?.conformite}
                  </div>
                  <div className="menu-Status">
                    {["C", "AV", "NC"].map((option) => (
                      <div
                        key={option}
                        className={`option-Status status-${option.toLowerCase()}`}
                        onClick={() => handleTexteC(group.normal[0]._id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </>
          ) : null}

          {/* Colonnes exigences */}
          <td>
            <div><strong>{exigence.reference}</strong></div>
            <div style={{ paddingTop: "5px" }}>
              {exigence.texte?.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </td>
          <td>
            <div className="Status-container">
              <div className={`status-label status-${exigence?.conformiteE?.toLowerCase()}`}>
                {exigence?.conformiteE || ""}
              </div>
              <div className="menu-Status">
                {["C", "AV", "NC"].map((option) => (
                  <div
                    key={option}
                    className={`option-Status status-${option.toLowerCase()}`}
                    onClick={() => handleTexteC2(exigence._id, option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </td>
          <td>
            <textarea
              value={exigence.constat || ""}
              onChange={(e) => handleConstat(exigence._id, e.target.value)}
            />
            <button className="save" onClick={() => handleSave(exigence._id, exigence.constat)}>
              Save
            </button>
          </td>
        </tr>
      ))
    : (
      // Cas où il n'y a pas d'exigence, juste le texte normal
      <tr key={`normal-${key}`}>
        <td>{Comparetheme(theme, domaine)}</td>
        <td>{ComparesousTheme(sousTheme, theme)}</td>
        <td>
          <div>{group.normal[0]?.nature} : {group.normal[0]?.reference}</div>
          <div style={{ paddingTop: "5px" }}>
            {group.normal[0]?.texte?.split("\n").map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </div>
        </td>
        <td>
          <div className="Status-container">
            <div className={`status-label status-${group.normal[0]?.conformite?.toLowerCase()}`}>
              {group.normal[0]?.conformite}
            </div>
            <div className="menu-Status">
              {["C", "AV", "NC"].map((option) => (
                <div
                  key={option}
                  className={`option-Status status-${option.toLowerCase()}`}
                  onClick={() => handleTexteC(group.normal[0]._id, option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </td>
        <td colSpan={3}></td>
      </tr>
    );
})}

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

export default ConformeV;
