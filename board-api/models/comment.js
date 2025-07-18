const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Comment extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            comment: {
               type: DataTypes.STRING,
               allowNull: false,
            },
            isGuest: {
               type: DataTypes.BOOLEAN,
               allowNull: false,
               defaultValue: true,
            },
            guestPw: {
               type: DataTypes.STRING(30),
               allowNull: true,
            },
            parentId: {
               type: DataTypes.INTEGER,
               allowNull: true,
               references: {
                  model: 'comments',
                  key: 'id',
               },
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.Comment.belongsTo(db.Member, {
         foreignKey: 'member_id',
         targetKey: 'id',
      })
      db.Comment.belongsTo(db.Board, {
         foreignKey: 'board_id',
         targetKey: 'id',
      })
   }
}
