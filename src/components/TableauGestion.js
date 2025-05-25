// src/components/TableauGestion.js
import React, { useState } from 'react';
import '../styles/TableauGestion.css';

const TableauGestion = ({ 
  titre, 
  colonnes, 
  donnees, 
  onAjouter, 
  onModifier, 
  onSupprimer, 
  onVoir 
}) => {
  const [recherche, setRecherche] = useState('');
  const [champRecherche, setChampRecherche] = useState('Tous les champs');
  const [statut, setStatut] = useState('Tous');
  const [tri, setTri] = useState('Identifiant');
  
  // Filtrer les données
  const donneesFiltrees = donnees.filter(item => {
    // Filtre par statut
    if (statut !== 'Tous' && item.statut && item.statut !== statut) {
      return false;
    }
    
    // Filtre par recherche
    if (!recherche) return true;
    
    if (champRecherche === 'Tous les champs') {
      return Object.values(item).some(val => 
        val && String(val).toLowerCase().includes(recherche.toLowerCase())
      );
    } else {
      const colonne = colonnes.find(col => col.titre === champRecherche);
      if (!colonne) return true;
      
      const valeur = item[colonne.champ];
      return valeur && String(valeur).toLowerCase().includes(recherche.toLowerCase());
    }
  });
  
  return (
    <div className="tableau-container" style={{ width: '100%' }}>
      <h2 className="tableau-titre">{titre}</h2>
      
      {/* Boutons d'export et d'import */}
      <div className="actions-row">
        <div className="action-group">
          <button className="btn btn-excel">
            <span className="icon">📊</span> Exportateur Excel
          </button>
          <button className="btn btn-json">
            <span className="icon">📋</span> Exportateur JSON
          </button>
        </div>
        
        <div className="action-group">
          <button className="btn btn-primary" onClick={onAjouter}>
            Ajouter
          </button>
          <button className="btn btn-outline">
            <span className="icon">📥</span> Importer Excel
          </button>
          <button className="btn btn-outline">
            <span className="icon">📥</span> Importer JSON
          </button>
        </div>
      </div>
      
      {/* Filtres de recherche */}
      <div className="filters-row">
        <div className="filter-group">
          <label>Rechercher par:</label>
          <select 
            value={champRecherche} 
            onChange={e => setChampRecherche(e.target.value)}
            className="select-filter"
          >
            <option>Tous les champs</option>
            {colonnes.map(col => (
              <option key={col.champ}>{col.titre}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Recherche..." 
            value={recherche}
            onChange={e => setRecherche(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-group">
          <label>Statut:</label>
          <select 
            value={statut} 
            onChange={e => setStatut(e.target.value)}
            className="select-filter status-filter"
          >
            <option>Tous</option>
            <option>Actif</option>
            <option>Inactif</option>
          </select>
          
          <label>Trié par:</label>
          <select 
            value={tri} 
            onChange={e => setTri(e.target.value)}
            className="select-filter sort-filter"
          >
            <option>Identifiant</option>
            <option>Nom</option>
            <option>Statut</option>
          </select>
        </div>
      </div>
      
      {/* Tableau - Responsive avec scroll horizontal si nécessaire */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              {colonnes.map(col => (
                <th key={col.champ}>{col.titre}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donneesFiltrees.length === 0 ? (
              <tr>
                <td colSpan={colonnes.length + 1} className="no-data">Aucune donnée trouvée</td>
              </tr>
            ) : (
              donneesFiltrees.map(item => (
                <tr 
                  key={item._id}
                  // Ajouter la classe pour le liseré basée sur le rôle ou le statut
                  className={item.role || item.statut} 
                >
                  {colonnes.map(col => (
                    <td key={col.champ} className={col.type === 'couleur' ? 'color-cell' : ''}>
                      {col.type === 'couleur' ? (
                        <div className="color-box" style={{ backgroundColor: item[col.champ] }}></div>
                      ) : col.type === 'statut' ? (
                        <span className={`status ${item[col.champ]}`}>{item[col.champ]}</span>
                      ) : col.type === 'adresse' ? (
                        <>
                          {item[col.champ]?.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        </>
                      ) : (
                        item[col.champ]
                      )}
                    </td>
                  ))}
                  <td className="actions-cell">
                    <button onClick={() => onModifier(item)} className="action-btn edit-btn" title="Modifier">✏️</button>
                    <button onClick={() => onSupprimer(item._id)} className="action-btn delete-btn" title="Supprimer">🗑️</button>
                    <button onClick={() => onVoir(item)} className="action-btn view-btn" title="Voir">👁️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Information de pagination */}
      <div className="pagination-info">
        Affichage de {donneesFiltrees.length} {titre.toLowerCase().slice(11, -1)}s sur {donnees.length}
      </div>
    </div>
  );
};

export default TableauGestion;