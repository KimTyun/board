import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutMemberThunk } from '../features/authSlice'

function Home() {
   const { isAuthenticated, loading, error, member } = useSelector((s) => s.auth)
   const dispatch = useDispatch()

   function onLogout() {
      dispatch(logoutMemberThunk())
         .unwrap()
         .then(() => alert('로그아웃 되엇습니다.'))
         .catch((e) => alert('로그아웃 실패', e))
   }

   if (loading) {
      return (
         <>
            <p>로딩중...</p>
         </>
      )
   }

   return (
      <>
         <>해윙</>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <br />
         {isAuthenticated ? (
            <button type="button" onClick={onLogout}>
               로그아웃하기
            </button>
         ) : (
            <Link to={'/login'}>
               <button>로그인하러가기</button>
            </Link>
         )}
         <Link to={'/register'}>
            <button>회원가입하러가기</button>
         </Link>
         <p>현재 상태 : {isAuthenticated ? `로그인됨: ${member?.name}` : '로그인 안됨'}</p>
      </>
   )
}

export default Home
