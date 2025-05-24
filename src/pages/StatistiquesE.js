import React, { useState, useEffect } from "react";
import "../pages/StatistiquesE.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend} from 'recharts';
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StatistiquesE = () => {
  const data = [
    { name: 'À vérifier', value: 2, color:'#d9a500' },
    { name: 'Conforme', value: 100, color:'#5b8750' },
    { name: 'Non conforme', value: 0, color:'#9ea19e'  },
  ];


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
  
  
        // ✅ Récupérer les textes cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${identre}`);
        const texteIDs = textesCochesRes.data.textes || [];
        console.log("☑️ IDs des textes cochés :", texteIDs);

// ✅ Tous les textes de type "exigence"
const textesNormaux = allTextes.filter((t) => t.typeTexte?.toLowerCase() === "exigence");
console.log("📄 Tous les textes normaux :", textesNormaux);
setTextesNormaux(textesNormaux);

// ✅ Filtrer uniquement les textes cochés avec type "exigence"
const textesFiltres = textesNormaux.filter((texte) => texteIDs.includes(texte._id));

// ✅ Récupérer les états des textes
const textesApplicableRes = await axios.get(`http://localhost:5000/api/auth/autreexall/${identre}`);
const textesApplicable = textesApplicableRes.data || [];
console.log("📄 États des textes exigences :", textesApplicable);

        // ✅ Fusionner avec état
        const textesAvecEtat = textesFiltres.map((texte) => {
          const match = textesApplicable.exigences.find((t) => t.texteId === texte._id);
          return {
            ...texte,
            etat: match?.etat || "APP"
          };
        });
        
        // ✅ Récupérer la conformité pour chaque texte applicable
        console.log("📡 Envoi de la requête vers l'API avec identre et conformite :");
        const conformitesRes = await axios.get(`http://localhost:5000/api/auth/autreconfoexalle/${identre}`);
        const conformites = conformitesRes.data || [];
        console.log("🟢 Conformités récupérées :", conformites);
    
    
    // 🔁 Associer la conformité à chaque texte applicable
    const textesAvecConformite = textesAvecEtat.map((texte) => {
      const conformiteTexte = conformites.find(c => c.texteId?.toString() === texte._id?.toString());
      console.log("🔗 Conformité trouvée :", conformiteTexte);
      return {
        ...texte,
        conformiteAEX: conformiteTexte?.conformiteAEX || "Non défini",
      };
    });
    
    console.log("✅ Textes avec conformité associée :", textesAvecConformite);
    setCheckedTextes(textesAvecConformite);

    
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
  
   // ✅ Calcul dynamique des statistiques de conformité
const conformityStats = {
  C: 0,
  NC: 0,
  AV: 0,
};

textesExigence.forEach((texte) => {
  const value = texte.conformiteE;
  if (value === "C") conformityStats.C += 1;
  else if (value === "NC") conformityStats.NC += 1;
  else if (value === "AV") conformityStats.AV += 1;
});

// ✅ Construction du tableau de données pour le PieChart
const pieData = [
  { name: 'À vérifier', value: conformityStats.AV, color: '#d9a500' },
  { name: 'Conforme', value: conformityStats.C, color: '#5b8750' },
  { name: 'Non conforme', value: conformityStats.NC, color: '#9ea19e' },
];




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
      <div className="etat-container">
        <div className="etat-content">
          <h2>statistique de conformité par reference</h2>
          <h3>Reference</h3>
          <div className="chart-wrapper">
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={150}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                label={({ value }) => value}
                
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend verticalAlign="top" height={36} />
            </PieChart>
          </div>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default StatistiquesE;
