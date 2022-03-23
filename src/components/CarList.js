import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CarListItem from "./CarListItem";

const CarList = () => {
    const {autoStore} = useContext(Context)
    return (
        <Row className="d-flex">
            {autoStore.cars.map(car =>
                <CarListItem key={car.idCar} car={car}/>
            )}
        </Row>
    );
};

export default CarList;