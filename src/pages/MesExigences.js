import React, { useState, useEffect} from "react";
import "../pages/MesExigences.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen, FaSave, FaPlus } from "react-icons/fa";
import NavBar2 from "../components/NavBar2";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const MesExigences = () => {

   const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      domaine: "qualité 1",
      nature: "code 1",
      reference:"loi organique",
      statusAvant: "",
      app: "N APP",
      statusApres:"",
      
    },
  
  ]);
  
  const handleStatusChange = (id, newStatus, champ) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, [champ]: newStatus } : row
      )
    );
  };
  const handleAppChange = (id, newStatus) => {
    setData(prevData =>
      prevData.map(row =>
        row.id === id ? { ...row, app: newStatus } : row
      )
    );
  };
 
  const [domaines, setDomaines] = useState([]);
  const [selectedDomaine, setSelectedDomaine] = useState("");
  const [natures, setNatures] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id; // ou decoded._id selon ton backend
  
        axios
          .get(`http://localhost:5000/api/auth/user/${userId}/domaines`)
          .then((res) => {
            setDomaines(res.data);
          })
          .catch((err) => {
            console.error("Erreur lors du chargement des domaines :", err);
          });
      } catch (error) {
        console.error("Erreur lors du décodage du token :", error);
      }
    } else {
      console.warn("Token non trouvé dans le localStorage");
    }
  }, []);
  
 
  
  return (
    <>
      <NavBar2 />
      <div className="base-container">
      <div className="search-container">
  <div className="header-top">
    <h1 className="titre-base">Mes exigences</h1>
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
      <select value={selectedDomaine} onChange={(e) => {
  const selectedId = e.target.value;
  setSelectedDomaine(selectedId);

  // Trouve le domaine sélectionné
  const domaineChoisi = domaines.find(d => d._id === selectedId);
  // Mets à jour la liste des natures
  setNatures(domaineChoisi ? domaineChoisi.nature : []);

}}>
  <option value="">--Choisir un domaine--</option>
  {domaines.map((domaine) => (
    <option key={domaine._id} value={domaine._id}>
      {domaine.nom}
    </option>
  ))}
</select>
    </div>
    
    
    <div className="form-group">
      <label>Nature</label>
      <select>
  <option>--Choisir une nature --</option>
  {natures.map((nature, idx) => (
    <option key={idx} value={nature}>{nature}</option>
  ))}
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
    <h3 className="text-base"><FaFolderOpen /> Ajouter référence</h3>

  </div>
<div className="line-horiz"></div>
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
       <button className="add-res">
       <FaPlus />
     </button>
     </div>
<div className="button-group">
    <button className="btn-search"><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
<table>
         <thead>
         <tr>
              <th>Domaine</th>
              <th>Nature</th>
              <th>Référence</th>
              <th>App/N APP/AV</th>
              <th>Av/C/NC</th>
              <th>PDF</th>
              <th>Action</th>


            </tr>
         </thead>
         <tbody>
            <tr>
           <td>
            <select>
                <option>--Choisir un domaine--</option>
            </select>
            <br></br>
            <input type="text" placeholder="Nouveau domaine"/>
           </td>
           <td>
           <select>
                <option>--Choisir un nature--</option>
            </select>
            <br></br>
            <input type="text" placeholder="Nouveau nature"/>
           </td>
           <td>
           <input type="text" placeholder="Nouveau référence"/>
           </td>
           <td>
           <select>
                <option>Applicable</option>
                <option>Non applicable</option>
                <option>A vérifier</option>

            </select>
           </td>
           <td>
           <select>
                <option>A vérifier</option>
                <option>Conforme</option>
                <option>Non conforme</option>
            </select>
           </td>
           <td>
           <input type="file" />

           </td>
           <td></td>
           </tr>
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
    
    <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Liste mes autres exigences</h3>

  </div>
<div className="line-horiz"></div>
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
     </div>
<div className="button-group">
    <button className="btn-search"><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
<table>
         <thead>
         <tr>
              <th>Domaine</th>
              <th>Nature</th>
              <th>Référence</th>
              <th>App/N APP/AV</th>
              <th>Av/C/NC</th>
              <th>PDF</th>
              <th>Exigences</th>
              <th>Av/C/NC</th>
              <th>Action</th>


            </tr>
         </thead>
         <tbody>
         {data.map((row) => (
            <tr key={row.id}>
              <td>{row.domaine}</td>
              <td>{row.nature}</td>
              <td>
                {row.reference.split("\n").map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </td>
           <td> 
           <div className="APP-container">
    <div className={`app-status ${row.app.toLowerCase().replace(' ', '-')}`}>
      {row.app}
    </div>
    <div className="menu-APP">
      {["APP", "N APP", "INFO", "AV"].map((option) => (
        <div
          key={option}
          className={`option-APP ${option.toLowerCase().replace(' ', '-')}`}
          onClick={() => handleAppChange(row.id, option)}
        >
          {option}
        </div>
      ))}
    </div>
  </div>
           </td>
           <td>  <div className="Status-container">
  <div className={`status-label status-${row.statusAvant?.toLowerCase()}`}>
  {row.statusAvant}
</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
    onClick={() => handleStatusChange(row.id, option, "statusAvant")}
  >
    {option}
  </div>
))}

    </div>
  </div></td>
           <td> <ImFilePdf /></td>
           <td>  
            <button className="add-res">
       <FaPlus />
     </button></td>
     <td>
     <div className="Status-container">
  <div className={`status-label status-${row.statusAvant?.toLowerCase()}`}>
  {row.statusAvant}
</div>

    <div className="menu-Status">
    {["C", "AV", "NC"].map((option) => (
  <div
    key={option}
    className={`option-Status status-${option.toLowerCase()}`}
    onClick={() => handleStatusChange(row.id, option, "statusAvant")}
  >
    {option}
  </div>
))}

    </div>
  </div>
     </td>
     <td></td>

           </tr>
                     ))}

         </tbody>
       </table>

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default MesExigences;
