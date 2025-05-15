import React, { useState, useEffect } from "react";
import "../pages/StatistiquesV.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend, BarChart,Bar,XAxis,YAxis, CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts';
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StatistiquesEn = () => {
  const data = [
    { name: 'À vérifier', value: 29, color:'#d9a500' },
    { name: 'Conforme', value: 97, color:'#5b8750' },
    { name: 'Non conforme', value: 10, color:'#9ea19e'  },
  ];
  const dataE = [
    { name: 'À vérifier', value: 80, color:'#d9a500' },
    { name: 'Conforme', value: 500,color:'#5b8750' },
    { name: 'Non conforme', value: 30, color:'#9ea19e'  },
  ];
  const barDataA = [
    { name: "100", value: 48, fill: "#2e4731" },
    { name: "75", value: 22, fill: "#88a373" },
    { name: "50", value: 39, fill: "#56c16f" },
    { name: "25", value: 14, fill: "#d9a500" },
    { name: "0", value: 5, fill: "#f7e393" },
  ];
  const dataS = [
    {
      name: 'service1',
      '0%': 8,
      '25%': 1,
      '50%': 1,
      '75%': 1,
      '100%': 35,
    },
    {
      name: 'service2',
      '0%': 0,
      '25%': 0,
      '50%': 0,
      '75%': 0,
      '100%': 0,
    },
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
    {
      name: 'responsable2',
      '0%': 0,
      '25%': 0,
      '50%': 0,
      '75%': 0,
      '100%': 0,
    },
  ];
  const COLORS = {
    '0%': '#2e4731',
    '25%': '#88a373',
    '50%': '#f7e393',
    '75%': '#56c16f',
    '100%': '#d9a500',
  };

  
  const [domaines, setDomaines] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id; 

        axios
          .get(`http://localhost:5000/api/auth/user/${userId}/domaines`)
          .then((res) => {
            setDomaines(res.data);
          })
          .catch((err) => {
            console.error("Erreur lors du chargement des domaines :", err);
          });
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    } else {
      console.warn("Token non trouvé dans le localStorage");
    }
  }, []);

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
                  {domaines.map((domaine) => (
                    <option key={domaine._id} value={domaine._id}>
                      {domaine.nom}
                    </option>
                  ))}
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
          <h2>Etat de conformité des textes</h2>
          <h3>Tout les domaines</h3>
          <div className="chart-wrapper">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
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

      <div className="etat-container">
        <div className="etat-content">
          <h2>Etat de conformité des exigences</h2>
          <h3>Tout les domaines</h3>
          <div className="chart-wrapper">
            <PieChart width={400} height={400}>
              <Pie
                data={dataE}
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
 {/* Bar Chart */}
         <div className="bar-chart-containerA">
          <div className="bar-chart-titleA">Etat d'avancement des actions</div>
          <h3>Tout les domaines</h3>

          <div className="bar-chart-wrapperA">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barDataA}
                 layout="vertical"
                margin={{ top: 20, right: 10, left: 80, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis  type="number" />
                <YAxis
                type="category"
                 dataKey="name"
                  tick={{ fill: "#000",fontSize: 12 }}
                  width={200}
                  />
                <Tooltip />
                <Bar dataKey="value" barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="etat-containerS">
  <h2>Etat d'avancement des actions par service</h2>
  <div className="etat-S">
    <div className="etat-graphS">
      <h3>Tous les domaines</h3>
      <ResponsiveContainer width="70%" height={350}>
        <BarChart data={dataS} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="center" iconType="square" />

          {/* Bars séparés */}
          {Object.keys(COLORS).map((key) => (
            <Bar key={key} dataKey={key} fill={COLORS[key]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="etat-legendS">
      <h3>Légende des services</h3>
      <div className="service-legendS">
        <p><strong>service1</strong> : QSE</p>
        <p><strong>service2</strong> : RH</p>
      </div>
    </div>
  </div>
</div>

<div className="etat-containerS">
  <h2>Etat d'avancement des actions par responsable</h2>
  <div className="etat-S">
    <div className="etat-graphS">
      <h3>Tous les domaines</h3>
      <ResponsiveContainer width="70%" height={350}>
        <BarChart data={dataR} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="center" iconType="square" />

          {/* Bars séparés */}
          {Object.keys(COLORS).map((key) => (
            <Bar key={key} dataKey={key} fill={COLORS[key]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="etat-legendS">
      <h3>Légende des responsables</h3>
      <div className="service-legendS">
        <p><strong>responsable1</strong> : nourhen bn</p>
        <p><strong>responsable2</strong> : oussama af</p>
      </div>
    </div>
  </div>
</div>

  
      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default StatistiquesEn;
