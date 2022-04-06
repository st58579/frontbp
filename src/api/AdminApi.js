import {$host} from "./Api"

export const makeAdmin = async (idAdmin, idUser) => {
    const {data} = await $host.post('api/profile/admin/changeRole', {idAdmin: idAdmin, idUser: idUser, role: 'admin'})
    return data
}

export const removeAdmin = async (idAdmin, idUser) => {
    console.log("admin", idAdmin)

    const {data} = await $host.post('api/profile/admin/changeRole', {idAdmin: idAdmin, idUser: idUser, role: 'user'})
    return data
}