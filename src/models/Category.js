const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Category extends Model {
  static associate(Product, ProductsCategory) {
    Category.belongsToMany(Product, {
      through: ProductsCategory,
      foreignKey: "category_id",
      otherKey: "product_id",
    });
  }
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    use_in_menu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    modelName: "category",
    tableName: "categories",
  }
);

module.exports = Category;
