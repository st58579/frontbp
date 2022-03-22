import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CarListItem from "./CarListItem";

const CarList = () => {
    const {cars} = useContext(Context)
    return (
        <Row className="d-flex">
            {cars.cars.map(car =>
                <CarListItem key={car.idCar} car={car}/>
            )}
        </Row>
    );
};

export default CarList;