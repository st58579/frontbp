import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._username = {}
        this._role = {}
        this._id = {}
        makeAutoObservable(this)
    }

    setIsAuth(isAuth){
        this._isAuth = isAuth
    }

    setUsername(username){
        this._username = username
    }

    setRole(role){
        this._role = role
    }

    setId(idUser){
        this._id = idUser
    }

    get isAuth(){
        return this._isAuth
    }

    get username(){
        return this._username
    }

    get role(){
        return this._role
    }

    get id() {
        return this._id
    }
}