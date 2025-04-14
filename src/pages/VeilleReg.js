import React, { useState, useEffect } from "react";
import "../pages/VeilleReg.css";
import flechet from "../assets/iconesfleshet.png";
import line from "../assets/iconeslineC.png";
import { FaArrowUp } from "react-icons/fa";
import veille1 from "../assets/veille1.jpg";
import veille2 from "../assets/veille2.jpg";
import veille3 from "../assets/veille3.jpg"; 
import veille4 from "../assets/veille4.png";

const VeilleReg = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="contact-container">
      <section className="veilleReg-section">
        <img src={flechet} className="fleche fleche1" alt="Flèche gauche" />
        <div className="content-veilleReg">
          <h2>Veille Réglementaire</h2>
          <img src={line} className="line-veille" alt="Ligne décorative" />
          <p>
            Lorem ipsum dolor sit amet. In voluptas rerum aut voluptatem et quia natus qui
            perferendis soluta.
          </p>
        </div>
        <img src={flechet} className="fleche fleche2" alt="Flèche droite" />
      </section>

      <section className="veille-info-section">
        <h2 className="veille-main-title">Veille Réglementaire</h2>
        <div className="veille-info-container">
          <div className="text-container">
            <h3>Pourquoi la veille réglementaire ?</h3>
            <p>Vous êtes concernés par la veille réglementaire si :</p>
            <ul>
              <li>Vous êtes conscient que l’application de la réglementation est un facteur clé de la réussite et de la longévité de votre entreprise.</li>
              <li>Votre entreprise est certifiée selon une norme quelconque comme ISO 9001, ISO 14001, ISO 45001, ISO 22000, ISO 50001, ISO 17025, etc.</li>
              <li>Votre entreprise est labellisée selon un label international comme Ecolabel ou national comme Label RSE, Food Quality Label, etc.</li>
              <li>Vous entreprenez une démarche de mise en œuvre des lignes directrices de l’ISO 26000 ou autre.</li>
            </ul>

            <h3>Pourquoi opter pour la veille réglementaire de PreCertify ?</h3>
            <p>Parce que :</p>
            <ul>
              <li>Nous mettons à votre disposition une équipe de consultants polyvalents qui saura vous communiquer l’information dans les meilleurs délais et de la meilleure façon ;</li>
              <li>Nous vous proposons une formule sur mesure selon votre besoin</li>
            </ul>
            <p>Il vous appartient ainsi de choisir entre :</p>
          </div>
          <div className="image-container right-align-image">
            <img src={veille1} alt="Veille Réglementaire" />
          </div>
        </div>
      </section>

      <section className="veille-base-section">
        <div className="veille-base-header">
          <h2>Laquelle de nos formules choisir ?</h2>
          <h3>Veille de base</h3>
          <p className="subtitle">Gagnez en temps et en ressources</p>
        </div>

        <div className="veille-base-container">
          <div className="image-block">
            <img src={veille2} alt="Veille de base" />
          </div>
          <div className="text-block">
            <h4>Une solution simple et profitable</h4>
            <p>Elle vous permet :</p>
            <ol>
              <li>d’être informé de la parution de nouveaux textes applicables via une e-alerte,</li>
              <li>de disposer d’une fiche de lecture expliquant et résumant les principales exigences du texte réglementaire paru,</li>
              <li>d’avoir accès aux textes réglementaires de la base en ligne, ainsi que les modifications correspondantes,</li>
              <li>d’exploiter avec aisance vos données et informations en ligne : recherche multicritères, rubrique monitoring, etc.</li>
              <li>de bénéficier d’une assistance par nos experts, qui répondent à vos questions sans délais.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="veille-plus-section">
        <div className="veille-plus">
          <div className="text-side">
            <h3>Veille Plus:</h3>
            <h4>établir l’état initial en profitant de notre expertise</h4>
            <p><strong>Profitez d'une veille personnalisée pour piloter avec beaucoup d’aisance votre conformité</strong></p>
            <p>En effet, à votre demande, nous vous apportons notre expertise par :</p>
            <ul>
              <li>L’élaboration du registre réglementaire propre à votre entreprise,</li>
              <li>L’évaluation de votre conformité réglementaire,</li>
              <li>La proposition d’un plan de mise en conformité de votre site et de votre activité</li>
            </ul>
          </div>
          <div className="image-side">
            <img src={veille3} alt="Veille Plus" />
          </div>
        </div>
      </section>
      <section className="super-veille-section">
  <div className="super-veille">
    <div className="image-super">
    <div className="super-title">
        <h3>Super Veille</h3>
        <h4>superviser la conformité réglementaire de vos sites lointains comme s’ils étaient proches</h4>
      </div>
      <img src={veille4} alt="Super Veille" />
      
    </div>

    <div className="right-super">
      <p><strong>Vos sites sont dispersés… notre solution super veille les rapproche de vous</strong></p>
      <p>Vous êtes un groupe d’entreprises, une entreprise multi-filial ou multi-sites ?</p>
      <p>Grâce à notre solution « Super Veille » :</p>
      <ul>
        <li>Vous supervisez l'état de conformité en temps réel de vos différents sites à partir d'un accès unique « SUPER ADMIN »</li>
        <li>Vous pilotez la conformité spécifique pour chaque site à travers les accès « admin »</li>
        <li>Vous êtes informés via des alertes ciblées de la parution d'un nouveau texte applicable à un ou plusieurs sites</li>
        <li>Vous communiquez à distance avec vos collaborateurs sur la veille de vos divers sites</li>
      </ul>
    </div>
  </div>
</section>

<section className="veille-differences-section">
  <h2>Veille réglementaire / Veille normative : Quelles différences ?</h2>
  <p>
    Comme son nom l’indique, « la veille normative » est le processus qui aide l’organisme de connaître et de mettre en œuvre les normes applicables à son activité.
 <br></br>
    La veille normative en Tunisie est assurée exclusivement par l’Institut National de la Normalisation et de la Propriété Industrielle (INNORPI), qui commercialise les normes NT, comme le stipule la Loi n° 2009-38 du 30 juin 2009, relative au système national de normalisation, dans son article 12.
    <br></br> 
    Ainsi, toute entreprise souhaitant assurer une « veille normative » doit obligatoirement passer par cet organisme.
    <br></br>
    Cependant, nous réservons, à nos clients, dans notre plateforme, un espace qui peut abriter les normes propres et tout autre document à caractère contractuel. Cet espace permet de gérer les exigences propres à l’organisme.
  </p>
</section>


      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default VeilleReg;
