const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Like extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            member_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               allowNull: false,
            },
            board_id: {
               type: DataTypes.INTEGER,
               primaryKey: true,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: false, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Like',
            tableName: 'Likes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }
   static associate(db) {
      db.Like.belongsTo(db.Member, {
         foreignKey: 'member_id',
         targetKey: 'id',
      })
      db.Like.belongsTo(db.Board, {
         foreignKey: 'board_id',
         targetKey: 'id',
         onDelete: 'CASCADE',
      })
   }
}
