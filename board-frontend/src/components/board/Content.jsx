import { Link } from 'react-router-dom'
import icon from '../../assets/icon_reply.svg'
import '../../css/board/board.css'

import noImg from '../../assets/images.png'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

function Content({ post }) {
   dayjs.extend(relativeTime)
   dayjs.locale('ko')

   return (
      <Link to={`/board/view/${post.id}`}>
         <div className="board__img-preview">
            <img src={post.img ? `${import.meta.env.VITE_APP_API_URL}/${post.img}` : noImg} alt="미리보기" />
         </div>

         <div className="board__info">
            <div className="board__title-container">
               <span className="board__title">{post.title}</span>
               <div className="board__comment">
                  <img src={icon} alt="댓글 아이콘" />
                  <span>0</span>
               </div>
            </div>

            <div className="board__meta">
               <div className="board__like-point">추천 : {post.likes}</div>
               <div className="board__author">{post.Member.name}</div>
               <div className="board__view">조회수: {post.views}</div>
               <div className="board__datetime">{dayjs(post.createdAt).fromNow()}</div>
            </div>
         </div>
      </Link>
   )
}

export default Content
