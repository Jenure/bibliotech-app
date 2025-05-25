// src/pages/UserManagement.js
import React, { useState } from 'react';
import '../styles/UserManagement.css';  // ✅ Cherche dans src/styles/

const UserManagement = () => {
  // Données mockées des utilisateurs administrateurs
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      nom: 'Dubois',
      prenom: 'Sophie',
      email: 'sophie.dubois@bibliotech.fr',
      telephone: '01 23 45 67 89',
      role: 'Administrateur',
      statut: 'Actif',
      derniere_connexion: '25/05/2025 09:30',
      date_creation: '15/01/2024'
    },
    {
      id: 'USR-002', 
      nom: 'Martin',
      prenom: 'Jean-Pierre',
      email: 'jp.martin@bibliotech.fr',
      telephone: '01 23 45 67 90',
      role: 'Bibliothécaire',
      statut: 'Actif',
      derniere_connexion: '24/05/2025 16:45',
      date_creation: '20/02/2024'
    },
    {
      id: 'USR-003',
      nom: 'Lemoine',
      prenom: 'Claire',
      email: 'claire.lemoine@bibliotech.fr', 
      telephone: '01 23 45 67 91',
      role: 'Assistant',
      statut: 'Inactif',
      derniere_connexion: '18/05/2025 14:20',
      date_creation: '10/03/2024'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('Tous');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filtrage des utilisateurs
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'Tous' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => {
    switch(role) {
      case 'Administrateur': return 'role-admin';
      case 'Bibliothécaire': return 'role-librarian';
      case 'Assistant': return 'role-assistant';
      default: return 'role-default';
    }
  };

  const getStatutColor = (statut) => {
    return statut === 'Actif' ? 'statut-actif' : 'statut-inactif';
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Gestion des utilisateurs</h1>
          <p>Gérez les administrateurs et le personnel de la bibliothèque</p>
        </div>
        <div className="header-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Nouvel utilisateur
          </button>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="filter-select"
          >
            <option value="Tous">Tous les rôles</option>
            <option value="Administrateur">Administrateur</option>
            <option value="Bibliothécaire">Bibliothécaire</option>
            <option value="Assistant">Assistant</option>
          </select>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="quick-stats">
        <div className="stat-item">
          <span className="stat-number">{users.length}</span>
          <span className="stat-label">Total utilisateurs</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.statut === 'Actif').length}</span>
          <span className="stat-label">Actifs</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{users.filter(u => u.role === 'Administrateur').length}</span>
          <span className="stat-label">Administrateurs</span>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom & Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Dernière connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-id">{user.id}</td>
                <td className="user-name">
                  <div className="name-container">
                    <strong>{user.nom} {user.prenom}</strong>
                    <small>Créé le {user.date_creation}</small>
                  </div>
                </td>
                <td className="user-email">{user.email}</td>
                <td className="user-phone">{user.telephone}</td>
                <td>
                  <span className={`role-badge ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`statut-badge ${getStatutColor(user.statut)}`}>
                    {user.statut}
                  </span>
                </td>
                <td className="last-login">{user.derniere_connexion}</td>
                <td className="actions">
                  <button className="btn-action edit" title="Modifier">
                    ✏️
                  </button>
                  <button className="btn-action delete" title="Supprimer">
                    🗑️
                  </button>
                  <button className="btn-action settings" title="Permissions">
                    ⚙️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <span>Affichage de 1 à {filteredUsers.length} sur {users.length} utilisateurs</span>
        <div className="pagination-controls">
          <button className="pagination-btn">Précédent</button>
          <span className="page-number active">1</span>
          <button className="pagination-btn">Suivant</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;