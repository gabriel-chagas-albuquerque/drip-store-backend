const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Product extends Model {
  static associate(ImageProduct, OptionsProduct) {
    Product.hasMany(ImageProduct, {
      foreignKey: "product_id",
      onDelete:"CASCADE",
      constraints:true
    })
    Product.hasMany(OptionsProduct, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
      constraints:true
    })
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    enabled: {
      type:DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:0
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_with_discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    modelName: "product",
    tableName:"products"
  }
);

module.exports = Product;
