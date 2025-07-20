import { useEffect } from 'react'

// st={post} member={member} isAuthenticated={isAuthenticated} />
function Comment({ post, member, isAuthenticated }) {
   useEffect(() => {
      /*댓글 테이블에서 댓글 가져오기 */
   }, [post])
   return (
      <>
         {/* <input type="text" name="comment" id="comment" />
         <label htmlFor="comment">댓글달기</label>
         {isAuthenticated || (
            <>
               <input type="password" name="guestPw" id="guestPw" />
            </>
         )} */}
      </>
   )
}

export default Comment
