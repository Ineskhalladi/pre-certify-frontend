import React, { useState, useEffect } from "react";
import "../pages/Veille.css";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaFolderOpen } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import axios from "axios";
import { BiEdit, BiTrash } from "react-icons/bi";

const ListeDesDemandes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/demandes")
      .then((res) => {
        setDemandes(res.data); 
        console.log("resresresres",res)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  
  
  
  const handleAccept = (userId) => {
    axios.put(`http://localhost:5000/api/auth/accept/${userId}`)
      .then(() => {
        setDemandes(demandes.filter((d) => d._id !== userId));
      });
  };
  
  const handleRefuse = (userId) => {
    axios.delete(`http://localhost:5000/api/auth/refuse/${userId}`)
      .then(() => {
        setDemandes(demandes.filter((d) => d._id !== userId));
      });
  };
  
  return (
    <>
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Liste des demandes</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des demandes d'inscription</h2>
          </div>
        </div>

        <div className="line-horiz-compte"></div>

        <table className="responsables-table">
          <thead>
            <tr>
              <th>Nom </th>
              <th>Email</th>
              <th>RNU</th>
              <th>Secteur</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {demandes
 .filter((d) =>
    (d.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (d.rnu?.toString().includes(searchTerm)) ||
    (d.sector?.toLowerCase().includes(searchTerm.toLowerCase()))

  )
  
  .map((demande) => (
    <tr key={demande._id}>
      <td>{demande.name}</td>
      <td>{demande.email}</td>
      <td>{demande.rnu}</td>
      <td>{demande.sector?.nom}</td>
      <td>
        <div className="action-icones">
          <button className="btn-cancel" onClick={() => handleAccept(demande._id)}>Accepter✅</button>
          <button className="btn-cancel" onClick={() => handleRefuse(demande._id)}>Refuser❌</button>
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

export default ListeDesDemandes;
