const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");

class OptionsProduct extends Model {
  static association() {
    OptionsProduct.belongsTo(Product,{foreignKey: "product_id"})
  }
}

OptionsProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
      autoIncrement: true,
    },
    product_id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references: {
        model: Product,
        key: "id"
      }
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    shape: {
      type: DataTypes.ENUM("square", "circle"),
      allowNull:true,
      defaultValue:"square"
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue:0
    },
    type: {
      type: DataTypes.ENUM("text", "color"),
      allowNull:true,
      defaultValue:"text"
    },
    values: {
      type: DataTypes.STRING,
      allowNull:false,
    }
  },
  {
    timestamps:false,
    sequelize: sequelize,
    modelName: "options_product",
  }
);

module.exports = OptionsProduct;
