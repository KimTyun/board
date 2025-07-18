import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearPostError, createBoardThunk, updateBoardThunk } from '../features/postSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearAuthError } from '../features/authSlice'

function CreatePosterForm() {
   const [img, setImg] = useState('')
   const [imgUrl, setImgUrl] = useState(null)
   const [content, setContent] = useState('')
   const [title, setTitle] = useState('')
   const { error, loading, post } = useSelector((s) => s.post)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   function onsubmit(e) {
      e.preventDefault()
      if (!title) {
         alert('제목을 입력하세요')
      }
      if (!content.trim() && !img) {
         alert('이미지 혹은 내용을 입력하세요')
         return
      }
      if (!content.trim()) {
         setContent('(내용없음)')
      }

      const formData = new FormData()
      formData.append('content', content)
      formData.append('title', title)
      if (img) {
         const encodedImg = new File([img], encodeURIComponent(img.name), { type: img.type })
         formData.append('img', encodedImg)
      }
      if (post) {
         formData.append('id', post.id)
         console.log('post.id가 왜없죠??', post.id)
      }

      if (!post) {
         dispatch(createBoardThunk(formData))
            .unwrap()
            .then(() => {
               alert('게시글 등록 성공!!!!')
               navigate('/')
            })
            .catch((e) => {
               alert('게시글 등록 실패')
               console.error(e)
            })
      } else {
         dispatch(updateBoardThunk(formData))
            .unwrap()
            .then(() => {
               alert('게시글 수정 성공!!!!')
               navigate('/')
            })
            .catch((e) => {
               alert('게시글 수정 실패')
               console.error(e)
            })
      }
   }

   function onImagePreview(e) {
      const img = e.currentTarget.files[0]
      if (!img) return
      setImg(img)
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = function (e) {
         setImgUrl(e.target.result)
      }
   }

   useEffect(() => {
      return () => {
         dispatch(clearAuthError())
         dispatch(clearPostError())
      }
   }, [dispatch])

   useEffect(() => {
      if (!post) {
         return
      }

      if (post.img) {
         setImgUrl(`${import.meta.env.VITE_APP_API_URL}/${post.img}`)
      }

      setContent(post.content)
      setTitle(post.title)
   }, [post])

   return (
      <>
         {error && (
            <>
               <p style={{ color: 'red' }}>{error?.message}</p>
            </>
         )}
         <form method="post" onSubmit={onsubmit} encType="multipart/form-data">
            <label htmlFor="img">이미지 등록</label>
            <input type="file" name="img" id="img" onChange={onImagePreview} accept="imgage/*" />
            {imgUrl && (
               <div>
                  <img src={imgUrl} alt="" />
               </div>
            )}
            <br />
            <label htmlFor="title">제목 작성</label>
            <input type="text" name="title" id="title" placeholder="제목 작성" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="content">게시글 작성 </label>
            <textarea
               name="content"
               id="content"
               value={content}
               onChange={(e) => {
                  setContent(e.target.value)
               }}
            />
            {loading || (post ? <button type="submit">수정</button> : <button type="submit">등록</button>)}
         </form>
      </>
   )
}

export default CreatePosterForm
