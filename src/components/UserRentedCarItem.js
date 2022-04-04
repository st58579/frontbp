import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Card, Col, Form, Image, ListGroup, Modal, Row} from "react-bootstrap";
import defaultPlaceholder from "../400x300.png";
import {CARSHARING_ROUTE} from "../utils/consts";

const UserRentedCarItem = ({car}) => {
    const navigate = useNavigate()

    return (
        <Card className="m-5" style={{borderRadius: 10}}>
            <Row className="m-3">
                <Row style={{fontSize: 26}}><b>{car.makeName} {car.model}</b></Row>
                <Row style={{fontSize: 16, marginBottom: 7}}><b>2.5 / Бензин / Автомат</b> </Row>
                <Col md={4}>

                    <Image fluid width={"400rem"} height={""}
                           src={car.img ? car.img : defaultPlaceholder}/>
                </Col>

                <Col md={4}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 22}}
                    >
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Type
                                    </Col>
                                    <Col md={5}>{car.type}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Year
                                    </Col>
                                    <Col md={5}>{car.year}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Price/day
                                    </Col>
                                    <Col md={5}>{car.pricePerDay}$</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Engine
                                    </Col>
                                    <Col md={5}>2.5 l 200 h.p.</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={7}>
                                        Transmission
                                    </Col>
                                    <Col md={5}>Automatic</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={4}>
                    <Row>
                        <Button className={"mt-3"} variant={"outline-dark"} size={"lg"}
                                onClick={() => navigate(CARSHARING_ROUTE)}>Back to catalog</Button>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};

export default UserRentedCarItem;