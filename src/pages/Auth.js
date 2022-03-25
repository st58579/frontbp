import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CARSHARING_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../api/UserApi";
import {observer} from "mobx-react-lite";

const Auth = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()

    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const authenticate = async () =>{
        try {
            let userDto;
            if (isLogin) {
                userDto = await login(username, password)
            } else {
                userDto = await registration(username, password)
            }
            userStore.setId(userDto.id)
            userStore.setUsername(userDto.username)
            userStore.setIsAuth(true)
            userStore.setRole(userDto.role)
            navigate(CARSHARING_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }
    }

    if(userStore.isAuth){
        navigate(CARSHARING_ROUTE)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={"p-5"}>
                <h2 className="m-auto">{isLogin ? 'Login' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input your username..."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Input your password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <div className="d-flex justify-content-between mt-3">
                        {isLogin ?
                            <div className="mb-3">
                                Dont have an account? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
                            </div>
                            :
                            <div>
                                Already have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }
                        <Button variant={"outline-success"} onClick={authenticate}>
                            {isLogin ? 'Login' : 'Sign up'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;