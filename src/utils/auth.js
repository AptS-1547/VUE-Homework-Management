import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export function getUserFromToken() {
  try {
    const token = Cookies.get("access_token")
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

export function isLogin() {
  const token = Cookies.get("access_token")
  return token ? true : false
}

export function getJwt() {
  return Cookies.get("access_token")
}

export function cleanJwt() {
  Cookies.remove("access_token")
}

export function getUsername() {
  const user = getUserFromToken()
  return user ? user.username : null
}

export function getUserRole() {
  const user = getUserFromToken()
  return user ? user.role : null
}
