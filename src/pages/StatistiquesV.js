import React, { useState} from "react";
import "../pages/StatistiquesV.css";
import NavBar2 from "../components/NavBar2";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const StatistiquesV = () => {
    const data = [
        { name: 'À vérifier', value: 29 },
        { name: 'Conforme', value: 97 },
        { name: 'Non conforme', value: 10 },
      ];
      
      const COLORS = ['#fbc02d', '#1dd1a1', '#e74c3c'];
  
  return (
    <>
      <NavBar2 />
      <div className="etat-container">
      <h2>Etat de conformité des textes</h2>
      <div className="chart-wrapper">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={120}
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

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default StatistiquesV;
