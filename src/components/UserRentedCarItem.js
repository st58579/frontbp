import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import defaultPlaceholder from "../400x300.png";

const UserRentedCarItem = ({car}) => {
    return (
        <Card className="m-5 mt-3" style={{borderRadius: 10}}>
            <Row className="m-3">
                <Row style={{fontSize: 26}}><b>{car.makeName} {car.model} ({car.year})</b></Row>
                <Row style={{fontSize: 16, marginBottom: 7}}><b>{car.type} / {car.transmission} transmission</b> </Row>
                <Col md={4}>

                    <Image fluid width={"400rem"} height={""}
                           src={car.img ? car.img : defaultPlaceholder}/>
                </Col>

                <Col md={8}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 22}}
                    >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Rental condition:
                                    </Col>
                                    <Col md={5}>{car.conditionRental}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Rent date
                                    </Col>
                                    <Col md={5}>{car.dateFrom}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Return date
                                    </Col>
                                    <Col md={5}>{car.dateTo}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Daily rent price
                                    </Col>
                                    <Col md={5}>{car.pricePerDay}$</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Engine
                                    </Col>
                                    <Col md={5}>{car.engine}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default UserRentedCarItem;