import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchRentedUserCars} from "../api/CarsharingApi";
import {Card, Container, Row, Spinner} from "react-bootstrap";
import UserRentedCarItem from "../components/UserRentedCarItem";

const UserRentedCarsPage = observer(() => {
    const {userStore} = useContext(Context)
    const [cars, setCars] = useState({})
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchRentedUserCars(userStore.id)
            .then(data => {
                setCount(data.count)
                setCars(data.cars)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    console.log(count)
    console.log(cars)

    return (
        <Container>
            <Row className="d-flex">
                {count > 0
                    ?
                    cars.map(car =><UserRentedCarItem key={car.idCar} car={car}/>)
                    :
                    <Card>
                        <h3>Nothing is rented!</h3>
                    </Card>
                }
            </Row>
        </Container>
    );
});

export default UserRentedCarsPage;