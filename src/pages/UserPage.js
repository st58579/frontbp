import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Button, Card, Col, Container, Image, ListGroup, Row, Spinner} from "react-bootstrap";
import defaultPlaceholder from "../400x300.png";
import {CARSHARING_ROUTE, USER_ROUTE} from "../utils/consts";
import {fetchUserDetails} from "../api/UserApi";
import {useNavigate} from "react-router-dom";
import UpdateUserDetails from "../modals/UpdateUserDetails";
import AddUserDatails from "../modals/AddUserDatails";
import UserTransactionsGrid from "../components/grids/UserTransactionsGrid";
import UserRentHistoryGrid from "../components/grids/UserRentHistoryGrid";

const UserPage = observer(() => {
    const [loading, setLoading] = useState(true)
    const [updateUserVisible, setUpdateUserVisible] = useState(false)
    const [addUserDetailsVisible, setAddUserDetailsVisible] = useState(false)
    const navigate = useNavigate()

    const {userStore} = useContext(Context)

    useEffect(() => {
        fetchUserDetails(userStore.username).then((data) => {
            if (!data.username) {
                userStore.setDetails(null)
            } else {
                userStore.setDetails(data)
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container>
            <Card className="m-5" style={{borderRadius: 10}}>
                <Row className="m-3">
                    <Row style={{fontSize: 26}}><b>Username: {userStore?.username}</b></Row>
                    <Row style={{fontSize: 26}}><b>Role: {userStore.details?.role}</b></Row>
                    <Col md={4}>

                        <Image fluid width={"400rem"} height={""}
                               src={userStore.details?.image ? userStore.details.image : defaultPlaceholder}/>
                    </Col>

                    <Col md={6}>
                        <Card
                            className="d-flex flex-column"
                            style={{fontSize: 22}}
                        >
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={5}>
                                            Name:
                                        </Col>
                                        <Col md={7}>{userStore.details?.name} {userStore.details?.surname}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col md={5}>
                                            Email:
                                        </Col>
                                        <Col md={7}>{userStore.details?.email}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={5}>
                                            Address:
                                        </Col>
                                        <Col md={7}>{userStore.details?.city}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={5}>
                                            Phone:
                                        </Col>
                                        <Col md={7}>{userStore.details?.phoneNumber}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={5}>
                                            Document number :
                                        </Col>
                                        <Col md={7}>{userStore.details?.documentNumber}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col md={2}>
                        <Row>
                            {userStore.details
                                ?
                                <Button variant={"outline-dark"} size={"lg"}
                                        onClick={() => setUpdateUserVisible(true)}>Update contact details</Button>
                                :
                                <Button variant={"outline-dark"} size={"lg"}
                                        onClick={() => setAddUserDetailsVisible(true)}>Add contact details</Button>
                            }
                            <Button className={"mt-3"} variant={"outline-dark"} size={"lg"}
                                    onClick={() => navigate(CARSHARING_ROUTE)}>Back to catalog</Button>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <UserRentHistoryGrid />

            <UpdateUserDetails show={updateUserVisible} onHide={() => setUpdateUserVisible(false)}/>
            <AddUserDatails show={addUserDetailsVisible} onHide={() => {
                setAddUserDetailsVisible(false)
                navigate(USER_ROUTE + "/" + userStore.username)
            }}/>
        </Container>
    );
});

export default UserPage;