import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, CARSHARING_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setUsername({})
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{color: 'white'}} to={CARSHARING_ROUTE}>Carsharing</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <h3 >User: {user.username}</h3>
                        {user.user.roles === 'admin' ?
                        <Button variant={"outline-light"} className="ms-3" onClick={() => navigate(ADMIN_ROUTE)}>Admin</Button>
                        : null}
                        <Button variant={"primary"}  className="ms-2"  onClick={logOut}>Sign out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <h3 >Guest</h3>
                        <Button variant={"primary"} className="ms-3" onClick={() => navigate(LOGIN_ROUTE)}>Login</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;