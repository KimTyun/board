import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkisAuthenticatedThunk } from '../features/authSlice'

export default function useAuthGuard() {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(checkisAuthenticatedThunk())
         .unwrap()
         .then((result) => {
            if (!result.isAuthenticated) {
               alert('로그인이 필요한 페이지입니다.')
               navigate('/login')
            }
         })
         .catch((err) => {
            console.error('인증 체크 중 오류 발생:', err)
            navigate('/login')
         })
   }, [dispatch, navigate])
}
