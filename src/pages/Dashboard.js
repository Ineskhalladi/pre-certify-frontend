import React, { useState, useEffect} from "react";
import "../pages/Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import axios from "axios";
import {jwtDecode} from "jwt-decode";
const Dashboard = () => {
    const [checkedTextes, setCheckedTextes] = useState([]);
    const [textesNormaux, setTextesNormaux] = useState([]);
    const [textesExigence, setTextesExigence] = useState([]);
        const [checkedTextesAEX, setCheckedTextesAEX] = useState([]);

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
  
  console.log("✅ Textes avec conformité associée :", textesAvecConformite);
  
  
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
  
     
// ✅ Récupérer les états des textes
const textesApplicableResAEX = await axios.get(`http://localhost:5000/api/auth/autreexall/${identre}`);
const textesApplicableAEX = textesApplicableResAEX.data || [];
console.log("📄 États des textes exigences :", textesApplicableAEX);

        // ✅ Fusionner avec état
       const textesAvecEtatAEX = textesExigenceApplicables.map((texte) => {
  const match = textesApplicableAEX.exigences.find((t) => t.texteId === texte._id);
  return {
    ...texte,
    etat: match?.etat || "APP"
  };
});


       // ✅ Récupérer la conformité pour chaque texte applicable
        console.log("📡 Envoi de la requête vers l'API avec identre et conformite :");
        const conformitesAEX = await axios.get(`http://localhost:5000/api/auth/autreconfoexalle/${identre}`);
        const conforAEX = conformitesAEX.data || [];
        console.log("🟢 Conformités récupérées :", conformites);
    
    
    // 🔁 Associer la conformité à chaque texte applicable
const textesAvecConformiteAEX = textesAvecEtatAEX.map((texte) => {
  const conformiteTexteAEX = conforAEX.find(c => c.texteId?.toString() === texte._id?.toString());
  return {
    ...texte,
    conformiteAEX: conformiteTexteAEX?.conformiteAEX || "Non défini",
  };
});

    
    console.log("✅ Textes avec conformité associée :", textesAvecConformiteAEX);
    setCheckedTextesAEX(textesAvecConformiteAEX);

    // ✅ Regrouper toutes les conformités pour le diagramme général
const tousLesTextesAvecConformite = [
  ...textesAvecConformite,         // les textes normaux
  ...textesExigenceAvecConformite, // les textes exigence
  ...textesAvecConformiteAEX       // les autres exigences
];

setCheckedTextes(tousLesTextesAvecConformite); // ceci remplace les anciens checkedTextes

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
//////////////////////

const textesCoches2025 = checkedTextes

const textesParDomaine = {};

textesCoches2025.forEach((texte) => {
  const domaineNom = Comparedomaine(texte.domaineId, texte.secteurId);
  if (!textesParDomaine[domaineNom]) {
    textesParDomaine[domaineNom] = [];
  }
  textesParDomaine[domaineNom].push(texte);
});

const couleurs = ["#2e4731", "#45818e", "#b45f06", "#6aa84f", "#741b47", "#674ea7", "#a64d79"];

const diagrammeTextes2025 = Object.entries(textesParDomaine).map(([name, value], index) => ({
  name,
  value,
  color: couleurs[index % couleurs.length], // Choix circulaire de couleurs
}));

const totalTextesCoches2025 = textesCoches2025.length;


const calculerConformites = () => {
  const conformites = { C: 0, NC: 0, AV: 0 };

  checkedTextes.forEach((texte) => {
    // Vérifier conformité pour tous les types
    const conf =
      texte.conformite || texte.conformiteE || texte.conformiteAEX || "Non défini";

    if (conf === "C") conformites.C += 1;
    else if (conf === "NC") conformites.NC += 1;
    else if (conf === "AV") conformites.AV += 1;
  });

  return conformites;
};

const conformites = calculerConformites();

const pieData = [
  { name: "Conforme", value: conformites.C, color: "#5b8750" },
  { name: "Non conforme", value: conformites.NC, color: "#D9DEDA" },
  { name: "À vérifier", value: conformites.AV, color: "#d9a500" },
];


   const barData = [
    { name: "Texte applicable", value: 48, fill: "#2e4731" },
    { name: "Textes pour information", value: 22, fill: "#88a373" },
    { name: "Textes conformes", value: 39, fill: "#56c16f" },
    { name: "Textes non conformes", value: 14, fill: "#d9a500" },
    { name: "Textes à vérifier", value: 5, fill: "#f7e393" },
    { name: "Action échus", value: 2, fill: "#FFF761" },
  ];

  return (
    <>
      <div className="dashboard-charts-wrapper">
      <div className="first-line">
      <div className="domaines-box">
    <h2 className="domaines-title">Domaine acquis</h2>
    <div className="domaines-list">
      <div className="domaine-item">Risques Industriels et autres</div>
      <div className="domaine-item">Qualité</div>
      <div className="domaine-item">Environnement</div>
      <div className="domaine-item">Santé et Sécurité au Travail</div>
      <div className="domaine-item">Responsabilité Sociétale de Entreprise</div>
    </div>
    <div className="autres-domaines">+ Autres domaines</div>
  </div>

  <div className="pie-chart-container2">
    <div className="pie-chart-title">Textes</div>
    <div className="pie-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={diagrammeTextes2025}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={45}
            dataKey="value"
            labelLine={false}
          >
            {diagrammeTextes2025.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={entry.color} />
    ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "#000", fontSize: 14 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="centered-text">{totalTextesCoches2025}</div>
    </div>
  </div>

  <div className="pie-chart-container">
    <div className="pie-chart-title">Conformité générale</div>
    <div className="pie-chart-wrapper2">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="40%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            formatter={(value) => (
              <span style={{ color: "#000", fontSize: 18, marginLeft: 10 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

<div className="second-line">

         {/* Bar Chart */}
         <div className="bar-chart-container">
          <div className="bar-chart-title">Quantité</div>
          <div className="bar-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  tick={{ fill: "#000",fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

         {/* Bar Chart */}
         <div className="bar-chart-container">
          <div className="bar-chart-title">Risques Industriels et autres</div>
          <div className="bar-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  tick={{ fill: "#000",fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bar-chart-container">
          <div className="bar-chart-title">Environnement</div>
          <div className="bar-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: 10, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  tick={{ fill: "#000",fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        </div>
      </div>
      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>

    </>
  );
};

export default Dashboard;
