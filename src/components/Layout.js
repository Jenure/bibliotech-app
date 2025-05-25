// src/components/Layout.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Layout.css'; // Ajustez le chemin selon votre structure

const Layout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Tableau de bord', icon: '📊' },
    { path: '/utilisateurs', label: 'Utilisateurs', icon: '👥' },
    { path: '/adherents', label: 'Adhérents', icon: '🎫' },
    { path: '/livres', label: 'Livres', icon: '📚' },
    { path: '/emprunts', label: 'Emprunts & Retours', icon: '🔄' },
    { path: '/inventaires', label: 'Inventaires', icon: '📋' },
    { path: '/statistiques', label: 'Statistiques', icon: '📈' }
  ];

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>📚 Bibliotech</h2>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        <header className="top-header">
          <h1>Gestion de Bibliothèque</h1>
          <div className="user-info">
            <span>👤 Utilisateur connecté</span>
          </div>
        </header>
        
        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;