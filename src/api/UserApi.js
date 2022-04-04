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
export const fetchUserDetails = async(username) => {
    const {data} = await $authHost.get('api/profile/' + username)
    console.log(data)
    return data
}
export const uploadUserProfilePicture = async(id, img) => {
    const {data} = await $authHost.post('api/profile/img/' + id, img)
    return data
}
export const updateUserDetails = async(id, data) => {
    await $authHost.post('api/profile/update/' + id, data)
}
export const addUserDetails = async(id, data) => {
    await $authHost.post('api/profile/add/' + id, data)
}
export const getWallet = async(id) => {
    const {data} = await $authHost.get('api/profile/wallet/' + id)
    return data
}



export const check = async (token) => {
    const {data} = await $authHost.post('api/auth/check', 'Bearer ' + localStorage.getItem('token'))
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)}