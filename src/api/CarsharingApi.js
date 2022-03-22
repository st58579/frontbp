import {$host, $authHost} from "./Api"
import jwtDecode from "jwt-decode";

export const addMake = async (username, password) => {
    const {data} = await $host.post('api/auth/registration', {username, password, role: 'user'})
    return jwtDecode(data.token)
}
export const fetchMakes = async () => {
    const {data} = await $host.get('api/carsharing/makes')
    return data
}

export const addType = async (username, password) => {
    const {data} = await $host.post('api/auth/registration', {username, password, role: 'user'})
    return jwtDecode(data.token)
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/carsharing/types')
    return data
}

export const fetchAllCars = async () => {
    const {data} = await $host.get('api/carsharing/cars')
    return data
}

export const check = async (token) => {
    const {data} = await $authHost.post('api/auth/check', localStorage.getItem('token'))
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)}