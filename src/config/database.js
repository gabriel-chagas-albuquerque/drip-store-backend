const { Sequelize } = require('sequelize');
require("dotenv").config()

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: parseInt(process.env.DB_PORT) || 3306,
});

module.exports = sequelize;