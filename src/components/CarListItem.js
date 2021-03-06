import React from 'react';
import {Card, Col, Image, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import {AUTO_ROUTE} from "../utils/consts";
import defaultPlaceholder from "../400x300.png"

const CarListItem = ({car}) => {
    const navigate = useNavigate()

    return (
        <Col md={3} onClick={() => navigate(AUTO_ROUTE + '/' + car.idCar)}>
            <Card style={{width: 200, height: 300, cursor: "pointer", marginTop: "10px", alignItems: "center"}} border={"info"}>
                <Image width={198} height={150} src={car.img ? car.img : defaultPlaceholder}/>
                <Card.Body style={{width: 200}}>
                    <Card.Title >{car.makeName} {car.model}</Card.Title>
                    <Card.Subtitle>Price: {car.pricePerDay}$/day</Card.Subtitle>
                    <ListGroup variant="">
                        <div>Type: {car.type}</div>
                        <div>Engine: {car.engine}</div>
                        <div>Year: {car.year}</div>

                    </ListGroup>
                </Card.Body>

            </Card>
        </Col>
    );
};

export default CarListItem;