const cookieParser = require('cookie-parser')
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const path = require('path')
const { sequelize } = require('./models')
require('dotenv').config()
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const passport = require('passport')
const passportConfig = require('./passport')

const app = express()
passportConfig()
app.set('PORT', process.env.PORT || 3000)

sequelize
   .sync({ force: false })
   .then(() => {
      console.log('db연결성공')
   })
   .catch((e) => {
      console.error(e)
   })

app.use(
   cors({
      origin: 'http://localhost:5173', // 특정 주소만 request 허용
      credentials: true, // 쿠키, 세션 등 인증 정보 허용
   }),
   morgan('dev'),
   express.static(path.join(__dirname, 'uploads')),
   express.json(),
   express.urlencoded({ extended: false }),
   cookieParser(/*process.env.SECRET_KEY*/),
   session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SECRET_KEY,
      cookie: {
         httpOnly: true,
         signed: false,
         secure: false,
      },
   }),
   passport.initialize(),
   passport.session()
)

app.use('/auth', authRouter)
app.use('/post', postRouter)

app.use((err, req, res, next) => {
   const status = err.status || 500
   const message = err.message || '서버에러'
   console.log(err)
   console.log('서버에러')
   res.status(status).json({
      success: false,
      message,
   })
})

app.listen(app.get('PORT'), () => {
   console.log(`http://localhost:${app.get('PORT')} 접속완료`)
})
