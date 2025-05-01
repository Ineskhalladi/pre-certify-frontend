import React, { useState, useEffect } from "react";
import "../pages/MesResponsables.css";
import { FaFolderOpen, FaPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import axios from "axios";


const MesResponsables = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [responsables, setResponsables] = useState([]);


  useEffect(() => {
    const fetchResponsables = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/allres");
        setResponsables(res.data);
      } catch (err) {
        console.error("Erreur récupération responsables :", err);
      }
    };
  
    fetchResponsables();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce responsable ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/deleteres/${id}`);
        setResponsables(responsables.filter(r => r._id !== id));
      } catch (err) {
        console.error("Erreur suppression :", err);
      }
    }
  };
  
  const handleEdit = async (responsable) => {
    navigate(`/editerresponsable/${responsable._id}`, { state: responsable }); // تم تمرير المسؤول الحالي كـ state إلى صفحة التعديل
  };
  
  return (
    <>
      
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Responsables</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des responsables</h2>
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
  <button className="add-res" onClick={() => navigate("/ajouterresponsable")}>
  <FaPlus />
</button>
</div>


 <table className="responsables-table">
         <thead>
         <tr>
              <th>Responsable</th>
              <th>E-mail</th>
              <th>Tel</th>
              <th>Service</th>
              <th>Actions</th>
            </tr>
         </thead>
         <tbody>
         {responsables
  .filter(r =>
    r.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.emailres.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((resp) => (
    <tr key={resp._id}>
      <td>{resp.prenom} {resp.nom}</td>
      <td>{resp.emailRes}</td>
      <td>{resp.telephone}</td>
      <td>{resp.service}</td>
      <td>
        <div className="action-icones">
          <BiEdit onClick={() => handleEdit(resp._id)} />
          <BiTrash onClick={() => handleDelete(resp._id)} />
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

export default MesResponsables;
