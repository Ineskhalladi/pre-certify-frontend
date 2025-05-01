import React, { useEffect, useState } from "react";
import "../pages/MesServices.css";
import {  FaFolderOpen, FaPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import axios from "axios";


const MesServices = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/allservice");
    setServices(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العنصر؟")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/deleteservice/${id}`);
        fetchServices(); // إعادة التحديث
      } catch (error) {
        console.error("خطأ أثناء الحذف:", error);
      }
    }
  };

  const handleEdit = (service) => {
    navigate(`/editerservice/${service._id}`, { state: service });
  };

  const filteredServices = services.filter((service) =>
    service.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
 
      <div className="base-container">
        <div className="search-container">
          <div className="header-top">
            <h1 className="titre-base">Services</h1>
            <div className="icon-actions">
              <span className="icon-base" title="Réduire">─</span>
              <span className="icon-base" title="Rafraîchir"><MdRefresh /></span>
              <span className="icon-base" title="Agrandir">⛶</span>
            </div>
          </div>

          <div className="titre-multicritere">
            <FaFolderOpen className="icon-res" />
            <h2>Liste des services</h2>
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
  <button className="add-res" onClick={() => navigate("/ajouterservice")}>
  <FaPlus />
</button>
</div>


 <table className="responsables-table">
         <thead>
         <tr>
              <th>Nom</th>
              <th>Actif</th>
              <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {filteredServices.map((service) => (
              <tr key={service._id}>
                <td>{service.nom}</td>
                <td>{service.actif ? "✅" : "❌"}</td>
                <td>
                  <div className="action-icones">
                    <BiEdit  onClick={() => handleEdit(service)} className="icon-action" title="Modifier"  />
                    <BiTrash onClick={() => handleDelete(service._id)} className="icon-action" title="Supprimer" />
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

export default MesServices;
