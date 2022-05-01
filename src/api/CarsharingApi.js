import {$host, $authHost} from "./Api"

export const fetchMakes = async () => {
    const {data} = await $host.get('api/carsharing/makes')
    return data
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/carsharing/types')
    return data
}
export const addType = async (type) => {
    await $host.post('api/carsharing/type/add', {type})
}
export const addMake = async (make) => {
    await $host.post('api/carsharing/make/add', {make})
}
export const fetchAllCarsPaginated = async (id) => {
    const {data} = await $host.get('api/carsharing/all/' + id)
    return data
}
export const fetchAllCarsPaginatedAndFiltered = async (makeId, typeId, page, limit, userId) => {
    const {data} = await $host.post('api/carsharing/filter', {makeId: makeId, typeId: typeId, page: ((page - 1) * limit), limit: limit, userId: userId})
    return data
}
export const fetchSingleCar = async (id) => {
    const {data} = await $host.get('api/carsharing/' + id)
    return data
}
export const fetchUserCars = async (id) => {
    const {data} = await $host.get('api/carsharing/user/' + id)
    return data
}
export const fetchRentedUserCars = async (id) => {
    const {data} = await $host.get('api/carsharing/rented/' + id)
    return data
}

export const rentCar = async (userId, carId, startDate, endDate) => {
    const {data} = await $host.post('api/rent', {userId, carId, startDate, endDate})
    return data
}
export const returnCar = async (carId) => {
    await $host.post('api/rent/return/' + carId)
}
export const changeCarStatus = async (availability, carId) => {
    const {data} = await $host.post('api/carsharing/car/update/availability', {availability, carId})
    return data
}

export const updatePrice = async (carId, price) => {
    await $host.post('api/carsharing/price/update/' + carId, price)
}

export const addCar = async (auto) => {
    await $authHost.post('api/carsharing/car/add', auto)
}