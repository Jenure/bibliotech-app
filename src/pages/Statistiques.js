// src/pages/Statistiques.js
import React from 'react';
import '../styles/Statistiques.css';

const Statistiques = () => {
  // Données fictives pour les statistiques
  const stats = {
    livres: {
      total: 1250,
      actifs: 1120,
      inactifs: 130,
      categories: [
        { nom: 'Romans', nombre: 450 },
        { nom: 'Science-fiction', nombre: 320 },
        { nom: 'Documentaires', nombre: 280 },
        { nom: 'Bandes dessinées', nombre: 200 }
      ]
    },
    adherents: {
      total: 342,
      actifs: 287,
      inactifs: 55
    },
    emprunts: {
      total_annuel: 1890,
      en_cours: 130,
      en_retard: 24,
      mois_precedent: 165
    }
  };

  return (
    <div className="statistiques-container">
      <h2 className="page-title">Statistiques</h2>
      
      <div className="stats-grid">
        {/* Statistiques des livres */}
        <div className="stats-card">
          <h3>Livres</h3>
          <div className="stats-number">{stats.livres.total}</div>
          <div className="stats-details">
            <div className="stats-detail">
              <span className="detail-label">Actifs:</span>
              <span className="detail-value">{stats.livres.actifs}</span>
            </div>
            <div className="stats-detail">
              <span className="detail-label">Inactifs:</span>
              <span className="detail-value">{stats.livres.inactifs}</span>
            </div>
          </div>
          
          <h4>Répartition par catégorie</h4>
          <div className="category-bars">
            {stats.livres.categories.map((cat, index) => (
              <div className="category-bar" key={index}>
                <div className="category-name">{cat.nom}</div>
                <div className="bar-container">
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${(cat.nombre / stats.livres.total) * 100}%`,
                      backgroundColor: getColor(index)
                    }}
                  ></div>
                </div>
                <div className="category-count">{cat.nombre}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Statistiques des adhérents */}
        <div className="stats-card">
          <h3>Adhérents</h3>
          <div className="stats-number">{stats.adherents.total}</div>
          <div className="stats-details">
            <div className="stats-detail">
              <span className="detail-label">Actifs:</span>
              <span className="detail-value">{stats.adherents.actifs}</span>
            </div>
            <div className="stats-detail">
              <span className="detail-label">Inactifs:</span>
              <span className="detail-value">{stats.adherents.inactifs}</span>
            </div>
          </div>
          
          <div className="stats-chart">
            <div 
              className="pie-chart" 
              style={{ 
                '--active': `${(stats.adherents.actifs / stats.adherents.total) * 360}deg` 
              }}
            ></div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#4CAF50' }}></span>
                <span>Actifs ({Math.round((stats.adherents.actifs / stats.adherents.total) * 100)}%)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color" style={{ backgroundColor: '#F44336' }}></span>
                <span>Inactifs ({Math.round((stats.adherents.inactifs / stats.adherents.total) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistiques des emprunts */}
        <div className="stats-card">
          <h3>Emprunts</h3>
          <div className="stats-number">{stats.emprunts.total_annuel}</div>
          <div className="stats-label">emprunts cette année</div>
          
          <div className="stats-details">
            <div className="stats-detail">
              <span className="detail-label">En cours:</span>
              <span className="detail-value">{stats.emprunts.en_cours}</span>
            </div>
            <div className="stats-detail">
              <span className="detail-label">En retard:</span>
              <span className="detail-value">{stats.emprunts.en_retard}</span>
            </div>
            <div className="stats-detail">
              <span className="detail-label">Mois précédent:</span>
              <span className="detail-value">{stats.emprunts.mois_precedent}</span>
            </div>
          </div>
          
          <div className="stats-trend">
            <div className="trend-label">
              {stats.emprunts.en_cours > stats.emprunts.mois_precedent 
                ? '🔺 En hausse par rapport au mois dernier' 
                : '🔻 En baisse par rapport au mois dernier'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Fonction utilitaire pour obtenir des couleurs différentes
const getColor = (index) => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722', '#607D8B'];
  return colors[index % colors.length];
};

export default Statistiques;