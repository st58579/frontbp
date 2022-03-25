import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {fetchSingleCar} from "../api/CarsharingApi";
import defaultPlaceholder from '../400x300.png'
import {CARSHARING_ROUTE} from "../utils/consts";

const AutoPage = () => {
    const [selectedAuto, setSelectedAuto] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        fetchSingleCar(id).then(data => setSelectedAuto(data)).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Card className="m-5" style={{borderRadius: 10}}>
                <Row className="m-3">
                    <Row style={{fontSize: 26}}><b>Rent {selectedAuto.makeName} {selectedAuto.model}</b></Row>
                    <Row style={{fontSize: 16, marginBottom: 7}}><b>2.5 / Бензин / Автомат</b> </Row>
                    <Col md={4}>

                        <Image fluid width={"400rem"} height={""}
                               src={selectedAuto.img ? selectedAuto.img : defaultPlaceholder}/>
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
                                        <Col md={5}>{selectedAuto.type}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col md={7}>
                                            Year
                                        </Col>
                                        <Col md={5}>{selectedAuto.year}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={7}>
                                            Price/day
                                        </Col>
                                        <Col md={5}>{selectedAuto.pricePerDay}$</Col>
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
                            <Button variant={"outline-dark"} size={"lg"}>Rent this car</Button>
                            <Button className={"mt-3"} variant={"outline-dark"} size={"lg"} onClick={() => navigate(CARSHARING_ROUTE)}>Back to catalog</Button>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Card className="m-5" style={{borderRadius: 10}}>
                <Row>
                    <Col md={4}>

                    </Col>
                    <Col md={4}>

                    </Col>
                    <Col md={4}>
                        <div className="m-5">
                            <Image fluid width={"400rem"} height={""}
                                   src={selectedAuto.img ? selectedAuto.img : defaultPlaceholder}/>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default AutoPage;