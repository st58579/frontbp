import React, {useContext, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {CARSHARING_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {getWallet, login, registration} from "../api/UserApi";
import {observer} from "mobx-react-lite";

const AuthPage = observer(() => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()

    const isLogin = location.pathname === LOGIN_ROUTE
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validated, setValidated] = useState(false)
    const [errors, setErrors] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')


    const validate = () => {
        const errors = {}

        if (!username || username.trimStart() === '') {
            errors.username = 'Cannot be blank!'
        } else if (username.length > 30) {
            errors.username = 'Maximum username length is 30!'
        } else if (username.length < 4) {
            errors.username = 'Minimum username length is 4!'
        }

        if (!password || password.trimStart() === '') {
            errors.password = 'Cannot be blank!'
        } else if (password.length < 4) {
            errors.password = 'Minimum password length is 4!'
        } else if (password.length > 255) {
            errors.password = 'Maximum password length is 255!'
        }
        return errors
    }

    const authenticate = async () => {
        try {
            let userDto;
            if (isLogin) {
                userDto = await login(username, password)
            } else {
                userDto = await registration(username, password)
            }
            let userWallet = await getWallet(userDto.id)
            userStore.setWallet(userWallet)
            userStore.setId(userDto.id)
            userStore.setUsername(userDto.username)
            userStore.setIsAuth(true)
            userStore.setRole(userDto.role)
            if (isLogin) {
                navigate(CARSHARING_ROUTE)
            } else {
                alert('Registered successfully!')
            }
        } catch (e) {
            setError(e.response.data.message)
            setShowError(true)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            authenticate()
        }
    }

    if (userStore.isAuth) {
        navigate(CARSHARING_ROUTE)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={"p-5"}>
                <h2 className="m-auto">{isLogin ? 'Login' : 'Registration'}</h2>
                <Form className="d-flex flex-column" noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control
                            required
                            className="mt-3"
                            placeholder="Input your username..."
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value)
                                if (!!errors['username']) setErrors({
                                    ...errors,
                                    ['username']: null
                                })
                            }}
                            isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>

                        <Form.Control
                            required
                            className="mt-3"
                            placeholder="Input your password..."
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                if (!!errors['password']) setErrors({
                                    ...errors,
                                    ['password']: null
                                })
                            }}
                            type="password"
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>

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
                            <Button variant={"outline-success"} type="submit">
                                {isLogin ? 'Login' : 'Sign up'}
                            </Button>
                        </div>
                    </Form.Group>
                </Form>
                <Alert show={showSuccess} variant="success" className="mt-2">
                    <Row>
                        <Col md={8} ><h5>Registered successfully!</h5></Col>
                        <Col md={4}><Button onClick={() => setShowSuccess(false)} variant="outline-success">
                            Gotcha!
                        </Button>
                        </Col>
                    </Row>
                </Alert>
                <Alert show={showError} onClose={() => setShowError(false)} variant="danger" className="mt-2" dismissible>
                    <Row>
                        <h5>{error}</h5>
                    </Row>
                </Alert>
            </Card>
        </Container>
    );
});

export default AuthPage;