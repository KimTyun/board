const { Sequelize, DataTypes } = require('sequelize')

module.exports = class Member extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: DataTypes.STRING,
               allowNull: false,
               unique: true,
            },
            name: {
               type: DataTypes.STRING,
               allowNull: false,
            },
            password: {
               type: DataTypes.STRING,
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true, //createAt, updateAt ..등 자동 생성
            underscored: false,
            modelName: 'Member',
            tableName: 'member',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         },
      )
   }

   static associate(db) {
      db.Member.hasMany(db.Board, {
         foreignKey: 'member_id',
         sourceKey: 'id',
      })
   }
}
