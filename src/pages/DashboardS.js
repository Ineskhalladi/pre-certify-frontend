import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ResponsiveContainer
} from 'recharts';
import "../pages/DashboardS.css";
import axios from "axios";
import Calendar from 'react-calendar';  // Import the Calendar component
import 'react-calendar/dist/Calendar.css';  // Import the styles for the calendar


const barColors = {
  Entreprises: '#2e4731',
  Auditeurs: '#d9a500',
  Textes: '#56c16f',
};

const COLORS = ['#2e4731', '#d9a500', '#56c16f'];

function DashboardS() {

 const [textes, setTextes] = useState([]);
 const [auditeurs, setAuditeurs] = useState([]);
 const [entreprises, setEntreprises] = useState([]);
 const [date, setDate] = useState(new Date());  // To store selected date

 const handleDateChange = (newDate) => {
   setDate(newDate);  // Update the selected date
 };

  const [stats, setStats] = useState({
    entreprises: 0,
    auditeurs: 0,
    textes: 0
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/entreprises")
      .then((res) => {
        setEntreprises(res.data);
        setStats(prevStats => ({
          ...prevStats,
          entreprise: res.data.length,
        }));
      })
      .catch((err) => {
        console.error("Erreur fetch entreprises :", err);
      });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/allaudit")
      .then((res) => {
        setAuditeurs(res.data);
        setStats(prevStats => ({
          ...prevStats,
          auditeur: res.data.length,
        }));
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des auditeurs :", err)
      );
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/alltexte")
      .then((res) => {
        setTextes(res.data);
        setStats(prevStats => ({
          ...prevStats,
          textes: res.data.length,
        }));
      })
      .catch((err) => console.error("Erreur lors du chargement des textes :", err));
  }, []);
  
  const statsData = [
    { name: 'Entreprises', value: stats.entreprise },
    { name: 'Auditeurs', value: stats.auditeur },
    { name: 'Textes', value: stats.textes },
  ];

  const areaData = [
    { name: 'Entreprises', entreprise: stats.entreprise, auditeur: 0, textes: 0 },
    { name: 'Auditeurs', entreprise: 0, auditeur: stats.auditeur, textes: 0 },
    { name: 'Textes', entreprise: 0, auditeur: 0, textes: stats.textes },
  ];

  return (
    <div className="dashboard">
      <div className="top-cards">
        <div className="card-S">
          <div className="card-title">Nombre d'entreprises 🏢</div>
          <div className="card-value">{stats.entreprise}</div>
        </div>
        <div className="card-S">
          <div className="card-title">Nombre d'auditeurs 👨‍💼</div>
          <div className="card-value">{stats.auditeur}</div>
        </div>
        <div className="card-S">
          <div className="card-title">Textes applicables 📚</div>
          <div className="card-value">{stats.textes}</div>
        </div>
      </div>

      <div className="middle-section">
        <div className="chart-box">
          <div className="chart-title">Résultat</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={statsData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="custom-legend">
            {statsData.map((entry, index) => (
              <div key={index} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: barColors[entry.name] }}
                />
                <span className="legend-label">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pie-box">
  <div className="chart-title">Résultat</div>
  <PieChart width={300} height={250}>
    <Pie
      data={statsData}
      cx="50%"
      cy="50%"
      innerRadius={50}
      outerRadius={95}
      paddingAngle={5}
      dataKey="value"
      label
    >
      {statsData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    {/* Legend désactivée */}
  </PieChart>

  {/* Légende personnalisée */}
  <div className="custom-legend1">
    {statsData.map((entry, index) => (
      <div key={index} className="legend-item1">
        <div
          className="legend-color1"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></div>
        <span className="legend-label1">{entry.name} </span>
      </div>
    ))}
  </div>
</div>

      </div>

      <div className="bottom-section">
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOrange" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e4731" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2e4731" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d9a500" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#d9a500" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#56c16f" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#56c16f" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="entreprise"
                stackId="2"
                stroke="#2e4731"
                fill="url(#colorOrange)"
              />
              <Area
                type="monotone"
                dataKey="auditeur"
                stackId="1"
                stroke="#d9a500"
                fill="url(#colorBlue)"
              />
              <Area
                type="monotone"
                dataKey="textes"
                stackId="2"
                stroke="#56c16f"
                fill="url(#colorRed)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="calendar">
          <Calendar
           onChange={handleDateChange}
           value={date}
           className="custom-calendar"     // Show the currently selected date
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardS;
