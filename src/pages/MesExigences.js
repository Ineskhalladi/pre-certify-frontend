import React, { useState, useEffect} from "react";
import "../pages/MesExigences.css";
import { FaSearch, FaSyncAlt,  FaFolderOpen, FaSave, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { BiTrash } from "react-icons/bi";

const MesExigences = () => {

const [searchTerm, setSearchTerm] = useState("");
const [domaines, setDomaines] = useState([]);
const [natures, setNatures] = useState([]);
const [data, setData] = useState([]);
useEffect(() => {
  const fetchMesEx = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/allmesEx");

      const allData = response.data;

      // Extraire domaines et natures uniques
      const uniqueDomaines = [...new Set(allData.map((item) => item.domaine).filter(Boolean))];
      const uniqueNatures = [...new Set(allData.map((item) => item.nature).filter(Boolean))];

      setDomaines(uniqueDomaines);
      setNatures(uniqueNatures);
 setData(allData);
    setFilteredData(allData);

    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  fetchMesEx();
}, []);

  const [rows, setRows] = useState([
  {
    domaine: "",
    nature: "",
    reference: "",
    applicabilite: "",
    conformite: "",
    texte: ""
  }
]); // <- ici on gère les lignes du tableau
  // ➕ Ajouter une nouvelle ligne vide
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        domaine: "",
        nature: "",
        reference: "",
        applicabilite: "",
        conformite: "",
        texte: ""
      }
    ]);
  };
const handleSubmit = async () => {
  const champsManquants = [];

  rows.forEach((row, i) => {
    const champs = ["domaine", "nature", "reference", "applicabilite", "conformite", "texte"];
    champs.forEach((champ) => {
      if (!row[champ] || row[champ].trim() === "") {
        champsManquants.push(`${champ} (ligne ${i + 1})`);
      }
    });
  });


  try {
    const response = await axios.post("http://localhost:5000/api/auth/mesEx", rows);
    console.log("✅ Réponse du serveur :", response.data);
    alert("Exigences enregistrées avec succès !");
  } catch (error) {
    console.error("❌ Erreur :", error);
    alert("Erreur lors de l'enregistrement.");
  }
};

const handleChange = (index, e) => {
  const { name, value } = e.target;
  const updatedRows = [...rows];

  // نعمل distinction بين les noms
  if (name === "domaineSelect" || name === "domaineInput") {
    updatedRows[index]["domaine"] = value;
  } else if (name === "natureSelect" || name === "natureInput") {
    updatedRows[index]["nature"] = value;
  } else {
    updatedRows[index][name] = value;
  }

  setRows(updatedRows);
};

  // 🗑 Supprimer une ligne spécifique
  const handleDeleteRow = (indexToDelete) => {
    setRows(rows.filter((_, index) => index !== indexToDelete));
  };

   const [showModalEX, setShowModalEX] = useState(false);
  const [exigencesEX, setExigencesEX] = useState([{ texte: "", statut: "AV" }]);

useEffect(() => {
  if (showModalEX && !selectedTexteId) {
    setExigencesEX([{ texte: "", statut: "AV" }]);
  }
}, [showModalEX]);


  const handleAddLineEX = () => {
    setExigencesEX([...exigencesEX, { texte: "", statut: "AV" }]);
  };

  const handleRemoveLineEX = (index) => {
    const updated = exigencesEX.filter((_, i) => i !== index);
    setExigencesEX(updated);
  };

  const handleChangeEX = (index, field, value) => {
    const updated = [...exigencesEX];
    updated[index][field] = value;
    setExigencesEX(updated);
  };


 const handleCancelEX = () => {
  setExigencesEX([{ texte: "", statut: "AV" }]);
  setSelectedTexteId(null);
  setShowModalEX(false);
};


const handleSaveEX = async () => {
  try {
    const data = exigencesEX.filter(item => item.texte && item.statut);

    if (data.length === 0) {
      alert("Veuillez ajouter au moins une exigence complète.");
      return;
    }

 const exigencesPayload = data.map((exigenceAssociee, i) => ({
  texte: exigenceAssociee.texte,
  statut: exigenceAssociee.statut,
  texteId: exigenceAssociee.texteId || null,
}));



    console.log("Exigences à envoyer :", exigencesPayload);

    const response = await axios.post("http://localhost:5000/api/auth/autreex", exigencesPayload);

    console.log("✅ Réponse backend :", response.data);
    alert("Exigences enregistrées avec succès !");
    setShowModalEX(false);
    setExigencesEX([]);
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi :", error);
    alert("Erreur lors de l'enregistrement des exigences.");
  }
};

  const [exigences, setExigences] = useState([]);

  // Récupérer les exigences lors du chargement du composant
  useEffect(() => {
    const fetchExigences = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/allautreEx");
        setExigences(response.data.data); // Assurez-vous que la clé `data` contient les exigences
      } catch (error) {
        console.error("❌ Erreur lors de la récupération des exigences :", error);
      }
    };

    fetchExigences();
  }, []);
  
