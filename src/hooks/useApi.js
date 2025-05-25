import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useApi = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await apiService.request(endpoint);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
};

export const useCrud = (entityType) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const create = async (itemData) => {
    setLoading(true);
    try {
      const newItem = await apiService.request(`/${entityType}`, {
        method: 'POST',
        body: JSON.stringify(itemData),
      });
      setData(prev => [...prev, newItem]);
      return newItem;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, itemData) => {
    setLoading(true);
    try {
      const updatedItem = await apiService.request(`/${entityType}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(itemData),
      });
      setData(prev => prev.map(item => item._id === id ? updatedItem : item));
      return updatedItem;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    try {
      await apiService.request(`/${entityType}/${id}`, {
        method: 'DELETE',
      });
      setData(prev => prev.filter(item => item._id !== id));
    } finally {
      setLoading(false);
    }
  };

  return { data, setData, loading, create, update, remove };
};