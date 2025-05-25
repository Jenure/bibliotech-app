import React, { useState } from 'react';
import ImportExportButtons from '../components/ImportExportButtons';
import { formatDate, capitalizeFirstLetter } from '../utils/formatters';
import '../styles/TableauCommun.css';

const LivreManagement = () => {
  const [livres, setLivres] = useState([
    { id: 'LIV-00001', titre: 'Les Misérables', auteur: 'Victor Hugo', isbn: '9782125457567', categorie: 'Roman classique', edition: 'Gallimard', annee: 1862, exemplaires: 3, disponibles: 2, status: 'disponible' },
    { id: 'LIV-00002', titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', isbn: '9782070613779', categorie: 'Conte', edition: 'Gallimard', annee: 1943, exemplaires: 5, disponibles: 4, status: 'disponible' },
    { id: 'LIV-00003', titre: '1984', auteur: 'George Orwell', isbn: '9782070415731', categorie: 'Science-fiction', edition: 'Folio', annee: 1949, exemplaires: 2, disponibles: 0, status: 'indisponible' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categorieFilter, setCategorieFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredLivres = livres.filter(livre => {
    const matchesSearch = livre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         livre.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         livre.isbn.includes(searchTerm);
    const matchesCategorie = categorieFilter === '' || livre.categorie === categorieFilter;
    const matchesStatus = statusFilter === '' || livre.status === statusFilter;
    
    return matchesSearch && matchesCategorie && matchesStatus;
  });

  const handleEdit = (livreId) => {
    console.log('Éditer livre:', livreId);
    // Logique d'édition
  };

  const handleDelete = (livreId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      setLivres(livres.filter(livre => livre.id !== livreId));
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <h2 className="section-title">Gestion des livres</h2>
          <p className="section-subtitle">Gérez votre catalogue de livres</p>
        </div>
        <ImportExportButtons buttonText="Ajouter livre" />
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
              placeholder="Rechercher des livres..." 
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="select-container">
            <select 
              className="select-input"
              value={categorieFilter}
              onChange={(e) => setCategorieFilter(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              <option value="Roman classique">Roman classique</option>
              <option value="Conte">Conte</option>
              <option value="Science-fiction">Science-fiction</option>
            </select>
            <span className="select-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
          <div className="select-container">
            <select 
              className="select-input"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
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
              <th>Auteur</th>
              <th>ISBN</th>
              <th>Catégorie</th>
              <th>Édition</th>
              <th>Exemplaires</th>
              <th>Disponibles</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredLivres.map((livre, index) => (
              <tr key={index}>
                <td className="table-cell table-cell-id">{livre.id}</td>
                <td className="table-cell table-cell-text">{livre.titre}</td>
                <td className="table-cell table-cell-text">{livre.auteur}</td>
                <td className="table-cell table-cell-text">{livre.isbn}</td>
                <td className="table-cell table-cell-text">{livre.categorie}</td>
                <td className="table-cell table-cell-text">{livre.edition}</td>
                <td className="table-cell table-cell-text">{livre.exemplaires}</td>
                <td className="table-cell table-cell-text">{livre.disponibles}</td>
                <td className="table-cell">
                  <span className={`badge ${livre.status === 'disponible' ? 'badge-green' : 'badge-red'}`}>
                    {capitalizeFirstLetter(livre.status)}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="actions">
                    <button className="btn-action btn-edit" onClick={() => handleEdit(livre.id)}>
                      Éditer
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(livre.id)}>
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
            Affichage de 1 à {filteredLivres.length} sur {filteredLivres.length} livres
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

export default LivreManagement;