import React from "react";
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

const DashboardE = () => {
  const textes2026Data = [
    { name: "Santé et Sécurité au Travail", value: 4, color: "#2e4731" },
    { name: "Risques Industriels et autres", value: 3, color: "#D9DEDA" },
    { name: "Environnement", value: 2, color: "#f7e393" },
    { name: "Quatité", value: 3, color: "#5b8750" },
    { name: "Responsabilité Sociétale de Entreprise", value: 8, color: "#d9a500" },
  ];
  const totalTextes2026 = textes2026Data.reduce((sum, item) => sum + item.value, 0);

  const barData = [
    { name: "Texte applicable", value: 48, fill: "#2e4731" },
    { name: "Textes pour information", value: 22, fill: "#88a373" },
    { name: "Textes conformes", value: 39, fill: "#56c16f" },
    { name: "Textes non conformes", value: 14, fill: "#d9a500" },
    { name: "Textes à vérifier", value: 5, fill: "#f7e393" },
    { name: "Action échus", value: 2, fill: "#FFF761" },
  ];

  const pieData = [
    { name: "À vérifier", value: 3, color: "#d9a500" },
    { name: "Conforme", value: 5, color: "#5b8750" },
    { name: "Non conforme", value: 2, color: "#D9DEDA" },
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
    <div className="pie-chart-title">Textes 2026</div>
    <div className="pie-chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={textes2026Data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={45}
            dataKey="value"
            labelLine={false}
          >
            {textes2026Data.map((entry, index) => (
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
      <div className="centered-text">{totalTextes2026}</div>
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

export default DashboardE;
