import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/login'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkisAuthenticatedThunk } from './features/authSlice'

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(checkisAuthenticatedThunk())
   }, [dispatch])

   return (
      <>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
         </Routes>
      </>
   )
}

export default App
