import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearPost, deleteBoardThunk, fetchBoardThunk } from '../../features/postSlice'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { incrementBoardLikes, incrementBoardViews } from '../../api/authApi'
import '../../css/board/post.css'

function ViewContent() {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error, post } = useSelector((s) => s.post)
   const { isAuthenticated } = useSelector((s) => s.auth)
   const { member } = useSelector((s) => s.auth)
   const { id } = useParams()
   useEffect(() => {
      dispatch(fetchBoardThunk(id))

      return () => {
         incrementBoardViews(id)
         clearPost()
      }
   }, [dispatch, id, member])

   function onDelete() {
      const ask = confirm('정말 삭제하시겠습니까?')
      if (ask) {
         dispatch(deleteBoardThunk(id))
            .unwrap()
            .then(() => {
               alert('게시물 삭제 완료!!!')
               navigate('/')
            })
            .catch(() => {
               alert('삭제 중 에러발생!')
               return
            })
      }
      return
   }

   async function onIncrementLike() {
      try {
         if (!isAuthenticated) {
            alert('로그인한 회원만 추천이 가능합니다.')
            return
         }
         await incrementBoardLikes(id)
         dispatch(fetchBoardThunk(id))
      } catch (error) {
         console.error(error)
      }
   }

   if (loading) return <p>로딩중...</p>

   return (
      <>
         {error && <p>{error}</p>}
         {post && (
            <>
               <div className="post__content">
                  <div className="post__header">
                     <h2>{post.title}</h2>
                     <div className="post__info">
                        <p>작성자 : {post.Member?.name}</p>
                        <p>조회수 : {post.views}</p>
                        <p>추천 : {post.likes}</p>
                     </div>
                  </div>
                  <hr />
                  <div className="post__main">
                     {post.img && <img src={`${import.meta.env.VITE_APP_API_URL}/${post.img}`} alt="이미지" />}
                     <p>{post.content}</p>
                  </div>
                  <div className="post__footer">
                     <button onClick={onIncrementLike}>추천하기</button>
                     <span>추천 : {post.likes}</span>
                     {member?.id === post.member_id && (
                        <>
                           <div>
                              <Link to={'/post/create'}>
                                 <button className="post__edit">수정</button>
                              </Link>
                              <button className="post__delete" onClick={onDelete}>
                                 삭제
                              </button>
                           </div>
                        </>
                     )}
                  </div>
                  <hr />
               </div>

               <div className="post__comment">
                  <Comment post={post} member={member} isAuthenticated={isAuthenticated} />
               </div>
            </>
         )}
      </>
   )
}

export default ViewContent
