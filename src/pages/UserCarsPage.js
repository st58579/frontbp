import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchUserCars} from "../api/CarsharingApi";
import {Container, Row, Spinner} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import UserCarItem from "../components/UserCarItem";

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
    console.log(cars)

    return (
        <Container>
            <Row className="d-flex">
                {cars.map(car =>
                    <UserCarItem key={car.idCar} car={car}/>
                )}
            </Row>
        </Container>
    );
});

export default UserCarsPage;