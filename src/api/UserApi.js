import {$host, $authHost} from "./Api"
import jwtDecode from "jwt-decode";

export const registration = async (username, password) => {
    const {data} = await $host.post('api/auth/registration', {username, password, role: 'user'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
export const login = async (username, password) => {
    const {data} = await $host.post('api/auth/login', {username, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('isAuth', "true")
    localStorage.setItem('username', data.username)
    localStorage.setItem('role', data.role)
    localStorage.setItem('id', data.id)
    return data
}
export const check = async (token) => {
    const {data} = await $authHost.post('api/auth/check', 'Bearer ' + localStorage.getItem('token'))
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)}