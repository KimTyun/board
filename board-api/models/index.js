const Sequelize = require('sequelize')
require('dotenv').config()

const env = process.env.NODE_ENV || 'development'
const config = require('../config/config.json')[env]
const sequelize = new Sequelize(config.database, config.username, config.password, config)
db = {}

const Board = require('./board')
const Member = require('./member')

db.sequelize = sequelize
db.Board = Board
db.Member = Member

Board.init(sequelize)
Member.init(sequelize)

Board.associate(db)
Member.associate(db)

module.exports = db
