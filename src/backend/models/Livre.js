const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  categorie: { type: String, required: true },
  edition: { type: String, required: true },
  annee: { type: Number, required: true },
  exemplaires: { type: Number, required: true, min: 1 },
  disponibles: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['disponible', 'indisponible'], default: 'disponible' },
  dateAjout: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Livre', livreSchema);