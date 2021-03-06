import React, {useContext, useState} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {
    ADMIN_ROUTE,
    CARSHARING_ROUTE,
    LOGIN_ROUTE,
    USER_CARS_ROUTE,
    USER_RENTED_CARS_ROUTE,
    USER_ROUTE
} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import CreateAuto from "../../modals/CreateAuto";

const NavBar = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()
    const [autoVisible, setAutoVisible] = useState(false)

    const logOut = () => {
        userStore.setIsAuth(false)
        userStore.setUsername({})
        userStore.setRole({})
        userStore.setId({})
        userStore.setWallet({})
        userStore.setDetails(null)
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('username')
        localStorage.removeItem('role')
        localStorage.removeItem('id')
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Button variant={"dark"} className="ms-2" onClick={() => navigate(CARSHARING_ROUTE)}>Carsharing</Button>
                {userStore.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"dark"} className="ms-2">Balance: {userStore.wallet.balance}</Button>
                        <Button variant={"dark"} className="ms-2" onClick={() => navigate(USER_ROUTE + "/" + userStore.username)}>username: {userStore.username}</Button>
                        <Button variant={"outline-success"} className="ms-2" onClick={() => setAutoVisible(true)}>Add car</Button>
                        <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(USER_CARS_ROUTE)}>My cars</Button>
                        <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(USER_RENTED_CARS_ROUTE)}>My rented cars</Button>

                        {userStore.role === 'admin' ?
                        <Button variant={"outline-light"} className="ms-2" onClick={() => navigate(ADMIN_ROUTE)}>Admin</Button>
                        : null}
                        <Button variant={"outline-danger"}  className="ms-2"  onClick={logOut}>Sign out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"primary"} className="ms-3" onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                    </Nav>
                }
            </Container>
            <CreateAuto show={autoVisible} onHide={() => setAutoVisible(false)}/>
        </Navbar>
    );
});

export default NavBar;