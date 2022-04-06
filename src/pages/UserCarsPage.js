import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchUserCars} from "../api/CarsharingApi";
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import UserCarItem from "../components/UserCarItem";
import CreateAuto from "../modals/CreateAuto";

const UserCarsPage = observer(() => {
    const {userStore} = useContext(Context)
    const {autoStore} = useContext(Context)
    const [cars, setCars] = useState({})
    const [count, setCount] = useState(0)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUserCars(userStore.id)
            .then(data => {
                setCount(data.count)
                setCars(data.cars)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>

            <Row className="d-flex">
                <Row className="ms-lg-5">
                    <Card className="mt-3" style={{borderRadius: 10}}>
                     <Row>
                        <Col md={8}>
                            <h3>Total cars count: {count}</h3></Col>
                        <Col md={4}>
                        </Col>
                     </Row>
                    </Card>
                </Row>
                {cars.map(car =>
                    <UserCarItem key={car.idCar} car={car}/>
                )}
            </Row>
        </Container>
    );
});

export default UserCarsPage;