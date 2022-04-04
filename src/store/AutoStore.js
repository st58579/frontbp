import {makeAutoObservable} from "mobx";

export default class AutoStore {
    constructor() {
        this._makes = []
        this._types = []
        this._cars = []
        this._selectedType = {idType: 0, type: "All types"}
        this._selectedMake = {idMake: 0, make: "All makes"}
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        this._selectedAuto = {}
        makeAutoObservable(this)
    }

    setSelectedAuto(selectedAuto){
        this._selectedAuto = selectedAuto
    }

    get selectedAuto(){
        return this._selectedAuto
    }

    setLimit(limit){
        this._limit = limit
    }

    get limit(){
        return this._limit
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    get totalCount(){
        return this._totalCount
    }

    setPage(page){
        this._page = page
    }

    get page(){
        return this._page
    }

    setMakes(makes) {
        this._makes = makes
    }

    setTypes(types) {
        this._types = types
    }

    setCars(cars) {
        this._cars = cars
    }

    setSelectedType(selectedType) {
        this._selectedType = selectedType
    }

    setSelectedMake(selectedMake) {
        this._selectedMake = selectedMake
    }

    get makes() {
        return this._makes
    }

    get types() {
        return this._types
    }

    get cars() {
        return this._cars
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedMake() {
        return this._selectedMake
    }
}