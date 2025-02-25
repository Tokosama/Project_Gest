const { Sequelize, DataTypes, Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/database');

class User extends Model {
  // Méthode pour comparer le mot de passe
  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('etudiant', 'enseignant', 'administrateur'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  hooks: {
    // Méthode pour hacher le mot de passe avant de sauvegarder
    beforeSave: async (user, options) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    }
  }
});

module.exports = User;
