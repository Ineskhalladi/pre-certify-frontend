import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AjouteAuditeur = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [entreprises, setEntreprises] = useState([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState([]); // ✅ PAS ""


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
    if (!nom  || !email || !motDePasse || !selectedEntreprise) {
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
      console.log("nourhen hiii", data);
      const resp = await axios.post("http://localhost:5000/api/auth/ajoutaudit", data);

      console.log("hooooooooooooooooo", resp.data);
      
        alert("Auditeur ajouté avec succès !");
        navigate("/auditeur");
      } catch (err) {
        console.error("Erreur enregistrement auditeur :", err);
        alert("Échec de l'enregistrement !");
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
          <label>Nom et Prenom</label>
          <input
            type="text"
            className="input-compte"
            placeholder="Ajouter le nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
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

<label>Entreprises</label>
<div className="checkbox-list-A">
  {entreprises.map((ent) => {
    const isChecked = selectedEntreprise.some(e => e._id === ent._id);

    return (
      <label key={ent._id} className="checkbox-item-A">
        <input
          type="checkbox"
          className="chex"
          checked={isChecked}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedEntreprise([...selectedEntreprise, {
                _id: ent._id,
                name: ent.name,
                rnu: ent.rnu
              }]);
            } else {
              setSelectedEntreprise(selectedEntreprise.filter(e => e._id !== ent._id));
            }
          }}
        />
        {ent.name} - RNU: {ent.rnu}
      </label>
    );
  })}
</div>



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
