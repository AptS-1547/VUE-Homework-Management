import axios from 'axios'
import { getJwt, cleanJwt } from '@/utils/auth'

export async function uploadHomework(homework_name, comment, files, callback) {
    try {
        const formData = new FormData()
        formData.append('homework_name', homework_name)
        formData.append('comment', comment)
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }

        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/student/submitHomework`, formData, {
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                callback(percentCompleted)
            }
        })
        return response.data
    } catch (error) {
        console.log(error.message)
        if (error.response.status === 401) {
            cleanJwt()
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }
        throw new Error(error.response.data.message || 'Failed to upload homework')
    }
}

export async function replyHomework(student, homework, reply) {
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/teacher/replyHomework`, {student: student, homework: homework, reply: reply }, {
            headers: {
                'Authorization': `Bearer ${getJwt()}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        if (error.response.status === 401) {
            cleanJwt()
            window.location.href = '/login'
            throw new Error('Unauthorized')
        }
        throw new Error(error.response.data.message || 'Failed to reply homework')
    }
}
