import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createBoard } from '../api/authApi'

export const createBoardThunk = createAsyncThunk('post/createBoardThunk', async (formData, { rejectWithValue }) => {
   try {
      const response = await createBoard(formData)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const postSlice = createSlice({
   name: 'post',
   initialState: {
      loading: false,
      error: null,
      post: null,
   },
   reducers: {},
   extraReducers: (b) => {
      b.addCase(createBoardThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })
         .addCase(createBoardThunk.fulfilled, (state, action) => {
            state.loading = false
            state.post = action.payload
         })
         .addCase(createBoardThunk.rejected, (state, action) => {
            state.loading = true
            state.error = action.payload
         })
   },
})

export default postSlice.reducer
