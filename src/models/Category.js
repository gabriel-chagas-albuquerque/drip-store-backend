const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

// Definindo o modelo Post
class Category extends Model {
  // static associate({PostTag, Usuario, Tags}) {
  //   Post.belongsTo(Usuario, { foreignKey: "userId" });
  //     Post.belongsToMany(Tags, {
  //       through: PostTag,
  //       foreignKey: 'postId',
  //       otherKey: 'tagId'
  //     })
      
  // }
}

Category.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull:false
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull:true,
    defaultValue:0
  }
},
{
  timestamps:true,
  sequelize:sequelize,
  modelName: "category",
  tableName: "categories"
}
)

module.exports = Category;