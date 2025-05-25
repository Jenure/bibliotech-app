import React from 'react';
import ImportExportButtons from '../components/ImportExportButtons';
import { formatDate, capitalizeFirstLetter } from '../utils/formatters';
import '../styles/TableauCommun.css';

const InventaireManagement = () => {
  const inventaires = [
    { id: 'INV-2025-001', titre: 'Inventaire annuel', dateDebut: '2025-01-15', dateFin: '2025-01-20', status: 'terminé', livresScannés: 1250, anomalies: 3 },
    { id: 'INV-2025-002', titre: 'Inventaire section jeunesse', dateDebut: '2025-03-05', dateFin: '2025-03-07', status: 'terminé', livresScannés: 345, anomalies: 1 },
    { id: 'INV-2025-003', titre: 'Inventaire nouveautés', dateDebut: '2025-05-18', dateFin: '', status: 'en cours', livresScannés: 87, anomalies: 2 }
  ];

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Gestion des inventaires</h2>
          <p className="section-subtitle">Créez et suivez les opérations d'inventaire</p>
        </div>
        <ImportExportButtons buttonText="Nouvel inventaire" />
      </div>

      <div className="table-container">
        <div className="filters">
          <div className="search-container">
            <span className="search-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Rechercher des inventaires..." 
              className="search-input"
            />
          </div>
          <div className="select-container">
            <select className="select-input">
              <option>Tous les statuts</option>
              <option>En cours</option>
              <option>Terminé</option>
              <option>Planifié</option>
            </select>
            <span className="select-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
        </div>
        
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Livres scannés</th>
              <th>Anomalies</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {inventaires.map((inventaire, index) => (
              <tr key={index}>
                <td className="table-cell table-cell-id">{inventaire.id}</td>
                <td className="table-cell table-cell-text">{inventaire.titre}</td>
                <td className="table-cell table-cell-text">{formatDate(inventaire.dateDebut)}</td>
                <td className="table-cell table-cell-text">{inventaire.dateFin ? formatDate(inventaire.dateFin) : '-'}</td>
                <td className="table-cell table-cell-text">{inventaire.livresScannés}</td>
                <td className="table-cell">
                  <span className={`badge ${inventaire.anomalies > 0 ? 'badge-amber' : 'badge-green'}`}>
                    {inventaire.anomalies}
                  </span>
                </td>
                <td className="table-cell">
                  <span className={`badge ${
                    inventaire.status === 'en cours' ? 'badge-blue' : 
                    inventaire.status === 'terminé' ? 'badge-green' : 
                    'badge-amber'}`}>
                    {capitalizeFirstLetter(inventaire.status)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="actions">
                    {inventaire.status === 'en cours' && (
                      <button className="btn-action btn-edit">Terminer</button>
                    )}
                    <button className="btn-action btn-edit">Détails</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <div className="pagination-info">
            Affichage de 1 à 3 sur 3 inventaires
          </div>
          <div className="pagination-buttons">
            <button className="btn-pagination">Précédent</button>
            <button className="btn-pagination active">1</button>
            <button className="btn-pagination">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventaireManagement;