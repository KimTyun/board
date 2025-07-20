import { useEffect, useState } from 'react'
import Content from './Content'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardsThunk } from '../../features/postSlice'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

function MainBoard() {
   const dispatch = useDispatch()
   const { loading, error, posts, pagination } = useSelector((s) => s.post)
   const [page, setPage] = useState(1)
   const [count, setCount] = useState(1)

   useEffect(() => {
      dispatch(fetchBoardsThunk({ page }))
   }, [dispatch, page])

   useEffect(() => {
      setCount(pagination?.totalPages)
   }, [pagination])

   function onChangePage(_, v) {
      setPage(v)
   }

   if (loading) {
      return <p>로딩중...</p>
   }

   return (
      <>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         {posts && (
            <div className="board">
               <div className="board__notice-wrap"></div>
               <div className="board__post-wrap">
                  {posts.map((e) => {
                     return <Content post={e} key={e.id} />
                  })}
               </div>

               <Stack spacing={2}>
                  <Pagination count={count} page={page} showFirstButton showLastButton size="large" onChange={onChangePage} />
               </Stack>
            </div>
         )}
      </>
   )
}

export default MainBoard
