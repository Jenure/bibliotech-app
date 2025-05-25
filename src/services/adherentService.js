// src/services/adherentService.js
import axios from 'axios';

// Configurez l'URL de base de votre API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Créez une instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Récupérer tous les adhérents
export const getAllAdherents = async () => {
  try {
    const response = await api.get('/api/adherents');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des adhérents:', error);
    throw new Error(error.response?.data?.message || 'Impossible de charger les adhérents');
  }
};

// Autres méthodes comme avant...