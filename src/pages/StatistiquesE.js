import React, { useState, useEffect } from "react";
import "../pages/StatistiquesE.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend} from 'recharts';
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StatistiquesE = () => {
 const [data, setData] = useState([]);
const [exigences, setExigences] = useState([]);
const [selectedTexteId, setSelectedTexteId] = useState(null);
const [domaines, setDomaines] = useState([]);
const [natures, setNatures] = useState([]);
// جلب جميع البيانات الخاصة بمحتوى mesEx
useEffect(() => {
  const fetchMesEx = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allmesEx");
      const allData = response.data;

      // استخراج المجالات والنatures بدون تكرار
      const uniqueDomaines = [...new Set(allData.map((item) => item.domaine).filter(Boolean))];
      const uniqueNatures = [...new Set(allData.map((item) => item.nature).filter(Boolean))];

      setDomaines(uniqueDomaines);
      setNatures(uniqueNatures);
      setData(allData);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données", error);
    }
  };

  fetchMesEx();
}, []);

// جلب جميع المتطلبات الأخرى (autreEx)
useEffect(() => {
  const fetchExigences = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allautreEx");
      setExigences(response.data.data); // تأكد إلي `data` هو المفتاح الصحيح
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des exigences :", error);
    }
  };

  fetchExigences();
}, []);
const [conformityStats, setConformityStats] = useState({
  C: 0,
  NC: 0,
  AV: 0,
});

// 🧠 Mettre à jour automatiquement les stats quand les données changent
useEffect(() => {
  const countStats = () => {
    const stats = { C: 0, NC: 0, AV: 0 };

    data.forEach((item) => {
      const val = item.conformite?.trim().toUpperCase();
      if (val === "C") stats.C += 1;
      else if (val === "NC") stats.NC += 1;
      else if (val === "AV") stats.AV += 1;
    });

    exigences.forEach((item) => {
      const val = item.statut?.trim().toUpperCase();
      if (val === "C") stats.C += 1;
      else if (val === "NC") stats.NC += 1;
      else if (val === "AV") stats.AV += 1;
    });

    setConformityStats(stats);
  };

  countStats();
}, [data, exigences]);

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
               {pieData.map((entry, index) => (
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
