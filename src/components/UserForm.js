import React, { useState } from 'react';

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: user?.nom || '',
    prenom: user?.prenom || '',
    email: user?.email || '',
    telephone: user?.telephone || '',
    role: user?.role || 'membre',
    status: user?.status || 'actif',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!user && !formData.password) newErrors.password = 'Le mot de passe est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>{user ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
          
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
              className={errors.nom ? 'error' : ''}
            />
            {errors.nom && <span className="error-text">{errors.nom}</span>}
          </div>
          
          {/* Autres champs similaires */}
          
          <div className="form-actions">
            <button type="button" onClick={onCancel}>Annuler</button>
            <button type="submit">{user ? 'Modifier' : 'Ajouter'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;