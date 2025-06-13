import React, { useState, useEffect } from "react";
import "../pages/StatistiquesV.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend, BarChart,Bar,XAxis,YAxis, CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StatistiquesV = () => {

 const [checkedTextes, setCheckedTextes] = useState([]);
  const [textesNormaux, setTextesNormaux] = useState([]);
  const [textesExigence, setTextesExigence] = useState([]);
  const [dataTextes, setDataTextes] = useState([]);
const [dataExigences, setDataExigences] = useState([]);

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
setDataTextes(getConformiteData(textesAvecConformite, "conformite"));

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
setDataExigences(getConformiteData(textesExigenceAvecConformite, "conformiteE"));

   const data = getConformiteData(textesAvecConformite, "conformite");
const dataE = getConformiteData(textesExigenceAvecConformite, "conformiteE");

      } catch (err) {
        console.error("❌ Erreur :", err.message);
        alert("Erreur lors du chargement des textes");
      }
    };
  
    fetchTextes();
  }, []);
  


const getConformiteData = (textes, key = "conformite") => {
  const counts = { "Conforme": 0, "Non conforme": 0, "À vérifier": 0 };

  textes.forEach((texte) => {
    let conf = texte[key]?.toUpperCase(); // S'assure que c'est en majuscule pour éviter les surprises

    // 🔁 Traduction des codes courts en libellés
    if (conf === "C") conf = "Conforme";
    else if (conf === "NC") conf = "Non conforme";
    else if (conf === "AV") conf = "À vérifier";
    else conf = "À vérifier"; // Sécurité en cas de valeur inattendue

    counts[conf]++;
  });

  return [
    { name: "Conforme", value: counts["Conforme"], color: "#5b8750" },
    { name: "Non conforme", value: counts["Non conforme"], color: "#9ea19e" },
    { name: "À vérifier", value: counts["À vérifier"], color: "#d9a500" },
  ];
};
    const [actions, setActions] = useState([]);

  useEffect(() => {
    fetchActions();
  }, []);
const [barDataA, setBarDataA] = useState([]);

const fetchActions = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/actionall");
    const actions = response.data;
    setActions(actions);

    // 🎯 Étape 1 : Calculer le taux d’avancement (validation) pour chaque action
    const categories = {
      "100": 0,
      "75": 0,
      "50": 0,
      "25": 0,
      "0": 0,
    };

    actions.forEach((action) => {
      const val = action; // Doit être un nombre entre 0 et 100
      if (val === 100) categories["100"] += 1;
      else if (val >= 75) categories["75"] += 1;
      else if (val >= 50) categories["50"] += 1;
      else if (val >= 25) categories["25"] += 1;
      else categories["0"] += 1;
    });

    // 🎨 Étape 2 : Préparer les données pour le graphique
    const dataFormatted = [
      { name: "100", value: categories["100"], fill: "#2e4731" },
      { name: "75", value: categories["75"], fill: "#88a373" },
      { name: "50", value: categories["50"], fill: "#56c16f" },
      { name: "25", value: categories["25"], fill: "#d9a500" },
      { name: "0", value: categories["0"], fill: "#f7e393" },
    ];

    setBarDataA(dataFormatted);
  } catch (err) {
    console.error("Erreur lors du chargement des actions :", err);
  }
};

const countValidatedActions = actions.filter(a => a.validation === true).length;

const dataValidation = [
  { name: "responsable", value: countValidatedActions },
];

 const [selectedDomaine, setSelectedDomaine] = useState("");
   const [filteredTextes, setFilteredTextes] = useState([]); // tableau filtré
   
   const handleSearch = () => {
     const result = checkedTextes.filter(t => {
       return (
         (selectedDomaine === "" || t.domaineNom === selectedDomaine) 

       );
     });
   
     setFilteredTextes(result);
   };
   
   const handleReset = () => {
     setSelectedDomaine("");
  
     setFilteredTextes(checkedTextes); // تعاود تعرض الكل
   };
   
   useEffect(() => {
     setFilteredTextes(checkedTextes); // لما يجي texte جديد
   }, [checkedTextes]);
  

  return (
    <>
      

      {/* Base recherche container */}
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Mes statistiques</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaSearch className="icon-search" />
            <h2>Filtrer par:</h2>
          </div>

          <div className="base-rech">
            <div className="filters-S">
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

              {/* Buttons sous l'input directement */}
              <div className="button-group-S">
                <button className="btn-search" onClick={handleSearch}>
                  <FaSearch /> Recherche
                </button>
                <button className="btn-cancel" onClick={handleReset}>
                  <FaSyncAlt /> Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Etat conformité container */}
      <div className="etat-row">
  <div className="etat-box">
    <h2>Etat de conformité des textes</h2>
    <h3>Tous les domaines</h3>
    <div className="chart-wrapper">
      <PieChart width={400} height={400}>
        <Pie
          data={dataTextes}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={150}
          paddingAngle={2}
          dataKey="value"
          label={({ value }) => value}
        >
         {dataTextes.map((entry, index) => (
      <Cell key={`cell-textes-${index}`} fill={entry.color} />
    ))}
        </Pie>
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </div>
  </div>

  <div className="etat-box">
    <h2>Etat de conformité des exigences</h2>
    <h3>Tous les domaines</h3>
    <div className="chart-wrapper">
      <PieChart width={400} height={400}>
        <Pie
          data={dataExigences}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={150}
          paddingAngle={2}
          dataKey="value"
          label={({ value }) => value}
        >
           {dataExigences.map((entry, index) => (
      <Cell key={`cell-exigences-${index}`} fill={entry.color} />
    ))}
        </Pie>
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    </div>
  </div>
</div>

<div className="etat-double-container">
  {/* Bloc 1 : Etat d'avancement des actions */}
  <div className="bar-chart-containerA">
    <div className="bar-chart-titleA">Etat d'avancement des actions</div>
    <h3>Tous les domaines</h3>
    <div className="bar-chart-wrapperA">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={barDataA}
          layout="vertical"
          margin={{ top: 20, right: 10, left: 80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#000", fontSize: 12 }}
            width={200}
          />
          <Tooltip />
          <Bar dataKey="value" barSize={35} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Bloc 2 : Etat d'avancement des actions par responsable */}
  <div className="etat-containerS">
    <h2>Etat d'avancement des actions par responsable</h2>
      <div className="etat-graphS">
        <h3>Tous les domaines</h3>
        <ResponsiveContainer width="80%" height={300}>
          <BarChart data={dataValidation} barCategoryGap="0%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="center" iconType="square" />
       
      <Bar dataKey="value" fill="#88a373" />
          
          </BarChart>
        </ResponsiveContainer>
      </div>
    
      </div>
    </div>


  
      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default StatistiquesV;
