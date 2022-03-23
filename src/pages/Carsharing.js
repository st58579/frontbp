import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import MakeBar from "../components/MakeBar";
import CarList from "../components/CarList";
import {Context} from "../index";
import {
    fetchAllCarsPaginated,
    fetchAllCarsPaginatedAndFiltered,
    fetchMakes,
    fetchTypes
} from "../api/CarsharingApi";
import {observer} from "mobx-react-lite";
import Pages from "../components/Pages";

const Carsharing = observer(() => {
    const {autoStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMakes().then(data => autoStore.setMakes(data))
        fetchTypes().then(data => autoStore.setTypes(data))
        fetchAllCarsPaginated().then(data => {
                autoStore.setCars(data.cars)
                autoStore.setTotalCount(data.count)
            })
    }, [])

    useEffect(() => {
        setLoading(true)
        console.log("fetching cars : ", autoStore.selectedMake.idMake, autoStore.selectedType.idType, autoStore.page, autoStore.limit)
        fetchAllCarsPaginatedAndFiltered(autoStore.selectedMake.idMake, autoStore.selectedType.idType, autoStore.page, autoStore.limit)
            .then(data => {
                autoStore.setCars(data.cars)
                autoStore.setTotalCount(data.count)

            })

            .finally(() => setLoading(false))
    }, [autoStore.selectedMake, autoStore.selectedType, autoStore.page])

    if(loading){
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <MakeBar/>
                    <CarList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Carsharing;