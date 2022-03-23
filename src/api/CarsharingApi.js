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
    const {data} = await $host.get('api/carsharing/all')
    return data
}
export const fetchAllCarsPaginated = async () => {
    const {data} = await $host.get('api/carsharing')
    return data
}
export const fetchAllCarsPaginatedAndFiltered = async (makeId, typeId, page, limit) => {
    const {data} = await $host.post('api/carsharing/filter', {makeId: makeId, typeId: typeId, page: ((page - 1) * limit), limit: limit})
    return data
}
export const fetchSingleCar = async (id) => {
    const {data} = await $host.get('api/carsharing/' + id)
    return data
}
export const addCar = async (auto) => {
    await $authHost.post('api/carsharing/car/add', auto)
}