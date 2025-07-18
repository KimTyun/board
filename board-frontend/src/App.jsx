import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/login'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkisAuthenticatedThunk, logoutMemberThunk } from './features/authSlice'
import CreatePoster from './pages/createPoster'
import ViewContent from './components/board/ViewContent'
import Header from './components/shares/Header'

function App() {
   const { isAuthenticated, loading, error, member } = useSelector((s) => s.auth)
   const dispatch = useDispatch()

   function onLogout() {
      dispatch(logoutMemberThunk())
         .unwrap()
         .then(() => alert('로그아웃 되엇습니다.'))
         .catch((e) => alert('로그아웃 실패', e))
   }

   useEffect(() => {
      dispatch(checkisAuthenticatedThunk())
   }, [dispatch])

   return (
      <>
         <Header member={member} isAuthenticated={isAuthenticated} onLogout={onLogout} />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/create" element={<CreatePoster />}></Route>
            <Route path="/board/view/:id" element={<ViewContent />}></Route>
         </Routes>
      </>
   )
}

export default App
