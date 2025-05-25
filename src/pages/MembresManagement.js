// src/pages/MembresManagement.js
import React, { useState, useEffect } from 'react';
import TableauGestion from '../components/TableauGestion';

const MembresManagement = () => {
  // Données fictives pour les membres
  const mockData = [
    { _id: 'MEM-01', nom: 'Laurent', prenom: 'Jean', email: 'jean.laurent@bibliotech.fr', adresse: '15 rue des Lilas\n41700 Cour-Cheverny', telephone: '06 72 81 45 20', role: 'super_admin', niveau: '5', couleur: '#007BFF', statut: 'actif' },
    { _id: 'MEM-02', nom: 'Moreau', prenom: 'Sophie', email: 'sophie.moreau@bibliotech.fr', adresse: '8 avenue des Roses\n41000 Blois', telephone: '06 14 23 65 87', role: 'bibliothecaire', niveau: '3', couleur: '#28A745', statut: 'actif' },
    { _id: 'MEM-03', nom: 'Petit', prenom: 'Marc', email: 'marc.petit@bibliotech.fr', adresse: '42 boulevard Voltaire\n41100 Vendôme', telephone: '06 33 48 91 75', role: 'assistant', niveau: '2', couleur: '#FFC107', statut: 'inactif' }
  ];

  const [membres, setMembres] = useState([]);

  // Charger les données au chargement
  useEffect(() => {
    setMembres(mockData);
  }, []);

  // Définition des colonnes du tableau
  const colonnes = [
    { titre: 'IDENTIFIANT', key: '_id' },
    { titre: 'Nom', key: 'nom' },
    { titre: 'Prénom', key: 'prenom' },
    { titre: 'E-mail', key: 'email' },
    { titre: 'Adresse', key: 'adresse', type: 'adresse' },
    { titre: 'Téléphone', key: 'telephone' },
    { titre: 'Rôle', key: 'role' },
    { titre: 'Niveau', key: 'niveau' },
    { titre: 'Couleur', key: 'couleur', type: 'couleur' },
    { titre: 'Statut', key: 'statut', type: 'statut' }
  ];

  // Gérer l'ajout d'un membre
  const handleAjouter = () => {
    alert('Fonctionnalité à implémenter: Ajouter un membre');
  };

  // Gérer la modification
  const handleModifier = (membre) => {
    alert(`Modification du membre: ${membre.prenom} ${membre.nom}`);
  };

  // Gérer la suppression
  const handleSupprimer = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre?')) {
      setMembres(membres.filter(m => m._id !== id));
    }
  };

  // Gérer l'affichage des détails
  const handleVoir = (membre) => {
    alert(`Détails du membre: ${membre.prenom} ${membre.nom}`);
  };

  return (
    <TableauGestion
      titre="Gestion des membres"
      colonnes={colonnes}
      donnees={membres}
      onAjouter={handleAjouter}
      onModifier={handleModifier}
      onSupprimer={handleSupprimer}
      onVoir={handleVoir}
    />
  );
};

export default MembresManagement;