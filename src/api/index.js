import axios from 'axios'

export async function login(username, password, rememberMe) {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/login`, {
        username,
        password,
        rememberMe
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
