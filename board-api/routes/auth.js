const express = require('express')
const router = express.Router()
const Member = require('../models/member')
const bcrypt = require('bcrypt')
const passport = require('passport')
router.get('/', (req, res) => {
   res.json({ message: '성공적으로 연결됨', url: req.baseUrl })
})

router.post('/join', async (req, res, next) => {
   const { email, name, password } = req.body

   const exMember = await Member.findOne({
      where: { email },
   })
   if (exMember) {
      const error = new Error('이미 존재하는 이메일 입니다.')
      error.status = 409
      return next(error)
   }
   const hash = await bcrypt.hash(password, 11)

   const newMember = await Member.create({
      email,
      name,
      password: hash,
   })

   console.log(newMember)
   res.status(201).json({
      success: true,
      message: '회원가입 되었습니다.',
      member: { email, name },
   })
})

router.post('/login', async (req, res, next) => {
   console.log('멤버가몰까요', req.body)
   passport.authenticate('local', (authError, member, info) => {
      if (authError) {
         return next(authError)
      }

      if (!member) {
         const err = new Error(info.message)
         err.status = 401
         return next(err)
      }

      req.login(member, (loginError) => {
         if (loginError) {
            loginError.status = 500
            loginError.message = '로그인 중 오류 발생'
            return next(loginError)
         }
      })
      req.session.save(() => {
         return res.status(200).json({
            success: true,
            message: '로그인 성공',
            member: {
               id: member.id,
               name: member.name,
            },
         })
      })
   })(req, res, next)
})

router.get('/logout', async (req, res, next) => {
   req.logout((logoutError) => {
      if (logoutError) {
         logoutError.status = 500
         logoutError.message = '로그아웃 중 오류 발생'
         next(logoutError)
      }
      res.status(200).json({
         success: true,
         message: '로그아웃에 성공하였습니다.',
      })
   })
})

router.get('/status', async (req, res, next) => {
   try {
      res.set('Cache-Control', 'no-store')
      const isAuthenticated = req.isAuthenticated()
      if (isAuthenticated) {
         return res.status(200).json({
            isAuthenticated,
            member: {
               id: req.user.member,
               name: req.user.name,
               email: req.user.email,
            },
         })
      } else {
         return res.status(200).json({
            isAuthenticated,
         })
      }
   } catch (err) {
      err.status = 500
      err.message = '로그인 상태확인 중 서버에서 에러가 발생했습니다.'
      next(err)
   }
})

module.exports = router
