import React, { useState, useEffect} from "react";
import "../pages/PlanActionV.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen, FaTools } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/PlanActionV.css"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import { RiRefreshLine } from "react-icons/ri";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BiEdit, BiTrash } from "react-icons/bi";

const PlanActionR = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesNormaux, setTextesNormaux] = useState([]);
  const [textesExigence, setTextesExigence] = useState([]);
    const [actions, setActions] = useState([]);
      const [searchTerm, setSearchTerm] = useState("");
    
  const navigate = useNavigate();

  // Charger les actions au démarrage
  useEffect(() => {
    fetchActions();
  }, []);

  const fetchActions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/actionall");
      setActions(response.data);
    } catch (err) {
      console.error("Erreur lors du chargement des actions :", err);
    }
  };

  const deleteAction = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette action ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/auth/deleteaction/${id}`);
      setActions(actions.filter((action) => action._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };
    const filteredActions = actions.filter((a) =>
    a.action?.toLowerCase().includes(searchTerm.toLowerCase())
  );

const toggleValidation = async (id, currentValidation) => {
  try {
    await axios.post("http://localhost:5000/api/auth/valideractions", {
      id: id,
      validation: !currentValidation, // inverse l'état actuel
    });
    fetchActions(); // Recharge la liste mise à jour
  } catch (err) {
    console.error("❌ Erreur lors du changement de validation :", err);
    alert("Erreur lors de la validation !");
  }
};

  ///////////////////////////////

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
  const conformiteTexte = conformites.find(c => c.texteId._id?.toString() === texte._id?.toString());
  console.log("🔗 Conformité trouvée :", conformiteTexte);
  return {
    ...texte,
    conformite: conformiteTexte?.conformite || "Non défini",
  };
});

// 🔍 Ne garder que ceux avec conformité === "NC"
const textesNC = textesAvecConformite.filter((t) => t.conformite === "NC");

console.log("📌 Textes avec conformité = NC :", textesNC);

// 👉 Afficher seulement ceux qui ont NC
setCheckedTextes(textesNC);


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
    conformiteE: conf?.conformiteE || "Non défini",
     constat: conf?.constat || "",
  };
});
console.log("🔍 Textes avec conformitéExigences : ", textesExigenceAvecConformite);

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
        <select>
    <option >--Choisir un domaine--</option>
   

  </select>
      </div>
      <div className="form-group">
        <label>Thème</label>
        <select>
    <option>--Choisir un thème--</option>
   
  </select>
     </div>
      <div className="form-group">
        <label>Sous thème</label>
        <select>
    <option>--Choisir un sous thème --</option>
 
  </select>    </div>
      <div className="form-group">
        <label>Nature</label>
        <select>
    <option>--Choisir une nature --</option>

  </select>
      </div>
      <div className="form-group">
        <label>Année de publication</label>
        <select><option>--Choisir --</option></select>
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
  <Link to="/conformeV" className="gauche-phrase">
    <FiArrowLeft className="icon-app" />
   Evaluation de conformité
  </Link>
  <Link to="/statistiquesV" className="droite-phrase">
    Statistiques
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
  <button className="exp-pdf">Sauvegarder dans historique<RiRefreshLine /></button>

</div>
<table style={{ borderCollapse: "collapse", width: "100%" }}>
  <thead>
    <tr>
      <th>Action</th>
      <th>Responsable</th>
      <th>Échéance</th>
      <th>Conformité</th>
      <th>Validation</th>
      <th>Éditer</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(groupesTextes).map(([key, group]) => {
      const [domaine, theme, sousTheme] = key.split("-");
      return group.normal.map((texte, index) => {
        const exigence = group.exigence[index];
        const filteredActions = actions.filter(a => a.exigenceId === exigence?._id);

        return (
          <React.Fragment key={`${texte._id}-${index}`}>
            {/* 🟨 Ligne 1 - Texte Normal */}
            <tr style={{ backgroundColor: "#fff3cd", textAlign: "start" }}>
              <td colSpan="6" style={{ border: "none" }}>
                <strong>{texte.reference}</strong> - {texte.nature}
                <div style={{ marginTop: "5px" }}>
                  {texte.texte?.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
                <div className="Status-container">
                  <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>
                    {texte.conformite}
                  </div>
                  <div className="menu-Status">
                    {["C", "AV", "NC"].map((option) => (
                      <div
                        key={option}
                        className={`option-Status status-${option.toLowerCase()}`}
                        onClick={() => handleTexteC(texte._id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </td>
            </tr>

            {/* 📄 Ligne 2 - Exigence */}
            <tr style={{ textAlign: "start" }}>
              <td colSpan="3" style={{ border: "none" }}>
                <strong>{exigence?.reference}</strong> - {exigence?.nature}
                <div style={{ marginTop: "5px" }}>
                  {exigence?.texte?.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </td>
              <td style={{ border: "none" }}>
                <div className="Status-container">
                  <div className={`status-label status-${exigence?.conformiteE?.toLowerCase()}`}>
                    {exigence?.conformiteE || "ND"}
                  </div>
                  <div className="menu-Status">
                    {["C", "AV", "NC"].map((option) => (
                      <div
                        key={option}
                        className={`option-Status status-${option.toLowerCase()}`}
                        onClick={() => handleTexteC2(exigence?._id, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </td>
              <td></td>
              <td style={{ border: "none" }}>
                <BiEdit onClick={() => navigate("/action")} />
              </td>
            </tr>

            {/* 📝 Ligne 3 - Constat */}
            <tr style={{ textAlign: "start" }}>
              <td colSpan="6" style={{ border: "none" }}>
                <textarea
                  value={exigence?.constat || ""}
                  onChange={(e) => handleConstat(exigence?._id, e.target.value)}
                />
                <button onClick={() => handleSave(exigence?._id, exigence?.constat)}>
                  Enregistrer
                </button>
              </td>
            </tr>

            {/* ✅ Ligne 4 - Action ou aucune action */}
            {filteredActions.length === 0 ? (
              <tr style={{ textAlign: "start" }}>
                <td colSpan="6" style={{ border: "none", fontStyle: "italic", color: "gray" }}>
                  Aucune action
                </td>
              </tr>
            ) : (
              filteredActions.map((act, i) => (
                <tr key={act._id} style={{ textAlign: "start" }}>
                  <td>{act.action}</td>
                  <td>{act.responsable?.name}</td>
                  <td>{new Date(act.echeance).toLocaleDateString()}</td>
                  <td></td>
                  <td>{act.validation ? "✅" : "❌"}</td>
                  <td>
                    <BiEdit onClick={() => navigate(`/editaction/${act._id}`)} />
                    <BiTrash onClick={() => deleteAction(act._id)} />
                  </td>
                </tr>
              ))
            )}
          </React.Fragment>
        );
      });
    })}
  </tbody>
</table>



  
    </div>
    <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"> <FaTools/> Mes action réalisées</h3>
  </div>
<div className="line-horiz"></div>
<table>
  <thead>
    <tr>
      <th>Action</th>
      <th>Responsable</th>
      <th>Échéance</th>
      <th>Validation</th>
    </tr>
  </thead>
  <tbody>
    {filteredActions.map((act) => (
      <tr key={act._id}>
        <td>{act.action}</td>
        <td>{act.responsable?.name}</td>
        <td>{new Date(act.echeance).toLocaleDateString()}</td>
        <td>
          <button
            onClick={() => toggleValidation(act._id, act.validation)}
            style={{
              cursor: "pointer",
              fontSize: "18px",
              color: act.validation ? "green" : "red",
              border: "none",
              background: "transparent",
            }}
            title={act.validation ? "Cliquer pour invalider" : "Cliquer pour valider"}
          >
            {act.validation ? "✅" : "❌"}
          </button>
        </td>
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

export default PlanActionR;
