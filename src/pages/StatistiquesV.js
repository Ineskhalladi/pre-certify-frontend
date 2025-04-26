import React, { useState, useEffect } from "react";
import "../pages/StatistiquesV.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const StatistiquesV = () => {
  const data = [
    { name: 'À vérifier', value: 29 },
    { name: 'Conforme', value: 97 },
    { name: 'Non conforme', value: 10 },
  ];

  const COLORS = ['#d9a500', '#5b8750', '#D9DEDA'];
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
      <NavBar2 />

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
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
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

export default StatistiquesV;
