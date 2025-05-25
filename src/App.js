import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import AdherentManagement from './pages/AdherentManagement';
import LivreManagement from './pages/LivreManagement';
import EmpruntManagement from './pages/EmpruntManagement';
import InventaireManagement from './pages/InventaireManagement';
import Statistiques from './pages/Statistiques';
import Login from './pages/Login';
import MembresManagement from './pages/MembresManagement';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  return (
    <Router>
      <div className="app-container">
        <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/adherents" element={<AdherentManagement />} />
            <Route path="/livres" element={<LivreManagement />} />
            <Route path="/membres" element={<MembresManagement />} />
            <Route path="/emprunts" element={<EmpruntManagement />} />
            <Route path="/inventaires" element={<InventaireManagement />} />
            <Route path="/statistiques" element={<Statistiques />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;