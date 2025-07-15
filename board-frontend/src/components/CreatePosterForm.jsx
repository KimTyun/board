import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBoardThunk } from '../features/postSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { clearAuthError } from '../features/authSlice'

function CreatePosterForm() {
   const [img, setImg] = useState('')
   const [imgUrl, setImgUrl] = useState(null)
   const [content, setContent] = useState('')
   const [title, setTitle] = useState('')
   const { error, loading } = useSelector((s) => s.post)
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
      } else {
         formData.append('img', null)
      }
      formData.forEach((v, k) => {
         console.log(k, v)
      })
      dispatch(createBoardThunk(formData))
         .unwrap()
         .then(() => {
            alert('게시글 등록 성공!!!!')
            navigate('/')
         })
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
      }
   }, [dispatch])
   return (
      <>
         {error && (
            <>
               <p style={{ color: 'red' }}>{error}</p>
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
            <input
               type="text"
               name="content"
               id="content"
               value={content}
               onChange={(e) => {
                  setContent(e.target.value)
               }}
            />
            <button type="submit">등록</button>
         </form>
         <Link to={'/login'}>
            <button>로그인</button>
         </Link>
      </>
   )
}

export default CreatePosterForm
