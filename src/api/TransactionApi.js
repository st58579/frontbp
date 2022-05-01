import {$host, $authHost} from "./Api"

export const fetchUserTransactions = async (id) => {
    const {data} = await $host.get('api/transactions/user/' + id)
    return data
}

export const fetchAllTransaction = async () => {
    const {data} = await $host.get('api/transactions/all')
    return data
}

export const fetchUserRentHistory = async (id) => {
    const {data} = await $host.get('api/transactions/history/user/' + id)
    return data
}