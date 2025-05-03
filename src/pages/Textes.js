import React, { useState, useEffect} from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaSyncAlt, FaUser, FaSave, FaFolderOpen, FaPlus } from "react-icons/fa";
import NavBar3 from "../components/NavBar3";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BiEdit, BiTrash } from "react-icons/bi";
const Textes = () => {

  const [secteurs, setSecteurs] = useState([]);

  useEffect(() => {
    const fetchSecteurs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/secteurs");
        setSecteurs(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des secteurs :", err);
      }
    };
  
    fetchSecteurs();
  }, []);
  const Comparesecteur = (id) => {
    const secteur = secteurs.find((s) => s._id === id);
    return secteur ? secteur.nom : "Secteur inconnu"; // ✅ return ajouté
  };
  
  
  
  
  const [domainesParSecteur, setDomainesParSecteur] = useState({});
  const fetchDomainesBySecteur = async (secteurId) => {
    if (domainesParSecteur[secteurId]) return; // déjà chargés
  
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/domaines/bySecteur/${secteurId}`);
      setDomainesParSecteur(prev => ({
        ...prev,
        [secteurId]: res.data,
      }));
    } catch (error) {
      console.error("Erreur chargement domaines du secteur :", error);
    }
  };
  const Comparedomaine = (domaineId, secteurId) => {
    const domaines = domainesParSecteur[secteurId];
  
    if (!domaines) {
      // Lancer le chargement si pas encore fait
      fetchDomainesBySecteur(secteurId);
      return "Chargement...";
    }
  
    const domaine = domaines.find((d) => d._id === domaineId);
    return domaine ? domaine.nom : "Domaine inconnu";
  };
  /********************************** */
  const [themesParDomaine, setThemesParDomaine] = useState({});
  const fetchThemesByDomaine = async (domaineId) => {
    if (themesParDomaine[domaineId]) return; // déjà chargés
  
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/themes/byDomaine/${domaineId}`);
      setThemesParDomaine(prev => ({
        ...prev,
        [domaineId]: res.data,
      }));
    } catch (error) {
      console.error("Erreur chargement des thèmes :", error);
    }
  };
  const Comparetheme = (themeId, domaineId) => {
    const themes = themesParDomaine[domaineId];
  
    if (!themes) {
      fetchThemesByDomaine(domaineId); // lancer la requête
      return "Chargement...";
    }
  
    const theme = themes.find((t) => t._id === themeId);
    return theme ? theme.nom : "Thème inconnu";
  };
  /**************************** */
  const [sousThemesParTheme, setSousThemesParTheme] = useState({});
  const fetchSousThemesByTheme = async (themeId) => {
    if (sousThemesParTheme[themeId]) return; // déjà chargés
  
    try {
      const res = await axios.get(`http://localhost:5000/api/auth/sousthemes/byTheme/${themeId}`);
      setSousThemesParTheme(prev => ({
        ...prev,
        [themeId]: res.data,
      }));
    } catch (error) {
      console.error("Erreur chargement des sous-thèmes :", error);
    }
  };
  const ComparesousTheme = (sousThemeId, themeId) => {
    const sousThemes = sousThemesParTheme[themeId];
  
    if (!sousThemes) {
      fetchSousThemesByTheme(themeId); // lancer la requête
      return "Chargement...";
    }
  
    const sousTheme = sousThemes.find((s) => s._id === sousThemeId);
    return sousTheme ? sousTheme.nom : "Sous-thème inconnu";
  };
  

/****************************** */
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [textes, setTextes] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/auth/alltexte")
        .then((res) => setTextes(res.data))
        .catch((err) => console.error("Erreur lors du chargement des textes :", err));
    }, []);
    
    const handleDelete = async (id) => {
      try {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce texte ?");
        if (confirmation) {
          await axios.delete(`http://localhost:5000/api/auth/deletetexte/${id}`);
          setTextes(textes.filter(texte => texte._id !== id)); // Retirer le texte supprimé de l'état local
        }
      } catch (err) {
        console.error("Erreur lors de la suppression du texte :", err);
        alert("Une erreur est survenue lors de la suppression.");
      }
    };
    
    return (
      <>
      
        <div className="base-container">
          <div className="search-container">
            <div className="header-top">
              <h1 className="titre-base">Textes</h1>
              <div className="icon-actions">
                <span className="icon-base" title="Réduire">─</span>
                <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
                <span className="icon-base" title="Agrandir">⛶</span>
              </div>
            </div>
  
            <div className="titre-multicritere">
              <FaFolderOpen className="icon-res" />
              <h2>Liste des textes</h2>
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
    <button className="add-res" onClick={() => navigate("/ajoutetexte")}>
    <FaPlus />
  </button>
  </div>
  
  
   <table className="responsables-table">
           <thead>
           <tr>
           <th>Secteur</th>
      <th>Domaine</th>
      <th>Thème</th>
      <th>Sous-thème</th>
      <th>Nature</th>
      <th>Service</th>
      <th>Texte</th>
      <th>Référence</th>
      <th>Type</th>
      <th>Action</th>

              </tr>
           </thead>
           <tbody>
    
      {textes.map((t) => (
      <tr key={t._id}>
        <td>{Comparesecteur(t.secteur)}</td>
        <td>{Comparedomaine(t.domaine,t.secteur)}</td>
        <td>{Comparetheme(t.theme,t.domaine)}</td>
        <td>{ComparesousTheme(t.sousTheme,t.theme)}</td>

        <td>{t.nature}</td>
        <td>{t.service}</td>
        <td>{t.texte}</td>
        <td>{t.reference}</td>
        <td>{t.typeTexte}</td>

        <td>
          <div className="action-icones">
            <BiEdit onClick={() => navigate(`/editetexte/${t._id}`)}  />
            <BiTrash onClick={() => handleDelete(t._id)}  />
          </div>
        </td>
      </tr>
    
      ))}
          </tbody>
              
           
         </table>
  
         <div className="pagination-container">
    <ul className="pagination">
      <li className="btn-item">Précédent</li>
      <li className="btn-item active">1</li>
      <li className="btn-item">Suivant</li>
      <li className="btn-item">Fin</li>
    </ul>
  </div>
        </div>
  
        <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
      </>
    );
  };
  
  export default Textes;
  