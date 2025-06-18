const { Sequelize } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize('dripstore', 'root', 'KDG12345kdg12345', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;