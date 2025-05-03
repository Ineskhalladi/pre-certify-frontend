import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdRefresh } from "react-icons/md";
import { BsFileText } from "react-icons/bs";
import "../pages/CocherTexte.css";
import {jwtDecode} from "jwt-decode";
import { FaSave, FaSyncAlt } from "react-icons/fa";

const CocherTexte = () => {
  const [textes, setTextes] = useState([]);
  const [checkedTextes, setCheckedTextes] = useState([]);

  useEffect(() => {
    const fetchTextesPourSecteur = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.id;
  
        const entreprisesRes = await axios.get("http://localhost:5000/api/auth/entreprises");
        const entreprises = entreprisesRes.data;
  
        const monEntreprise = entreprises.find((e) => e._id === userId);
        if (!monEntreprise) {
          console.error("❌ Aucune entreprise trouvée pour l'utilisateur");
          return;
        }
  
        const secteurId = monEntreprise.sector?._id;
  
        const textesRes = await axios.get("http://localhost:5000/api/auth/alltexte");
        const textes = textesRes.data;
        const textesFiltres = textes.filter((t) => t.secteur === secteurId);
  
        setTextes(textesFiltres);
  
        // Récupérer les textes déjà cochés
        const textesCochesRes = await axios.get(`http://localhost:5000/api/auth/coche/${userId}`);
        
        console.log("Textes cochés récupérés :", textesCochesRes.data.textes);
        setCheckedTextes(textesCochesRes.data.textes || []);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des textes :", err);
      }
    };
  
    fetchTextesPourSecteur();
  }, []);
  
  
  

  const toggleCheck = (id) => {
    setCheckedTextes((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]
    );
  };

  const enregistrerTextesCoches = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
  
      console.log("Textes cochés :", checkedTextes);
  
      await axios.post("http://localhost:5000/api/auth/coche", {
        userId,
        textes: checkedTextes,
      });
  
      alert("✅ Textes enregistrés avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement des textes cochés :", error);
      alert("❌ Une erreur s'est produite.");
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
            <BsFileText className="icon-res" />
            <h2>Liste des textes </h2>
          </div>
        </div>
        <div className="line-horiz-compte"></div>

        <div className="list-container-te">
          {textes.map((t) => (
            <div key={t._id} className={`texte-card ${checkedTextes.includes(t._id) ? "checked" : ""}`}>
            <label className="custom-checkbox">
  <input
    type="checkbox"
    checked={checkedTextes.includes(t._id)}
    onChange={() => toggleCheck(t._id)}
  />
  <span className="checkmark"></span>
  <span className="ref">{t.reference}</span> | <span className="content-te">{t.texte}</span>
</label>

            </div>
          ))}
        </div>
        <div className="button-group">
            <button className="btn-search" onClick={enregistrerTextesCoches} ><FaSave /> Enregistrer</button>
            <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
          </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default CocherTexte;
