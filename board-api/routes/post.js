const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { isLoggedIn } = require('./middlewares')
const Board = require('../models/board')

try {
   fs.readdirSync('uploads')
} catch (error) {
   fs.mkdirSync('uploads')
}
const uploads = multer({
   storage: multer.diskStorage({
      destination(req, file, cb) {
         cb(null, 'uploads/')
      },
      filename(req, file, cb) {
         const decodeFileName = decodeURIComponent(file.originalname)
         const ext = path.extname(decodeFileName)
         const basename = path.basename(decodeFileName, ext)
         cb(null, basename + Date.now() + ext)
      },
   }),
   limits: {},
})

router.get('/', (req, res, next) => {
   res.send('이상없음')
})

/**
 * req.body={
 * title: 타이틀,
 * content: 컨텐츠,
 * id:멤버아이디
 * }
 * req.file=img
 */
router.post('/create', isLoggedIn, uploads.single('img'), async (req, res, next) => {
   try {
      const result = await Board.create({
         title: req.body.title,
         content: req.body.content,
         member_id: req.body.id,
         img: req.file?.filename || null,
      })

      console.log('post/create 결과', result)
      res.status(201).json({
         success: true,
         message: '성공적으로 게시물이 등록되었습니다.',
      })
   } catch (error) {
      console.log(error.message)
      error.message = '게시글 등록중 에러발생'
      error.status = 500
      next(error)
   }
})

module.exports = router
