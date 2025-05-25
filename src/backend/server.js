const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Charger les variables d'environnement
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vérification des variables d'environnement
if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI n\'est pas défini dans le fichier .env');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET n\'est pas défini dans le fichier .env');
  process.exit(1);
}

// Routes API (à créer)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/adherents', require('./routes/adherents'));
app.use('/api/livres', require('./routes/livres'));
app.use('/api/emprunts', require('./routes/emprunts'));
app.use('/api/inventaires', require('./routes/inventaires'));

// Servir les fichiers statiques en production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
}

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connecté avec succès');
  console.log(`📦 Base de données: ${mongoose.connection.name}`);
})
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB:', err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌍 Mode: ${process.env.NODE_ENV}`);
  console.log(`📡 API disponible sur: http://localhost:${PORT}/api`);
});

module.exports = app;