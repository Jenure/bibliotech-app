// src/services/membreService.js
import api from './api';

// Récupérer tous les membres
export const getAllMembres = async () => {
  try {
    const response = await api.get('/api/membres');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Créer un nouveau membre
export const createMembre = async (membreData) => {
  try {
    const response = await api.post('/api/membres', membreData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un membre existant
export const updateMembre = async (id, membreData) => {
  try {
    const response = await api.put(`/api/membres/${id}`, membreData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer un membre
export const deleteMembre = async (id) => {
  try {
    const response = await api.delete(`/api/membres/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un membre par ID
export const getMembreById = async (id) => {
  try {
    const response = await api.get(`/api/membres/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};