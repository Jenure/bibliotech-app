// src/pages/Login.js - Version complète
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Version simulée sans appel API
      if (email === 'jenure.linteri@gmail.com' && password === 'bib41700') {
        // Créer des données d'utilisateur simulées
        const userData = {
          id: 1,
          nom: 'Linteri',
          prenom: 'Jenure',
          email: email,
          role: 'super_admin',
          niveau_autorisation: 5
        };
        
        // Enregistrer les données comme si elles venaient de l'API
        localStorage.setItem('token', 'test-token-' + Date.now());
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Rediriger vers le tableau de bord
        console.log('Connexion simulée réussie');
        navigate('/dashboard');
      } else {
        // Simuler un échec de connexion
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Bibliotech</h1>
        <h2>Connexion à l'administration</h2>
      </div>
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <div className="info-message">
        <p>Veuillez vous connecter pour cette page.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <div className="input-with-icon">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre email"
              required
            />
            <span className="input-icon">📧</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <div className="input-with-icon">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
            />
            <span 
              className="input-icon" 
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? "👁️" : "🔒"}
            </span>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <div className="forgot-password">
        <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
      </div>
      
      <footer className="login-footer">
        <p>Système de gestion de bibliothèque Bibliotech</p>
      </footer>
    </div>
  );
}

export default Login;