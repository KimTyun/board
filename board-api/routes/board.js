const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const { isLoggedIn } = require('./middlewares')
const { Board, Member, Comment, Like } = require('../models/')
const { Model } = require('sequelize')

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
      console.log('req.user는', req.user)
      const result = await Board.create({
         title: req.body.title,
         content: req.body.content,
         member_id: req.user.id,
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

router.put('/:id', isLoggedIn, uploads.single('img'), async (req, res, next) => {
   try {
      const post = await Board.findOne({ where: { id: req.params.id, member_id: req.user.id } })
      if (!post) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      await post.update({
         content: req.body.content,
         title: req.body.title,
         img: req?.file ? req.file.filename : post.img,
      })
      res.status(200).json({
         message: '수정햇음',
         success: true,
      })
   } catch (error) {
      console.log(error.message)
      error.message = '게시글 수정 중 에러발생'
      error.status = 500
      next(error)
   }
})

router.get('/view/posts', async (req, res, next) => {
   try {
      const limit = parseInt(req.query?.limit, 10) || 5
      const page = parseInt(req.query?.page, 10) || 1
      const offset = (page - 1) * limit
      const boards = await Board.findAll({
         limit,
         offset,
         order: [['createdAt', 'desc']],
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
         ],
      })
      const count = await Board.count()

      res.status(200).json({
         success: true,
         message: '게시물 리스트 불러오기 성공',
         pagination: {
            totalPosts: count,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            limit,
         },
         boards,
      })
   } catch (error) {
      console.log(error.message)
      error.message = '게시글 목록 불러오는 중 에러발생'
      error.status = 500
      next(error)
   }
})

router.delete('/:id', isLoggedIn, async (req, res, next) => {
   try {
      console.log('삭제 파람', req.params.id)
      const post = await Board.findOne({ where: { id: req.params.id } })
      if (!post) {
         const error = new Error('게시글을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      if (post.member_id !== req.user.id) {
         const error = new Error('본인이 작성한 게시글만 삭제할 수 있습니다.')
         error.status = 403
         return next(error)
      }
      await post.destroy()
      res.status(200).json({
         success: true,
         message: '잘지웟음',
      })
   } catch (error) {
      console.log(error.message)
      error.message = '게시글 삭제중 에러발생'
      error.status = 500
      next(error)
   }
})

router.get('/view/post/:id', async (req, res, next) => {
   try {
      const post = await Board.findOne({
         where: { id: req.params.id },
         include: [
            {
               model: Member,
               attributes: ['id', 'name'],
            },
            {
               model: Comment,
            },
         ],
      })
      if (!post) {
         const error = new Error('게시물을 찾을 수 없습니다.')
         error.status = 404
         return next(error)
      }
      res.status(200).json({
         success: true,
         message: '성공적으로 게시물을 불러왔습니다.',
         post,
      })
   } catch (error) {
      console.log(error.message)
      error.message = '게시글 불러오는 중 에러발생'
      error.status = 500
      next(error)
   }
})

router.patch('/view/post/:id', async (req, res, next) => {
   try {
      const { id } = req.params
      const [result] = await Board.increment('views', { where: { id } })

      if (!result[1]) {
         const error = new Error('조회수를 올릴 게시물이 존재하지 않습니다.')
         error.status = 404
         return next(error)
      }
      res.status(200).json({
         success: true,
         message: '조회수 올렷음',
      })
   } catch (error) {
      console.log(error.message)
      error.message = '조회수 올리는 중 에러발생'
      error.status = 500
      return next(error)
   }
})

router.post('/view/post/like/:id', isLoggedIn, async (req, res, next) => {
   try {
      const [like, created] = await Like.findOrCreate({
         where: {
            member_id: req.user.id,
            board_id: req.params.id,
         },
      })

      if (!created) {
         return res.status(409).json({
            success: false,
            message: '이미 추천햇음',
         })
      }
      await Board.increment('likes', {
         where: { id: req.params.id },
      })

      res.status(200).json({
         success: true,
         message: '추천 성공햇음',
      })
   } catch (error) {
      console.log(error.message)
      error.message = '추천 올리는 중 에러발생'
      error.status = 500
      return next(error)
   }
})

module.exports = router
