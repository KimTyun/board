import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL

const snsApi = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
})

export const registerMember = async (memberData) => {
   try {
      console.log('registerMember로그', memberData)
      const response = await snsApi.post('/auth/join', memberData)
      return response.data
   } catch (error) {
      console.error(`registerMember/API 오류👀 `, error)
      throw error
   }
}

export const loginMember = async (loginData) => {
   try {
      const response = await snsApi.post('/auth/login', loginData)
      return response.data
   } catch (error) {
      console.error(`loginMember/API 오류👀 `, error)
      throw error
   }
}

export const logoutMember = async () => {
   try {
      const response = await snsApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`logoutMember/API 오류👀 `, error)
      throw error
   }
}

export const checkAuthenticated = async () => {
   try {
      const response = await snsApi.get('/auth/status')
      console.log('api에서 본 response', response)
      return response
   } catch (error) {
      console.error(`checkAuthenticated/API 오류👀 `, error)
      throw error
   }
}
