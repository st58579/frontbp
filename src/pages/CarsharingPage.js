import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TypeBar from "../components/bars/TypeBar";
import MakeBar from "../components/bars/MakeBar";
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

const CarsharingPage = observer(() => {
    const {autoStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMakes().then(data => autoStore.setMakes(data))
        fetchTypes().then(data => autoStore.setTypes(data))
        fetchAllCarsPaginated(userStore.id).then(data => {
            autoStore.setCars(data.cars)
            autoStore.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        fetchAllCarsPaginatedAndFiltered(autoStore.selectedMake.idMake, autoStore.selectedType.idType, autoStore.page, autoStore.limit, userStore.id)
            .then(data => {
                autoStore.setCars(data.cars)
                if(autoStore.selectedType.idType > 0 || autoStore.selectedMake.idMake > 0) autoStore.setTotalCount(data.count)
            })
            .finally(() => setLoading(false))
    }, [autoStore.selectedMake, autoStore.selectedType, autoStore.page])

    if (loading) {
        return (<Spinner animation={"grow"}/>)
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

export default CarsharingPage;