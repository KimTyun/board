function isLoggedIn(req, res, next) {
   const isAuthenticated = req.isAuthenticated()
   if (isAuthenticated) {
      return next()
   } else {
      const err = new Error('로그인이 필요합니다.')
      err.status = 403
      return next(err)
   }
}

function isNotLoggedIn(req, res, next) {
   const isAuthenticated = req.isAuthenticated()
   if (!isAuthenticated) {
      return next()
   } else {
      const err = new Error('이미 로그인이 되어있습니다.')
      err.status = 403
      return next(err)
   }
}

module.exports = { isNotLoggedIn, isLoggedIn }
