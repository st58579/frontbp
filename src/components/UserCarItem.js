import React, {useState} from 'react';
import {Button, Card, Col, Form, Image, ListGroup, Modal, Row} from "react-bootstrap";
import defaultPlaceholder from "../400x300.png";
import {CARSHARING_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {changeCarStatus, updatePrice} from "../api/CarsharingApi";

const UserCarItem = ({car}) => {
    const navigate = useNavigate()
    const [price, setPrice] = useState(car.pricePerDay)
    const [editCarVisible, setEditCarVisible] = useState(false)

    const onSubmit = () => {
        updatePrice(car.idCar, {price}).then(() => {
            car.pricePerDay = price
            setEditCarVisible(false)
        })
    }

    const setAvailable = () => {
        changeCarStatus(1, car.idCar).then(() => window.location.reload())
    }

    const setUnavailable = () => {
        changeCarStatus(0, car.idCar).then(() => window.location.reload())
    }

    return (
        <Card className="m-5 mt-3" style={{borderRadius: 10}}>
            <Row className="m-3">
                <Row style={{fontSize: 26}}><b>{car.makeName} {car.model}</b></Row>
                <Col md={4}>

                    <Image fluid width={"400rem"} height={""}
                           src={car.img ? car.img : defaultPlaceholder}/>
                </Col>

                <Col md={6}>
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
                                    <Col md={5}>{car.engine}</Col>
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
                <Col md={2}>
                    <Row>
                        <Button variant={"outline-dark"} size={"lg"}
                                onClick={() => setEditCarVisible(true)}>Edit price</Button>
                        <Button className={"mt-3"} variant={"outline-dark"} size={"lg"}
                                onClick={() => navigate(CARSHARING_ROUTE)}>Back to catalog</Button>
                        {car.available === 0
                        ?
                            <Button className={"mt-3"} variant={"outline-success"} size={"lg"}
                                    onClick={() => setAvailable()}>Set available</Button>
                            :
                            <Button className={"mt-3"} variant={"outline-danger"} size={"lg"}
                                    onClick={() => setUnavailable()}>Set unavailable</Button>
                        }
                        </Row>
                </Col>
            </Row>

            <Modal
                centered
                show={editCarVisible}
                onHide={() => setEditCarVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Set rent price for {car.makeName} {car.model}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control value={price} onChange={e => setPrice(Number(e.target.value))} className="mt-3"
                                      type="number" min="0" placeholder="Price"/>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={() => setEditCarVisible(false)}>Cancel</Button>
                    <Button variant={"outline-success"} onClick={onSubmit}>Update</Button>
                </Modal.Footer>
            </Modal>
        </Card>

    );
};

export default UserCarItem;