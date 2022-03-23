import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {fetchSingleCar} from "../api/CarsharingApi";
import defaultPlaceholder from '../400x300.png'

const AutoPage = () => {
    const [selectedAuto, setSelectedAuto] = useState(null)
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSingleCar(id).then(data => setSelectedAuto(data)).finally(() => setLoading(false))
    }, [])

    if(loading){
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row className="m-5">
                <Col md={4}>
                    <Image width={300} height={300} src={selectedAuto.img ? selectedAuto.img : defaultPlaceholder}/>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{selectedAuto.makeName} {selectedAuto.model}</h3>
                        <h3>{selectedAuto.type}</h3>
                        <h3>{selectedAuto.year}</h3>
                        <h3>{selectedAuto.pricePerDay}</h3>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column"
                        style={{fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{selectedAuto.makeName}</h3>
                        <h3>{selectedAuto.model}</h3>
                        <h3>{selectedAuto.type}</h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AutoPage;