import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAuthError, registerMemberThunk } from '../features/authSlice'
import { useEffect } from 'react'
function Register() {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [passwordRe, setPasswordRe] = useState('')
   const [name, setName] = useState('')
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { loading, error } = useSelector((s) => s.auth)

   useEffect(() => {
      // 로그인 컴포넌트를 벗어날때 error state가 null로 초기화
      return () => {
         dispatch(clearAuthError())
      }
   }, [dispatch])

   function onRegister(e) {
      e.preventDefault()
      if (loading) return
      if (password !== passwordRe) {
         alert('비밀번호가 일치하지 않습니다.')
         return
      }
      if (!email.trim() || !password.trim() || !name.trim() || !passwordRe.trim()) {
         alert('전부 입력해 주세요.')
         return
      }
      dispatch(registerMemberThunk({ email, password, name }))
         .unwrap()
         .then(() => {
            alert('회원가입 되었습니다!!!!!!')
            navigate('/')
         })
         .catch((err) => console.error(err))
   }

   return (
      <>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <form action="post" onSubmit={onRegister}>
            <label htmlFor="name">이름</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor="email">이메일</label>
            <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label htmlFor="password">비밀번호</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <label htmlFor="passwordRe">비밀번호 재입력</label>
            <input type="password" name="passwordRe" id="passwordRe" value={passwordRe} onChange={(e) => setPasswordRe(e.target.value)} />
            <br />
            {loading ? <p>로딩중...</p> : <button type="submit">가입하기</button>}
         </form>
      </>
   )
}

export default Register
