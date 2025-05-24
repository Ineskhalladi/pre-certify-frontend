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
  const conformiteTexte = conformites.find(c => c.texteId._id?.toString() === texte._id?.toString());
  console.log("🔗 Conformité trouvée :", conformiteTexte);
  return {
    ...texte,
    conformite: conformiteTexte?.conformite || "Non défini",
  };
});

console.log("✅ Textes avec conformité associée :", textesAvecConformite);
setCheckedTextes(textesAvecConformite);
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

  const barDataA = [
    { name: "100", value: 48, fill: "#2e4731" },
    { name: "75", value: 22, fill: "#88a373" },
    { name: "50", value: 39, fill: "#56c16f" },
    { name: "25", value: 14, fill: "#d9a500" },
    { name: "0", value: 5, fill: "#f7e393" },
  ];

  const dataR = [
    {
      name: 'responsable1',
      '0%': 8,
      '25%': 1,
      '50%': 1,
      '75%': 1,
      '100%': 35,
    },
   
  ];
  const COLORS = {
    '0%': '#2e4731',
    '25%': '#88a373',
    '50%': '#f7e393',
    '75%': '#56c16f',
    '100%': '#d9a500',
  };

  

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
              <div className="form-group">
                <label>Domaine</label>
                <select>
                  <option value="">--Choisir un domaine--</option>
                </select>
              </div>

              {/* Buttons sous l'input directement */}
              <div className="button-group-S">
                <button className="btn-search"><FaSearch /> Recherche</button>
                <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
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
          <BarChart data={dataR} barCategoryGap="0%">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" align="center" iconType="square" />
            {Object.keys(COLORS).map((key) => (
              <Bar key={key} dataKey={key} fill={COLORS[key]} />
            ))}
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
