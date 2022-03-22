import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import MakeBar from "../components/MakeBar";
import CarList from "../components/CarList";
import {Context} from "../index";
import {fetchAllCars, fetchMakes, fetchTypes} from "../api/CarsharingApi";
import {observer} from "mobx-react-lite";

const Carsharing = observer(() => {
    const {cars} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMakes()
            .then(data => cars.setMakes(data))
            .then()
        fetchTypes()
            .then(data => cars.setTypes(data))
            .then()
        fetchAllCars()
            .then(data => cars.setCars(data))
            .finally(() => setLoading(false))
    }, [])

    if(loading){
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9} >
                    <MakeBar/>
                    <CarList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Carsharing;