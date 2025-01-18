import axios from 'axios'
import { useRouter } from 'vue-router'
import { getJwt, cleanJwt } from '@/utils/auth'

const router = useRouter()

export async function getStudentHomeworks() {
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

export async function getTeacherHomeworks() {
    return NaN
}