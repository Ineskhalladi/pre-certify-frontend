import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjouteAuditeur = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [entreprises, setEntreprises] = useState([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState(""); 


  // Charger les entreprises vérifiées au montage
  useEffect(() => {
    const fetchEntreprises = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/entreprises");
        console.log("✅ entreprises:", res.data); // check if list comes

        setEntreprises(res.data); // supposant que c’est un tableau d'entreprises
      } catch (err) {
        console.error("Erreur de chargement des entreprises :", err);
      }
    };
  
    fetchEntreprises();
  }, []);
  
 

  // ▶ Enregistrer un auditeur
  const handleSave = async () => {
    if (!nom || !prenom || !email || !motDePasse || !selectedEntreprise) {
      alert("Veuillez remplir tous les champs.");

      return;
    }
    console.log("selectedEntreprise",selectedEntreprise.name)
    try {
      const data = {
        nom,
        email,
        motDePasse,
        entrepriseId: selectedEntreprise,
      };

      await axios.post("http://localhost:5000/api/auth/ajoutaudit", data);
      alert("Auditeur ajouté avec succès !");
      navigate("/auditeur");
    } catch (err) {
      console.error("Erreur enregistrement auditeur :", err);
      alert("Échec de l'enregistrement !");
    }
  };

  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Auditeur</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaUserPlus className="icon-res" />
            <h2>Ajouter Auditeur</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>
        <div className="form-compte">
          <label>Nom</label>
          <input
            type="text"
            className="input-compte"
            placeholder="Ajouter le nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          <label>Prénom</label>
          <input
            type="text"
            className="input-compte"
            placeholder="Ajouter le prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            className="input-compte"
            placeholder="Ajouter l'e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            className="input-compte"
            placeholder="Entrer le mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
          />

<label>Entreprise</label>
<select
  className="input-compte-select"
  value={selectedEntreprise ? JSON.stringify(selectedEntreprise) : ""}
  onChange={(e) => setSelectedEntreprise(JSON.parse(e.target.value))}
>
  <option value="">-- Sélectionner une entreprise --</option>
  {entreprises.map((ent) => (
    <option
      key={ent.name}
      value={JSON.stringify({ rnu: ent.rnu, name: ent.name,identre:ent._id })}
    >
      {ent.name} - RNU: {ent.rnu}
    </option>
  ))}
</select>


        </div>

        <div className="button-group">
          <button className="btn-search" onClick={handleSave}>
            <FaSave /> Enregistrer
          </button>
          <button className="btn-cancel" onClick={() => navigate("/auditeur")}>
            <FaSyncAlt /> Annuler
          </button>
        </div>
      </div>

      <p className="footer-base">
        Copyright © 2025 PreCertify. Tous les droits réservés.
      </p>
    </>
  );
};

export default AjouteAuditeur;
