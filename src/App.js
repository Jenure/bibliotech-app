// src/App.js - Version corrigée
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import des composants avec noms exacts de vos fichiers
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import AdherentManagement from './pages/AdherentManagement';
import LivreManagement from './pages/LivreManagement';
import EmpruntManagement from './pages/EmpruntManagement';
import InventaireManagement from './pages/InventaireManagement';
import Statistiques from './pages/Statistiques';

// Import du Layout
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route par défaut vers le dashboard */}
          <Route 
            path="/" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/utilisateurs" 
            element={
              <Layout>
                <UserManagement />
              </Layout>
            } 
          />
          <Route 
            path="/adherents" 
            element={
              <Layout>
                <AdherentManagement />
              </Layout>
            } 
          />
          <Route 
            path="/livres" 
            element={
              <Layout>
                <LivreManagement />
              </Layout>
            } 
          />
          <Route 
            path="/emprunts" 
            element={
              <Layout>
                <EmpruntManagement />
              </Layout>
            } 
          />
          <Route 
            path="/inventaires" 
            element={
              <Layout>
                <InventaireManagement />
              </Layout>
            } 
          />
          <Route 
            path="/statistiques" 
            element={
              <Layout>
                <Statistiques />
              </Layout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;