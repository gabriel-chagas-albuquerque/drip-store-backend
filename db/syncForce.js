const sequelize = require("../src/config/database");
const User = require("../src/models/User");
const Category = require("../src/models/Category")
const Product = require("../src/models/Product")
const ImageProduct = require("../src/models/ImageProduct")
const OptionsProduct = require("../src/models/OptionsProduct")

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Banco de dados sincronizado.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
}

syncDatabase();
