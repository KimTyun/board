import { Link } from 'react-router-dom'
import '../../css/shares/header.css'

function Header({ isAuthenticated, member, onLogout }) {
   return (
      <>
         <div className="navbar-wrap">
            <header className="navbar">
               <div>
                  <p>메뉴</p>
               </div>
               <div>
                  <Link to={'/'}>
                     <h1>게시판</h1>
                  </Link>
               </div>
               <div>
                  <p> {isAuthenticated ? `회원 : ${member?.name}` : '비회원'}</p>
                  {isAuthenticated ? (
                     <button type="button" onClick={onLogout}>
                        로그아웃하기
                     </button>
                  ) : (
                     <Link to={'/login'}>
                        <button>로그인하러가기</button>
                     </Link>
                  )}
                  {isAuthenticated ? (
                     <Link to={'/post/create'}>
                        <button>게시글 작성하기</button>
                     </Link>
                  ) : (
                     <Link to={'/register'}>
                        <button>회원가입하러가기</button>
                     </Link>
                  )}
               </div>
            </header>
         </div>
      </>
   )
}

export default Header
