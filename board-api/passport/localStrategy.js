const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Member = require('../models/member')

module.exports = function () {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'email',
            passwordField: 'password',
         },

         async (email, password, done) => {
            try {
               const member = await Member.findOne({ where: { email } })

               if (!member) {
                  return done(null, false, { message: '회원 정보가 없습니다.' })
               }

               const result = await bcrypt.compare(password, member.password)
               if (!result) {
                  return done(null, false, { message: '비밀번호가 일치하지 않습니다.' })
               }

               done(null, member)
            } catch (err) {
               err.message = '로그인 중 문제가 발생했습니다.'
               err.status = 500
               return done(err)
            }
         },
      ),
   )
}
