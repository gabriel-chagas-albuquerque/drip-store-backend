const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {
  static associate({Profile}) {
    User.hasOne(Profile, {foreignKey: "userId"})
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    surname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize: sequelize,
    modelName: "user",
    tableName: "users"
  }
);

module.exports = User;
