const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()

const app = express()

app.set('PORT', process.env.PORT || 3000)

sequelize
   .sync({ force: true })
   .then(() => {
      console.log('db연결성공')
   })
   .catch((e) => {
      console.error(e)
   })

app.use(
   morgan('dev'),
   express.static(path.join(__dirname, 'uploads')),
   express.json(),
   express.urlencoded({ extended: false }),
   cookieParser(process.env.SECRET_KEY),
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET_KEY,
      cookie: {
         httpOnly: true,
         signed: true,
         secure: false,
      },
   }),
)

app.listen(app.get('PORT'), () => {
   console.log(`http://localhost:${app.get('PORT')} 접속완료`)
})
