const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Board extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            title: {
               type: DataTypes.STRING,
               allowNull: false,
            },
            content: {
               type: DataTypes.TEXT,
               allowNull: false,
            },
            img: {
               type: DataTypes.STRING,
               allowNull: true,
            },
            views: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 0,
            },
            likes: {
               type: DataTypes.INTEGER,
               allowNull: false,
               defaultValue: 0,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Board.belongsTo(db.Member, {
         foreignKey: 'member_id',
         targetKey: 'id',
      })
      db.Board.hasMany(db.Comment, {
         foreignKey: 'board_id',
         sourceKey: 'id',
      })
      db.Board.hasMany(db.Like, {
         foreignKey: 'board_id',
         sourceKey: 'id',
      })
   }
}
