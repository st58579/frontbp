import React from 'react';
import {Card, Col, Container, Image, Row} from "react-bootstrap";

const AutoPage = () => {
    const car = {
        id: 5,
        model: 'X',
        year: '2020',
        seats_number: 7,
        price_per_day: '1000',
        makeName: 'BMW',
        type: 'Hatchback',
        img: 'http://holder.ninja/400x300.svg'
    }

    return (
        <Container>
            <Row className="m-5">
                <Col md={4}>
                    <Image width={300} height={300} src={car.img}/>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{car.makeName}</h3>
                        <h3>{car.model}</h3>
                        <h3>{car.type}</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{car.makeName}</h3>
                        <h3>{car.model}</h3>
                        <h3>{car.type}</h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AutoPage;