require('dotenv').config();

console.log('=== Configuration Bibliotech ===');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Défini' : '❌ Non défini');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Défini' : '❌ Non défini');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Non défini');
console.log('PORT:', process.env.PORT || 'Utilise la valeur par défaut');
console.log('================================');