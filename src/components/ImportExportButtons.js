import React, { useState } from 'react';
import apiService from '../services/api';
import './ImportExportButtons.css';

const ImportExportButtons = ({ entityType, buttonText = "Ajouter", onRefresh }) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [importMenuOpen, setImportMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExport = async (format) => {
    setLoading(true);
    try {
      const data = await apiService.exportData(entityType, format);
      
      if (format === 'excel') {
        // Créer un lien de téléchargement pour Excel
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${entityType}_export.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Télécharger JSON
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${entityType}_export.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      alert('Erreur lors de l\'export: ' + error.message);
    } finally {
      setLoading(false);
      setExportMenuOpen(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      await apiService.importData(entityType, formData);
      alert('Import réussi !');
      if (onRefresh) onRefresh();
    } catch (error) {
      alert('Erreur lors de l\'import: ' + error.message);
    } finally {
      setLoading(false);
      setImportMenuOpen(false);
    }
  };

  return (
    <div className="actions-container">
      {/* Menus d'import/export avec fonctionnalités réelles */}
      <div className="menu-container">
        <button onClick={() => setImportMenuOpen(!importMenuOpen)} className="btn btn-outline" disabled={loading}>
          {/* Icônes et texte */}
          Importer
        </button>
        
        {importMenuOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <label className="dropdown-item" style={{ cursor: 'pointer' }}>
                <input type="file" accept=".xlsx,.xls" onChange={handleImport} style={{ display: 'none' }} />
                <span className="format-icon excel-icon">📊</span>
                Format Excel
              </label>
              <label className="dropdown-item" style={{ cursor: 'pointer' }}>
                <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
                <span className="format-icon json-icon">📄</span>
                Format JSON
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Menu export similaire avec handleExport */}
      
      <button className="btn btn-primary" disabled={loading}>
        {buttonText}
      </button>
    </div>
  );
};

export default ImportExportButtons;