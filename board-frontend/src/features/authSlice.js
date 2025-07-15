import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginMember, registerMember, logoutMember, checkAuthenticated } from '../api/authApi'

export const registerMemberThunk = createAsyncThunk('auth/registerMemberThunk', async (memberData, { rejectWithValue }) => {
   try {
      const response = await registerMember(memberData)

      return response
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message)
   }
})

export const loginMemberThunk = createAsyncThunk('auth/loginMemberThunk', async (loginData, { rejectWithValue }) => {
   try {
      const response = await loginMember(loginData)
      return response
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message)
   }
})

export const logoutMemberThunk = createAsyncThunk('auth/logoutMember', async (_, { rejectWithValue }) => {
   try {
      const response = await logoutMember()
      console.log(response, '로그아웃 리스펀스')
      return response.data
   } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data?.message)
   }
})

export const checkisAuthenticatedThunk = createAsyncThunk('auth/checkisAuthenticatedThunk', async (_, { rejectWithValue }) => {
   try {
      const response = await checkAuthenticated()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message)
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      member: null,
      isAuthenticated: false,
      loading: false,
      error: null,
   },
   reducers: {
      clearAuthError: (state) => {
         state.error = null
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(registerMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(registerMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload
         })
         .addCase(registerMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(loginMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(loginMemberThunk.fulfilled, (state, action) => {
            state.loading = false
            state.member = action.payload.member
            state.isAuthenticated = true
         })
         .addCase(loginMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(logoutMemberThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(logoutMemberThunk.fulfilled, (state) => {
            state.loading = false
            state.member = null
            state.isAuthenticated = false
         })
         .addCase(logoutMemberThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })

         .addCase(checkisAuthenticatedThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(checkisAuthenticatedThunk.fulfilled, (state, action) => {
            state.loading = false
            state.isAuthenticated = action.payload.isAuthenticated
            state.member = action.payload.member || null
         })
         .addCase(checkisAuthenticatedThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            console.log('리젝트,', state.error)
         })
   },
})

export default authSlice.reducer
export const { clearAuthError } = authSlice.actions
