import React, { useState } from 'react';
import ImportExportButtons from '../components/ImportExportButtons';
import { formatDate, capitalizeFirstLetter } from '../utils/formatters';
import '../styles/TableauCommun.css';

const AdherentManagement = () => {
  const [adherents, setAdherents] = useState([
    { id: 'ADH-TEC-00001', nom: 'Dupont', prenom: 'Jean', email: 'jean.dupont@gmail.com', adresse: '17 rue des Bibliothécaires\n41000 Cher-Chermoy', telephone: '06 12 34 56 78', status: 'actif' },
    { id: 'ADH-TEC-00002', nom: 'Martin', prenom: 'Marie', email: 'marie.martin@bibliotech.fr', adresse: '25 avenue des Livres\n41000 Blois', telephone: '06 98 76 54 32', status: 'actif' },
    { id: 'ADH-TEC-00003', nom: 'Petit', prenom: 'Pierre', email: 'pierre.petit@hotmail.fr', adresse: '8 boulevard des Romans\n41100 Vendome', telephone: '06 45 67 89 12', status: 'inactif' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAdherents = adherents.filter(adherent => {
    const matchesSearch = adherent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         adherent.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         adherent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || adherent.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (adherentId) => {
    console.log('Éditer adhérent:', adherentId);
    // Logique d'édition
  };

  const handleDelete = (adherentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet adhérent ?')) {
      setAdherents(adherents.filter(adherent => adherent.id !== adherentId));
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Gestion des adhérents</h2>
          <p className="section-subtitle">Gérez les membres de la bibliothèque</p>
        </div>
        <ImportExportButtons buttonText="Ajouter adhérent" />
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
              placeholder="Rechercher des adhérents..." 
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
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
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
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredAdherents.map((adherent, index) => (
              <tr key={index}>
                <td className="table-cell table-cell-id">{adherent.id}</td>
                <td className="table-cell table-cell-text">{adherent.nom}</td>
                <td className="table-cell table-cell-text">{adherent.prenom}</td>
                <td className="table-cell table-cell-text">{adherent.email}</td>
                <td className="table-cell table-cell-text">
                  <div style={{ maxWidth: '200px' }}>
                    <div className="truncate">{adherent.adresse.split('\n')[0]}</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {adherent.adresse.split('\n')[1]}
                    </div>
                  </div>
                </td>
                <td className="table-cell table-cell-text">{adherent.telephone}</td>
                <td className="table-cell">
                  <span className={`badge ${adherent.status === 'actif' ? 'badge-green' : 'badge-red'}`}>
                    {capitalizeFirstLetter(adherent.status)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="actions">
                    <button className="btn-action btn-edit" onClick={() => handleEdit(adherent.id)}>
                      Éditer
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(adherent.id)}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <div className="pagination-info">
            Affichage de 1 à {filteredAdherents.length} sur {filteredAdherents.length} adhérents
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

export default AdherentManagement;