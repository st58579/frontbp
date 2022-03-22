import {makeAutoObservable} from "mobx";

export default class AutoStore {
    constructor() {
        this._makes = []
        this._types = []
        this._cars = [
            {
                idCar: 1,
                model: 'X5',
                year: '2020',
                seatsNumber: 7,
                pricePerDay: '1000',
                make: 'BMW',
                type: 'Hatchback',
                img: 'http://holder.ninja/400x300.svg'
            }
        ]
        this._selectedType = {}
        this._selectedMake = {}
        makeAutoObservable(this)
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