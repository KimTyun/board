import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthError, loginMemberThunk } from '../features/authSlice'
import { useEffect } from 'react'

function Login() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((s) => s.auth)

   useEffect(() => {
      // 로그인 컴포넌트를 벗어날때 error state가 null로 초기화
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   function onLogin(e) {
      e.preventDefault()
      console.log(email, password)
      if (loading) {
         return
      }
      if (!email.trim() || !password.trim()) {
         alert('이메일과 패스워드를 입력해주세요.')
         return
      }
      dispatch(loginMemberThunk({ email, password }))
         .unwrap()
         .then(() => {
            alert('로그인 성공!!!')
            navigate('/')
         })
         .catch((err) => {
            console.error('로그인 실패', err)
         })
   }

   return (
      <>
         <>로긴</>
         {error && <p>{error}</p>}
         <form action="post" onSubmit={onLogin}>
            <label htmlFor="email">이메일</label>
            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <br />
            <label htmlFor="password">비밀번호</label>
            <input type="text" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            {loading ? <p>로딩중...</p> : <button type="submit">로긴하기</button>}
         </form>
      </>
   )
}

export default Login
