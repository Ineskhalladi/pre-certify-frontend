import React, { useState,useEffect} from "react";
import "../pages/Monitoring.css";
import {FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const Monitoring = () => {
  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
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
    createdAt: conf?.createdAt,
    updatedAt: conf?.updatedAt,
   // لعرضها في colonne paramètre
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
  

  
  return (
    <>
     
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Monitoring</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

     <div className="text-list-container">
      <div className="text-list-header">
      <h3 className="text-base1"><FaFolderOpen /> Liste de resultat</h3>
      <div 
    className="abreviation" 
    onMouseEnter={() => setIsAbreviationOpen(true)}
    onMouseLeave={() => setIsAbreviationOpen(false)}
  >
    <div className="menu-abrev2">
      <strong>Codes Couleurs</strong> <BsInfoCircle />           
    </div>
  
    {isAbreviationOpen && (
      <div className="dropdown-abrev22">
        <div className="abrev-item22"><span className="abrev-label22 c2"></span> : Fait Conforme</div>
        <div className="abrev-item22"><span className="abrev-label22 nc2"></span> : Fait Non confrome</div>
      </div>
    )}
  </div>
  </div>
    </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="content-res">
       <div className="search-label-group">
         <label htmlFor="searchInput" className="label-recherche">Recherche :</label>
         <input
           type="text"
           id="searchInput"
            className="search-res"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
     </div>
<table>
  <thead>
    <tr>
      <th>N°</th>
      <th>Référence</th>
      <th>Mai-2025</th>
      <th>Juin-2025</th>
      <th>Juill-2025</th>
      <th>Aout-2025</th>
      <th>Sep-2025</th>
      <th>Oct-2025</th>
      <th>Nov-2025</th>
      <th>Dec-2025</th>
    </tr>
  </thead>
  <tbody>
    {textesExigence
      .filter((texte) =>
        texte.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        texte.nature?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        texte.texte?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((texte, index) => {
        const createdMonth = new Date(texte.createdAt).getMonth();
        const updatedMonth = new Date(texte.updatedAt).getMonth();

        const moisLabels = [
          "Jan-2025", "Fév-2025", "Mars-2025", "Avr-2025",
          "Mai-2025", "Juin-2025", "Juill-2025", "Aout-2025",
          "Sep-2025", "Oct-2025", "Nov-2025", "Dec-2025"
        ];

        const getCell = (monthIndex) => {
          if (monthIndex === createdMonth) {
            return (
              <td style={{ textAlign: "center", backgroundColor: texte.conformiteE === "C" ? "lightgreen" : texte.conformiteE === "NC" ? "#f08080" : "transparent" }}>
                {new Date(texte.createdAt).toLocaleDateString("fr-FR")}
              </td>
            );
          } else if (monthIndex === updatedMonth) {
            return (
              <td style={{ textAlign: "center", backgroundColor: texte.conformiteE === "C" ? "lightgreen" : texte.conformiteE === "NC" ? "#f08080" : "transparent" }}>
                <i>{new Date(texte.updatedAt).toLocaleDateString("fr-FR")}</i>
              </td>
            );
          } else {
            return (
              <td style={{
                textAlign: "center",
                backgroundColor: "#eee",
                color: "#999",
                fontStyle: "italic"
              }}>
                {moisLabels[monthIndex]}
              </td>
            );
          }
        };

        return (
          <tr key={texte._id}>
            <td>{index + 1}</td>
            <td>
              <div><strong>{texte.nature}</strong> : {texte.reference}</div>
              <div style={{ paddingTop: "5px" }}>
                {texte.texte?.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </td>
            {getCell(4)}  {/* Mai */}
            {getCell(5)}  {/* Juin */}
            {getCell(6)}  {/* Juil */}
            {getCell(7)}  {/* Aout */}
            {getCell(8)}  {/* Sept */}
            {getCell(9)}  {/* Oct */}
            {getCell(10)} {/* Nov */}
            {getCell(11)} {/* Déc */}
          </tr>
        );
      })}
  </tbody>
</table>



  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default Monitoring;
