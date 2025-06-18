const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");
const Category = require("./Category");

class ProductsCategory extends Model {}

ProductsCategory.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    sequelize: sequelize,
    modelName: "products_category",
  }
);

module.exports = ProductsCategory