const [selectedTexteId, setSelectedTexteId] = useState(null);
const [selectedDomaine, setSelectedDomaine] = useState("");
const [selectedNature, setSelectedNature] = useState("");
const [filteredData, setFilteredData] = useState([]);

const handleSearch = () => {
  const results = data.filter((item) => {
    const domaineMatch = selectedDomaine ? item.domaine === selectedDomaine : true;
    const natureMatch = selectedNature ? item.nature === selectedNature : true;
    return domaineMatch && natureMatch;
  });
  setFilteredData(results);
};

const handleReset = () => {
  setSelectedDomaine("");
  setSelectedNature("");
  setFilteredData(data); // ترجع الكل
};

  return (
    <>
      
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
   <select value={selectedDomaine} onChange={(e) => setSelectedDomaine(e.target.value)}>
  <option value="">--Choisir un domaine--</option>
  {domaines.map((domaine, index) => (
    <option key={index} value={domaine}>{domaine}</option>
  ))}
</select>

  </div>

  <div className="form-group">
    <label>Nature</label>
    <select value={selectedNature} onChange={(e) => setSelectedNature(e.target.value)}>
  <option value="">--Choisir une nature--</option>
  {natures.map((nature, index) => (
    <option key={index} value={nature}>{nature}</option>
  ))}
</select>
  </div>
</div>

   <div className="button-group">
  <button className="btn-search" onClick={handleSearch}><FaSearch /> Recherche</button>
  <button className="btn-cancel" onClick={handleReset}><FaSyncAlt /> Annuler</button>
</div>
  </div>
</div>
 <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Ajouter référence</h3>

  </div>
<div className="line-horiz"></div>
<div className="button-group">
    <button className="btn-search" onClick={handleSubmit}><FaSave /> Enregistrer</button>
    <button className="btn-cancel"><FaSyncAlt /> Annuler</button>
  </div>
<div className="content-resM">
       <div className="search-label-groupM">
         <label htmlFor="searchInput" className="label-rechercheM">Recherche :</label>
         <input
           type="text"
           id="searchInputM"
            className="search-resM"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>
       <button className="add-res" onClick={handleAddRow}>
       <FaPlus />
     </button>
     </div>

<table>
         <thead>
         <tr>
              <th>Domaine</th>
              <th>Nature</th>
              <th>Référence</th>
              <th>App/N APP/AV</th>
              <th>Av/C/NC</th>
              <th>Texte</th>
              <th>Action</th>


            </tr>
         </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <select
                  name="domaineSelect"
                  value={row.domaine}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">--Choisir un domaine--</option>
                  {domaines.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                  ))}
                </select>
                <br />
                <input
                  type="text"
                  name="domaineInput"
                  placeholder="Nouveau domaine"
                  value={row.domaine}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <select
                  name="natureSelect"
                  value={row.nature}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">--Choisir une nature--</option>
                  {natures.map((n, idx) => (
                    <option key={idx} value={n}>{n}</option>
                  ))}
                </select>
                <br />
                <input
                  type="text"
                  name="natureInput"
                  placeholder="Nouveau nature"
                  value={row.nature}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="reference"
                  placeholder="Nouveau référence"
                  value={row.reference}
                  onChange={(e) => handleChange(index, e)}
                />
              </td>
              <td>
                <select
                  name="applicabilite"
                  value={row.applicabilite}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">-- Choisir --</option>
                  <option value="APP">APP</option>
                  <option value="NAPP">NAPP</option>
                  <option value="AV">AV</option>
                </select>
              </td>
              <td>
                <select
                  name="conformite"
                  value={row.conformite}
                  onChange={(e) => handleChange(index, e)}
                >
                  <option value="">-- Choisir --</option>
                  <option value="C">C</option>
                  <option value="AV">AV</option>
                  <option value="NC">NC</option>
                </select>
              </td>
              <td>
                <textarea
                  name="texte"
                  value={row.texte}
                  onChange={(e) => handleChange(index, e)}
                ></textarea>
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)} style={{ border: "none", background: "none" }}>
                  <BiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>

       </table>
    </div>
  <div className="pagination-container">
  <ul className="pagination">
    <li className="btn-item">Précédent</li>
    <li className="btn-item active">1</li>
    <li className="btn-item">Suivant</li>
    <li className="btn-item">Fin</li>
  </ul>
