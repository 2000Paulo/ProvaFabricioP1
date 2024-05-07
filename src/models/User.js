const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  senha: { type: String, required: true },
  // Outros campos do usuário, se houver
});

// Crie um modelo User com base no esquema acima
const User = mongoose.model('User', userSchema);

module.exports = User;
