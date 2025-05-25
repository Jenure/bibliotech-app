const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setAuthHeader() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.setAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur de réseau');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Auth
  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.token = response.token;
    }
    
    return response;
  }

  // Users CRUD
  async getUsers() {
    return this.request('/users');
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Import/Export
  async exportData(type, format) {
    const response = await fetch(`${BASE_URL}/${type}/export/${format}`, {
      headers: this.setAuthHeader(),
    });
    
    if (format === 'json') {
      return response.json();
    } else {
      return response.blob();
    }
  }

  async importData(type, formData) {
    return this.request(`/${type}/import`, {
      method: 'POST',
      headers: { ...this.setAuthHeader() }, // Pas de Content-Type pour FormData
      body: formData,
    });
  }
}

export default new ApiService();