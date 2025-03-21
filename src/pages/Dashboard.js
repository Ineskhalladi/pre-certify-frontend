import React from "react";
import "../pages/Dashboard.css";
import NavBar2 from "../components/NavBar2";
const Dashboard = () => {
  return (
<>
<NavBar2/>

    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Domaine acquis</h2>
        <div className="categories">
          <button>Santé et Sécurité au Travail</button>
          <button>Risques Industriels et autres</button>
          <button>Environnement</button>
          <button>Qualité</button>
          <button>Responsabilité Sociétale de Entreprise</button>
          <button>+ Autres domaines</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Textes 2026</h3>
          <div className="chart">2</div>
        </div>
        <div className="card">
          <h3>Conformité générale</h3>
          <div className="pie-chart"></div>
        </div>
        
        <div className="card"> <h3>Santé et Sécurité au Travail</h3> <div className="bar-chart"></div> </div>
        <div className="card"> <h3>Risques Industriels et autres</h3> <div className="bar-chart"></div> </div>
        <div className="card"> <h3>Environnement</h3> <div className="bar-chart"></div> </div>
        <div className="card"> <h3>Qualité</h3> <div className="bar-chart"></div> </div>
        <div className="card"> <h3>Responsabilité Sociétale de Entreprise</h3> <div className="bar-chart"></div> </div>
      </div>

      <button className="action-button">+ Plus de action</button>
    </div>
    </>
  );
};

export default Dashboard;
