import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {AUTO_ROUTE} from "../utils/consts";

const CarListItem = ({car}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} onClick={() => navigate(AUTO_ROUTE + '/' + car.idCar)}>
            <Card style={{width: 202, cursor: "pointer", marginTop: "10px", alignItems: "center"}} border={"primary"}>
                <Image width={200} height={200} src={car.img}/>
                <div className="align-items-center">
                    <div>Car ID: {car.idCar}</div>
                    <div>Model: {car.model}</div>
                    <div>Make: {car.make}</div>
                    <div>Type: {car.type}</div>
                    <div>Price/day: {car.pricePerDay}</div>
                </div>

            </Card>
        </Col>
    );
};

export default CarListItem;