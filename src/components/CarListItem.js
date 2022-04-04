import React from 'react';
import {Card, Col, Image, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {AUTO_ROUTE} from "../utils/consts";
import defaultPlaceholder from "../400x300.png"

const CarListItem = ({car}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} onClick={() => navigate(AUTO_ROUTE + '/' + car.idCar)}>
            <Card style={{width: 200, cursor: "pointer", marginTop: "10px", alignItems: "center"}} border={"info"}>
                <Image width={200} height={200} src={car.img ? car.img : defaultPlaceholder}/>
                <Card.Body className="align-items-left">
                    <Card.Title >{car.makeName} {car.model}</Card.Title>
                    <Card.Subtitle>Price/day: {car.pricePerDay}</Card.Subtitle>
                    <ListGroup variant="">
                        <div>Car ID: {car.idCar}</div>
                        <div>Make: {car.makeName}</div>
                        <div>Type: {car.type}</div>
                    </ListGroup>
                </Card.Body>

            </Card>
        </Col>
    );
};

export default CarListItem;