import React, { useState, useEffect} from "react";
import "../pages/BaseGenerale.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { BsEye, BsEyeSlash, BsInfoCircle } from "react-icons/bs";
import { ImFilePdf } from "react-icons/im";
import "../pages/TexteApp.css"
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
const TexteApp = () => {

  const [isAbreviationOpen, setIsAbreviationOpen] = useState(false);
  const [data, setData] = useState([ ]);
  const [textes, setTextes] = useState([]);
  const [checkedTextes, setCheckedTextes] = useState([]);
  useEffect(() => {
    const fetchTextesPourSecteur = async () => {
      try {
        console.log("📥 Début de la récupération des textes pour le secteur");
  
        const token = localStorage.getItem("token");
        if (!token) throw new Error("❌ Aucun token trouvé");
  
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        console.log("✅ ID utilisateur :", userId);
  
        const entrepriseData = JSON.parse(localStorage.getItem("entrepriseToken"));
        if (!entrepriseData || !entrepriseData.sector?._id) {
          throw new Error("❌ Aucune entreprise sélectionnée ou secteur introuvable");
        }
  
        const secteurId = entrepriseData.sector._id;
        console.log("🏢 Secteur de l'entreprise :", secteurId);
  
        // Récupérer tous les textes
        const textesRes = await axios.get("http://localhost:5000/api/auth/alltexte");
        const textesFiltres = textesRes.data.filter((t) => t.secteur === secteurId);
        setTextes(textesFiltres);
        console.log("📝 Textes filtrés :", textesFiltres);
  
        // Récupérer les textes déjà cochés pour l'utilisateur
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${userId}`);
        setCheckedTextes(textesCochesRes.data || []);
        console.log("☑️ Textes déjà cochés :", textesCochesRes.data);
  
      } catch (err) {
        console.error("❌ Erreur lors du chargement :", err.message);
        alert("Une erreur s'est produite lors du chargement des textes.");
      }
    };
  
    fetchTextesPourSecteur();
  }, []);

  const handleAppChange = (id, newStatus) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, app: newStatus } : row
      )
    );
  };
  
 
  
  return (
    <>
     
      <div className="base-container">
    <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Textes applicables</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaSearch className="icon-search" />
    <h2>Recherche Multicritères</h2>
  </div>

<div className="base-rech">
  <div className="filters">
    <div className="form-group">
      <label>Domaine</label>

  

   </div>
    <div className="form-group">
      <label>Sous thème</label>
      <select>

 
</select>    </div>
    <div className="form-group">
      <label>Nature</label>
      <select>
  <option>--Choisir une nature --</option>

</select>
    </div>
   
    <div className="form-group">
      <label>Mot clé</label>
      <input type="text" placeholder="" />
    </div>
  </div>

  <div className="button-group">
    <button className="btn-search"><FaSearch /> Recherche</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>
</div>


        <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Liste des Textes applicables</h3>
    <div 
  className="abreviation" 
  onMouseEnter={() => setIsAbreviationOpen(true)}
  onMouseLeave={() => setIsAbreviationOpen(false)}
>
  <div className="menu-abrev">
    <strong>Abréviation</strong> <BsInfoCircle />           
  </div>

  {isAbreviationOpen && (
    <div className="dropdown-abrev">
      <div className="abrev-item"><span className="abrev-lettre bold">a</span> : abrogeant</div>
      <div className="abrev-item"><span className="abrev-lettre bold">m</span> : modifiant</div>
      <div className="abrev-item"><span className="abrev-lettre bold">c</span> : complétant</div>
      <div className="abrev-item"><span className="abrev-label app">APP</span> : Applicable</div>
      <div className="abrev-item"><span className="abrev-label napp">N APP</span> : Non applicable</div>
      <div className="abrev-item"><span className="abrev-label av">AV</span> : À vérifier</div>
      <div className="abrev-item"><span className="abrev-label info">INFO</span> : Pour information</div>
    </div>
  )}
</div>

  </div>
<div className="line-horiz"></div>

<div className="barre-haut1">
  <Link to="/conformev" className="droite-phrase">
    Evaluation de conformité
    <FiArrowRight className="icon-app" />
  </Link>
</div>

{/* NOUVEAU BOUTON PDF EN DESSOUS */}
<div className="export-section">
  <button className="exp-pdf">Exporter vers PDF <ImFilePdf /></button>
</div>

      <table>
        <thead>
          <tr>
            <th>N°</th>
            <th>Domaine</th>
            <th>Thème</th>
            <th>Sous thème</th>
            <th>Référence</th>
            <th>a/m/c</th>
            <th>Texte</th>
            <th>APP/N APP/Info</th>
            <th>AV/C/NC</th>
            <th>PDF</th>
          </tr>
        </thead>
        <tbody>
        {textes.map((texte, index) => (
  <tr key={texte._id}>
    <td>{index + 1}</td>
    <td>{texte.domaine?.nom || '---'}</td>
    <td>{texte.theme?.nom || '---'}</td>
    <td>{texte.sousTheme?.nom || '---'}</td>
    <td>{texte.reference?.split("\n").map((line, idx) => (
      <div key={idx}>{line}</div>
    ))}</td>
    <td>{texte.type}</td> {/* type peut être "a", "m", "c" */}
    <td><BsEye /></td>
    <td>
      <div className="APP-container">
        <div className={`app-status ${texte.etat?.toLowerCase().replace(' ', '-')}`}>
          {texte.etat}
        </div>
        <div className="menu-APP">
          {["APP", "N APP", "INFO", "AV"].map((option) => (
            <div
              key={option}
              className={`option-APP ${option.toLowerCase().replace(' ', '-')}`}
              onClick={() => handleAppChange(texte._id, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </td>
    <td>{texte.conformite || "---"}</td>
    <td><ImFilePdf /></td>
  </tr>
))}

        </tbody>
      </table>
      <div className="pagination-container">
  <ul className="pagination">
    <li className="btn-item">Précédent</li>
    <li className="btn-item active">1</li>
    <li className="btn-item">2</li>
    <li className="btn-item">3</li>
    <li className="btn-item">Suivant</li>
    <li className="btn-item">Fin</li>
  </ul>
</div>

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default TexteApp;