</div>

    <div className="text-list-container">
        <div className="text-list-header">
    <h3 className="text-base"><FaFolderOpen /> Liste mes autres exigences</h3>

  </div>
<div className="line-horiz"></div>


 <table>
  <thead>
    <tr>
      <th>Domaine</th>
      <th>Nature</th>
      <th>Référence</th>
      <th>App/N APP/AV</th>
      <th>Av/C/NC</th>
      <th>Texte</th>
      <th>Exigences</th>
      <th>Av/C/NC</th>
    </tr>
  </thead>
<tbody>
 {filteredData.map((texte, index) => {
    // تعديل هذا الجزء لاستخدام texteId بشكل صحيح
const exigenceAssociee = exigences.find(
  (item) =>
    item.texteId &&
    item.texteId._id?.toString() === texte._id.toString()
);

    return (
      <tr key={index}>
        <td>{texte.domaine}</td>
        <td>{texte.nature}</td>
        <td>{texte.reference}</td>
        <td>
          <div className="APP-container">
            <div className={`app-status ${texte.applicabilite?.toLowerCase()}`}>
              {texte.applicabilite || ""}
            </div>
            <div className="menu-APP">
              {["APP", "N APP", "AV"].map((option) => (
                <div
                  key={option}
                  className={`option-APP ${option.toLowerCase().replace(" ", "-")}`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </td>
        <td>
          <div className="Status-container">
            <div className={`status-label status-${texte.conformite?.toLowerCase()}`}>
              {texte.conformite || ""}
            </div>
            <div className="menu-Status">
              {["C", "AV", "NC"].map((option) => (
                <div
                  key={option}
                  className={`option-Status status-${option.toLowerCase()}`}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        </td>
        <td>{texte.texte}</td>

        {/* 🟩 Colonne Exigence */}
        <td>
          <button
            className="add-res"
         onClick={() => {
  setSelectedTexteId(texte._id);
  setExigencesEX([
    {
      texte: "",
      statut: "",
      texteId: texte._id,  // اربط exigence بالـ texteId
    },
  ]);
  setShowModalEX(true);

            }}
          >
            <FaPlus />
          </button>

          {/* Affichage automatique de l’exigence */}
          {exigenceAssociee && (
            <div className="exigence-texte">{exigenceAssociee.texte}</div>
          )}
        </td>

        {/* 🟩 Colonne Statut de l’exigence */}
        <td>
          {exigenceAssociee && (
            <div className="Status-container">
              <div className={`status-label status-${exigenceAssociee.statut?.toLowerCase()}`}>
                {exigenceAssociee.statut}
              </div>
              <div className="menu-Status">
                {["C", "AV", "NC"].map((option) => (
                  <div
                    key={option}
                    className={`option-Status status-${option.toLowerCase()}`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          )}
        </td>
      </tr>
    );
  })}
</tbody>



</table>

      {/* Mettre ceci en dehors du tableau, tout en bas du JSX */}
{showModalEX && (
  <div className="overlay">
   <div className="modal-box">
  <div className="modal-header">
    <h2 className="text-base">Ajouter Exigence</h2>
    <button className="add-res" onClick={handleAddLineEX}>
      <FaPlus />
    </button>
  </div>
  <div className="line-horiz2"></div>


      {exigencesEX.map((item, index) => (
        <div className="form-line" key={index}>
          <textarea
            placeholder="Exigence"
            value={item.texte}
            onChange={(e) => handleChangeEX(index, "texte", e.target.value)}
          />
          <select
            value={item.statut}
            onChange={(e) => handleChangeEX(index, "statut", e.target.value)}
          >
            <option value="AV">A vérifier</option>
            <option value="C">Conforme</option>
            <option value="NC">Non Conforme</option>
          </select>

            <FaTrash onClick={() => handleRemoveLineEX(index)} />
          
        </div>
      ))}
      <div className="actions">
       
        <button onClick={handleSaveEX} className="btn-search">
          Enregistrer <FaSave />
        </button>
        <button onClick={handleCancelEX} className="btn-cancel">
          Annuler <FaSyncAlt />
        </button>
      </div>
    </div>
  </div>
)}

    </div>
      </div>
    <p className="footer-base">Copyright © 2025 PreCertify. Tous les droits réservés.</p>
    </>
  );
};

export default MesExigences;
