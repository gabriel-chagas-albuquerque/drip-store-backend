const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Product = require("./Product");


class ImageProduct extends Model {
  static association() {
    ImageProduct.belongsTo(Product,{foreignKey: "product_id"})
  }
}

ImageProduct.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue:0
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false,
    sequelize: sequelize,
    modelName: "images_product",
  }
);

module.exports = ImageProduct;
