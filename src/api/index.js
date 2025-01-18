import axios from 'axios'
import { useRouter } from 'vue-router'
import { getJwt, cleanJwt } from '@/utils/auth'

const router = useRouter()

export async function login(username, password) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {
        username,
        password
        }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message || 'Login failed')
  }
}

export async function getStudentHomeworks(token) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/student/getHomework`, {
        headers: {
            'Authorization': `Bearer ${getJwt()}`
        }
    })
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      cleanJwt()
      router.push('/login')
      throw new Error('Unauthorized')
    }
    throw new Error(error.response.data.message || 'Failed to fetch homeworks')
  }
}