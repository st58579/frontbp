import {makeAutoObservable} from "mobx";

export default class UserStore{
    constructor() {
        this._isAuth = false
        this._username = {}
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(isAuth){
        this._isAuth = isAuth
    }

    setUser(user){
        this._user = user
    }

    setUsername(username){
        this._username = username
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get username(){
        return this._username
    }
}