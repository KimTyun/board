const Sequelize = require('sequelize')
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)
db = {}

const Board = require('./board')
const Member = require('./member')
const Comment = require('./comment')
const Like = require('./like')

db.sequelize = sequelize
db.Board = Board
db.Member = Member
db.Comment = Comment
db.Like = Like

Board.init(sequelize)
Member.init(sequelize)
Comment.init(sequelize)
Like.init(sequelize)

Board.associate(db)
Member.associate(db)
Comment.associate(db)
Like.associate(db)

module.exports = db
