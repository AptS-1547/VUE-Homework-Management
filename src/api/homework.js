import axios from 'axios'
import { getJwt, cleanJwt } from '@/utils/auth'

export async function getStudentHomework(params = {}) {
  if (params.homework) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/student/getHomework/${params.homework}`, {
            headers: {
                'Authorization': `Bearer ${getJwt()}`
            }
        })
        return response.data
    } catch (error) {
        if (error.response.status === 401) {
            cleanJwt()
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }
        throw new Error(error.response.data.message || 'Failed to fetch homeworks')
    }
  }

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
        window.location.href = '/login'
        throw new Error('Unauthorized')
      }
      throw new Error(error.response.data.message || 'Failed to fetch homeworks')
    }
  }

export async function getTeacherHomework(params = {}) {

  if (params.student && params.homework) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/teacher/getHomework/${params.student}/${params.homework}`, {
            headers: {
                'Authorization': `Bearer ${getJwt()}`
            }
        })
        return response.data
    } catch (error) {
        if (error.response.status === 401) {
            cleanJwt()
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }
        throw new Error(error.response.data.message || 'Failed to fetch homeworks')
    }
  }

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/teacher/getHomework`, {
          headers: {
            'Authorization': `Bearer ${getJwt()}`
        }
      })
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        cleanJwt()
        window.location.href = '/login'
        throw new Error('Unauthorized')
      }
      throw new Error(error.response.data.message || 'Failed to fetch homeworks')
    }
}

export async function getUploadStatus() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/teacher/getUploadStatus`, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`
      }
    })
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      cleanJwt()
      window.location.href = '/login'
      throw new Error('Unauthorized')
    }
    throw new Error(error.response.data.message || 'Failed to fetch upload status')
  }
}