import { useSelector } from 'react-redux'
import MainBoard from '../components/board/MainBoard'

function Home() {
   const { loading, error } = useSelector((s) => s.auth)

   if (loading) {
      return (
         <>
            <p>로딩중...</p>
         </>
      )
   }

   return (
      <>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <hr />
         <MainBoard />
      </>
   )
}

export default Home
