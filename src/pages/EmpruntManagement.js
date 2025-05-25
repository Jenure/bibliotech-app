import React, { useState } from 'react';
import ImportExportButtons from '../components/ImportExportButtons';
import { formatDate, capitalizeFirstLetter } from '../utils/formatters';
import '../styles/TableauCommun.css';

const EmpruntManagement = () => {
  const [emprunts, setEmprunts] = useState([
    { id: 'EMP-00001', adherent: 'Dupont Jean', livre: 'Les Misérables', dateEmprunt: '2025-05-01', dateRetourPrevu: '2025-05-15', dateRetour: '', status: 'en cours' },
    { id: 'EMP-00002', adherent: 'Martin Marie', livre: 'Le Petit Prince', dateEmprunt: '2025-04-20', dateRetourPrevu: '2025-05-04', dateRetour: '2025-05-01', status: 'retourné' },
    { id: 'EMP-00003', adherent: 'Petit Pierre', livre: '1984', dateEmprunt: '2025-05-10', dateRetourPrevu: '2025-05-24', dateRetour: '', status: 'en retard' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredEmprunts = emprunts.filter(emprunt => {
    const matchesSearch = emprunt.adherent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emprunt.livre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emprunt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || emprunt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleReturn = (empruntId) => {
    setEmprunts(emprunts.map(emprunt => 
      emprunt.id === empruntId 
        ? { ...emprunt, status: 'retourné', dateRetour: new Date().toISOString().split('T')[0] }
        : emprunt
    ));
  };

  const handleDetails = (empruntId) => {
    console.log('Voir détails de l\'emprunt:', empruntId);
    // Logique pour afficher les détails
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Gestion des emprunts et retours</h2>
          <p className="section-subtitle">Suivez les emprunts en cours et les retours</p>
        </div>
        <ImportExportButtons buttonText="Nouvel emprunt" />
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
              placeholder="Rechercher des emprunts..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="select-container">
            <select 
              className="select-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="en cours">En cours</option>
              <option value="retourné">Retourné</option>
              <option value="en retard">En retard</option>
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
              <th>Adhérent</th>
              <th>Livre</th>
              <th>Date d'emprunt</th>
              <th>Retour prévu</th>
              <th>Date de retour</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredEmprunts.map((emprunt, index) => (
              <tr key={index}>
                <td className="table-cell table-cell-id">{emprunt.id}</td>
                <td className="table-cell table-cell-text">{emprunt.adherent}</td>
                <td className="table-cell table-cell-text">{emprunt.livre}</td>
                <td className="table-cell table-cell-text">{formatDate(emprunt.dateEmprunt)}</td>
                <td className="table-cell table-cell-text">{formatDate(emprunt.dateRetourPrevu)}</td>
                <td className="table-cell table-cell-text">{emprunt.dateRetour ? formatDate(emprunt.dateRetour) : '-'}</td>
                <td className="table-cell">
                  <span className={`badge ${
                    emprunt.status === 'en cours' ? 'badge-blue' : 
                    emprunt.status === 'retourné' ? 'badge-green' : 
                    'badge-red'}`}>
                    {capitalizeFirstLetter(emprunt.status)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="actions">
                    {emprunt.status !== 'retourné' && (
                      <button className="btn-action btn-edit" onClick={() => handleReturn(emprunt.id)}>
                        Marquer comme retourné
                      </button>
                    )}
                    <button className="btn-action btn-edit" onClick={() => handleDetails(emprunt.id)}>
                      Détails
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <div className="pagination-info">
            Affichage de 1 à {filteredEmprunts.length} sur {filteredEmprunts.length} emprunts
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

export default EmpruntManagement;