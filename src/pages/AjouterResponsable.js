import React, { useEffect, useState} from "react";
import "../pages/AjouterResponsable.css";
import { FaSyncAlt, FaSave, FaUserPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const AjouterResponsable = () => {
const [nom, setNom] = useState("");
const [email, setEmail] = useState("");
const [telephone, setTelephone] = useState("");
const [accesActions, setAccesActions] = useState(false);
 const [motDePasse, setMotDePasse] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/ajoutres", {
        nom,
        email,
        motDePasse,
        telephone,
        accesActions,
        createdBy: userEmail,
      });
  
      alert(" Responsable ajouté avec succès !");
      navigate("/mesresponsables");
  
    } catch (err) {
      console.error("Erreur ajout responsable :", err);
  
      // ✅ Retourner l'erreur dans un alert
      if (err.response && err.response.data && err.response.data.error) {
        alert(`❌ ${err.response.data.error}`);
      } else {
        alert("❌ Erreur lors de l'ajout !");
      }
    }
  };
  
  

  return (
    <>
      
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Responsable</h1>
    <div className="icon-actions">
      <span className="icon-base" title="Réduire">─</span>
      <span className="icon-base" title="Rafraîchir"><MdRefresh/></span>
      <span className="icon-base" title="Agrandir">⛶</span>
    </div>
  </div>

  <div className="titre-multicritere">
    <FaUserPlus className="icon-res" />
    <h2>Ajouter responsable </h2>
  </div>
  </div>
  <div className="line-horiz-compte"></div>
  <div className="form-ajout-responsable">
  <div className="form-row">
    <div className="form-col">
      <label>Nom et Prénom</label>
      <input type="text" className="input-res" placeholder="Entrer le nom et prenom "  value={nom}
          onChange={(e) => setNom(e.target.value)}/>
    </div>
    <div className="form-col">
      <label>E-mail</label>
      <input type="email" className="input-res" placeholder="Entrer l'email "  value={email}
          onChange={(e) => setEmail(e.target.value)}/>
    </div>
  </div>

  <div className="form-row">
    <div className="form-col">
      <label>Mot de passe</label>
      <input type="email" className="input-res" placeholder="Entrer password "  value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}/>
    </div>
    <div className="form-col">
      <label>Téléphone</label>
      <input type="text" className="input-res" placeholder="Entrer le numéro de phone"  value={telephone}
          onChange={(e) => setTelephone(e.target.value)}/>
    </div>
  </div>



  <div className="form-row form-row-bottom">
    <div className="form-col">
      <label>Associer ce compte à un compte utilisateur</label>
      <select className="input-res" >
  <option>-- Choisir compte user--</option>
  <option>{userEmail}</option>

</select>

    </div>

    <div className="form-col">
      <label>Donner accès à modifier les actions d'un responsable</label>
      <label className="switch">
  <input type="checkbox" checked={accesActions} onChange={(e) => setAccesActions(e.target.checked)} />
  <span className="slider round"></span>
      </label>
    </div>
  </div>
</div>



<div className="button-group">
    <button className="btn-search" onClick={handleSave}><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
  </div>

    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default AjouterResponsable ;
