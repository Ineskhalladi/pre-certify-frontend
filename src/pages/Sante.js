import React from 'react';
import './Secteurs.css';  // Import du fichier CSS

const normesSante = [
  { nom: "ISO 13485", description: "Gestion de la qualité pour les dispositifs médicaux." },
  { nom: "ISO 15189", description: "Laboratoires médicaux, gestion de la qualité des tests." },
  { nom: "ISO 45001", description: "Santé et sécurité au travail dans les établissements médicaux." }
];

const Sante = () => {
  
  return (
    <div className="secteur-page">
      <header className="secteur-header">
        <div className="secteur-banner">
          <img src="hospital_image.jpg" alt="Secteur Santé" />
        </div>
        <div className="secteur-info">
          <h1>Secteur Santé</h1>
          <p>Les normes ISO garantissent la qualité des soins et la sécurité des patients, tout en optimisant la gestion des hôpitaux et cliniques.</p>
        </div>
      </header>

      <section className="secteur-content">
        <h2>Les Normes ISO Applicables</h2>
        <div className="norme-list">
          {normesSante.map((norme, index) => (
            <div className="norme-card" key={index}>
              <h3>{norme.nom}</h3>
              <p>{norme.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="secteur-exemples">
        <h2>Exemples d'Applications</h2>
        <ul>
          <li>Cliniques et hôpitaux publics et privés</li>
          <li>Laboratoires médicaux</li>
          <li>Fabricants d'équipements médicaux</li>
        </ul>
      </section>

      <section className="secteur-avantages">
        <h2>Avantages de la Certification ISO</h2>
        <p>Amélioration continue des services, réduction des erreurs médicales et optimisation des processus dans les établissements de santé.</p>
      </section>
    </div>
  );
}
export default Sante;
