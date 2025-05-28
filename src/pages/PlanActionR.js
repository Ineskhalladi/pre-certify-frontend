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


// Fonction de gestion du changement d'état dans l'interface utilisateur
const handleTexteC = (id, newStatus) => {
  // 🔁 Mise à jour du bon state : checkedTextes
  setCheckedTextes(prev =>
    prev.map(texte =>
      texte._id === id ? { ...texte, conformite: newStatus } : texte
    )
  );

};

const handleTexteC2 = (id, newStatus) => {
  setTextesExigence(prev =>
    prev.map(texte => texte._id === id ? { ...texte, conformiteE: newStatus } : texte

    )
  );
};
const handleSave = (id, constat) => {
};

const handleConstat = (id, newConstat) => {
  setTextesExigence(prev =>
    prev.map(texte => texte._id === id ? { ...texte, constat: newConstat } : texte)
  );

};

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
    const filteredActions = actions.filter((a) =>
    a.action?.toLowerCase().includes(searchTerm.toLowerCase())
  );
 

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

</div>
<table>
 <thead>
  <tr>
    <th>Reference</th>
    <th>Conformite</th>
    <th>Exigence</th>
    <th>ConformiteE</th>
    <th>Constat</th>
    <th>Editer</th>
    <th>Action</th>
    <th>Responsable</th>
    <th>Echeance</th>
    <th>Validation</th>
    <th>EditerAction</th>
  </tr>
</thead>
<tbody>
  {Object.entries(groupesTextes).map(([key, group]) => {
    const [domaine, theme, sousTheme] = key.split("-");

    const exigencesNC = group.exigence.filter(e => e.conformiteE === "NC");
    const exigCount = exigencesNC.length;

    if (exigCount > 0) {
      // afficher une seule ligne avec texte normal et première exigence
      return (
        <>
          <tr key={`row-${key}-0`}>
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
            <td>
              <div><strong>{exigencesNC[0].reference}</strong></div>
              <div style={{ paddingTop: "5px" }}>
                {exigencesNC[0].texte?.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </td>
            <td>
              <div className="Status-container">
                <div className={`status-label status-${exigencesNC[0].conformiteE.toLowerCase()}`}>
                  {exigencesNC[0].conformiteE}
                </div>
                <div className="menu-Status">
                  {["C", "AV", "NC"].map((option) => (
                    <div
                      key={option}
                      className={`option-Status status-${option.toLowerCase()}`}
                      onClick={() => handleTexteC2(exigencesNC[0]._id, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </td>
            <td>
              <textarea
                value={exigencesNC[0].constat || ""}
                onChange={(e) => handleConstat(exigencesNC[0]._id, e.target.value)}
              />
              <button className="save" onClick={() => handleSave(exigencesNC[0]._id, exigencesNC[0].constat)}>
                Save
              </button>
            </td>
            <td>
            <BiEdit />
            </td>
<td>{actions.find((a) => a.texteExigence === exigencesNC[0]._id)?.action || "" }</td>
<td>{actions.find((a) => a.texteExigence === exigencesNC[0]._id)?.responsable?.name || ""}</td>
<td>{actions.find((a) => a.texteExigence === exigencesNC[0]._id)?.echeance?.split("T")[0] || ""}</td>
<td>
  {(() => {
    const act = actions.find((a) => a.texteExigence === exigencesNC[0]._id);
    return act ? (
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
    ) : (
      "N/A"
    );
  })()}
</td>
<td>

      <BiEdit  />
      <BiTrash  />
 
</td>
          </tr>
          {exigencesNC.slice(1).map((exigence, index) => (
            <tr key={`row-${key}-${index + 1}`}>
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
              <td>
               <BiEdit/>
              </td>
         <td>{actions.find((a) => a.texteExigence === exigencesNC[0]._id)?.action || "" }</td>
<td>{actions.find((a) => a.texteExigence === exigence._id)?.responsable?.name || ""}</td>
<td>{actions.find((a) => a.texteExigence === exigence._id)?.echeance?.split("T")[0] || ""}</td>
<td>
  {(() => {
    const act = actions.find((a) => a.texteExigence === exigence._id);
    return act ? (
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
    ) : (
      "N/A"
    );
  })()}
</td>

              <td>
         
      <BiEdit  />
      <BiTrash  />


              </td>
            </tr>
          ))}
        </>
      );
    } else {
      // afficher juste le texte normal si pas d'exigences NC
      return (
        <tr key={`normal-${key}`}>
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
          <td colSpan={9}></td>
        </tr>
      );
    }
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
                {filteredActions.map((act, index) => (
                  <tr key={act._id}>
                    <td>{act.action}</td>
                    <td>{act.responsable?.name}</td>
                    <td>{new Date(act.echeance).toLocaleDateString()}</td>
                <td>{act.validation ? "✅" : "❌"}</td>
                    
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
