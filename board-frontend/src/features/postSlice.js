import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard, deleteBoard, getBoard, getBoards, updateBoard } from '../api/authApi'

export const createBoardThunk = createAsyncThunk('post/createBoardThunk', async (formData, { rejectWithValue }) => {
   try {
      const response = await createBoard(formData)
      return response.data
   } catch (error) {
      return rejectWithValue({
         message: error.response?.data?.message || '서버 오류',
         status: error.response?.status || 500,
      })
   }
})

export const updateBoardThunk = createAsyncThunk('post/updateBoardThunk', async (formData, { rejectWithValue }) => {
   try {
      const response = await updateBoard(formData)
      return response.data
   } catch (error) {
      return rejectWithValue({
         message: error.response?.data?.message || '서버 오류',
         status: error.response?.status || 500,
      })
   }
})

export const deleteBoardThunk = createAsyncThunk('post/deleteBoardThunk', async (id, { rejectWithValue }) => {
   try {
      const response = await deleteBoard(id)
      return response.data
   } catch (error) {
      return rejectWithValue({
         message: error.response?.data?.message || '서버 오류',
         status: error.response?.status || 500,
      })
   }
})

export const fetchBoardsThunk = createAsyncThunk('post/fetchBoardsThunk', async (data = {}, { rejectWithValue }) => {
   try {
      const limit = data.limit || 5
      const page = data.page || 1
      const response = await getBoards({ limit, page })
      return response.data
   } catch (error) {
      return rejectWithValue({
         message: error.response?.data?.message || '서버 오류',
         status: error.response?.status || 500,
      })
   }
})

export const fetchBoardThunk = createAsyncThunk('post/fetchBoardThunk', async (id, { rejectWithValue }) => {
   try {
      const response = await getBoard(id)
      return response.data
   } catch (error) {
      console.log(error)
      return rejectWithValue({
         message: error.response?.data?.message || '서버 오류',
         status: error.response?.status || 500,
      })
   }
})

const postSlice = createSlice({
   name: 'post',
   initialState: {
      posts: null,
      pagination: null,
      loading: false,
      error: null,
      post: null,
   },
   reducers: {
      clearPostError: (s) => {
         s.error = null
      },
      clearPost: (s) => {
         s.post = null
      },
   },
   extraReducers: (b) => {
      b.addCase(createBoardThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })
         .addCase(createBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(fetchBoardsThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardsThunk.fulfilled, (state, action) => {
            state.loading = false
            state.posts = action.payload.boards
            state.pagination = action.payload.pagination
         })
         .addCase(fetchBoardsThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(fetchBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(fetchBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload.post
         })
         .addCase(fetchBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(deleteBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(deleteBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(deleteBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(updateBoardThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(updateBoardThunk.fulfilled, (state) => {
            state.loading = false
         })
         .addCase(updateBoardThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
export const { clearPostError, clearPost } = postSlice.actions
