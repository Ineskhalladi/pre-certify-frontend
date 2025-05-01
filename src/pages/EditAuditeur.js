import React, { useEffect, useState } from "react";
import "../pages/AjouterResponsable.css";
import { FaSave, FaEdit } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditerAuditeur = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [entreprises, setEntreprises] = useState([]);
  const [selectedEntreprise, setSelectedEntreprise] = useState(""); 
  const [auditeurs, setAuditeurs] = useState([]);
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/allaudit") // Remplace cette URL si besoin
      .then((res) => setAuditeurs(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des auditeurs :", err)
      );
  }, []);

  
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

  // Enregistrement des modifications
  const handleUpdate = async () => {
   
    try {
      const data = {
        nom,
        prenom,
        email,
        motDePasse,
        entrepriseId: selectedEntreprise,
      };

      await axios.put(`http://localhost:5000/api/auth/updateaudit/${id}`, data);
      alert("Auditeur modifié avec succès !");
      navigate("/auditeur");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Échec de la mise à jour !");
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
            <FaEdit className="icon-res" />
            <h2>Modifier Auditeur</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>
        <div className="form-compte">
          <label>Nom</label>
          <input type="text" className="input-compte" value={nom} onChange={(e) => setNom(e.target.value)} />

          <label>Prénom</label>
          <input type="text" className="input-compte" value={prenom} onChange={(e) => setPrenom(e.target.value)} />

          <label>Email</label>
          <input type="email" className="input-compte" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Mot de passe</label>
          <input type="password" className="input-compte" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />

                  <label>Entreprise</label>
          <select
  className="input-compte-select"
  value={selectedEntreprise}
  onChange={(e) => setSelectedEntreprise(e.target.value)}
>
  <option value="">-- Sélectionner une entreprise --</option>
  {entreprises.map((ent) => (
    <option key={ent._id} value={ent._id}>
      {ent.name} - RNU: {ent.rnu}
    </option>
  ))}
</select>
        </div>

        <div className="button-group">
          <button className="btn-search" onClick={handleUpdate}><FaSave /> Enregistrer</button>
          <button className="btn-cancel" onClick={() => navigate("/auditeur")}><FaEdit /> Annuler</button>
        </div>
      </div>

      <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default EditerAuditeur;
