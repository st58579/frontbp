import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {addUserDetails, updateUserDetails, uploadUserProfilePicture} from "../api/UserApi";

const AddUserDetails = observer(({show, onHide}) => {

    const {userStore} = useContext(Context)
    const [name, setName] = useState(userStore.details?.name)
    const [surname, setSurname] = useState(userStore.details?.surname)
    const [email, setEmail] = useState(userStore.details?.email)
    const [city, setCity] = useState(userStore.details?.city)
    const [phoneNumber, setPhoneNumber] = useState(userStore.details?.phoneNumber)
    const [documentNumber, setDocumentNumber] = useState(userStore.details?.documentNumber)
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const validate = () => {
        const errors = {}
        if (!name || name.trimStart() === '') {
            errors.name = 'Cannot be blank!'
        } else if (name.length > 50) {
            errors.name = 'Maximum name length is 50!'
        }
        if (!surname || surname.trimStart() === '') {
            errors.surname = 'Cannot be blank!'
        } else if (surname.length > 50) {
            errors.surname = 'Maximum surname length is 50!'
        }
        if (!email || email.trimStart() === '') {
            errors.email = 'Cannot be blank!'
        } else if (email.length > 30) {
            errors.email = 'Maximum email length is 30!'
        }
        if (!city || city.trimStart() === '') {
            errors.city = 'Cannot be blank!'
        } else if (city.length > 50) {
            errors.city = 'Maximum city length is 30!'
        }
        if (!phoneNumber || phoneNumber.trimStart() === '') {
            errors.phoneNumber = 'Cannot be blank!'
        } else if (phoneNumber.length > 50) {
            errors.phoneNumber = 'Maximum phone number length is 30!'
        }
        if (!documentNumber || documentNumber.trimStart() === '') {
            errors.documentNumber = 'Cannot be blank!'
        } else if (name.documentNumber > 50) {
            errors.documentNumber = 'Maximum document number length is 20!'
        }
        return errors
    }

    const selectImage = e => {
        setImage(e.target.files[0])
    }

    const onSubmit = e => {
        e.preventDefault()
        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            if (image === null) {
                const data = {
                    username: userStore.username,
                    role: userStore.role,
                    name,
                    surname,
                    email,
                    city,
                    phoneNumber,
                    documentNumber,
                }
                addUserDetails(userStore.id, data).then(onHide).catch(error => {
                    console.log('Error while adding user datails');
                });
            } else {
                const reader = new FileReader();
                reader.onload = () => {
                    const img = "data:image/jpeg;base64," + reader.result?.replace("data:", "")
                        .replace(/^.+,/, "");
                    const data = {
                        username: userStore.username,
                        role: userStore.role,
                        name,
                        surname,
                        email,
                        city,
                        phoneNumber,
                        documentNumber,
                        image: img
                    }
                    addUserDetails(userStore.id, data).then(onHide).catch(error => {
                        console.log('Error while adding user datails');
                    });
                };
                reader.readAsDataURL(image);
            }
        }
    }



    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add profile details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Form.Group controlId="userDetailsValidation">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue={userStore.details?.name}
                            onChange={e => {
                                setName(e.target.value)
                                if (!!errors['name']) setErrors({
                                    ...errors,
                                    ['name']: null
                                })
                            }}
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>

                        <Form.Label className={"mt-2"}>Surname</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Surname"
                            defaultValue={userStore.details?.surname}
                            onChange={e => {
                                setSurname(e.target.value)
                                if (!!errors['surname']) setErrors({
                                    ...errors,
                                    ['surname']: null
                                })
                            }}
                            isInvalid={!!errors.surname}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.surname}</Form.Control.Feedback>

                        <Form.Label className={"mt-2"}>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            defaultValue={userStore.details?.email}
                            onChange={e => {
                                setEmail(e.target.value)
                                if (!!errors['email']) setErrors({
                                    ...errors,
                                    ['email']: null
                                })
                            }}
                            isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>

                        <Form.Label className={"mt-2"}>Phone number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Phone number"
                            defaultValue={userStore.details?.phoneNumber}
                            onChange={e => {
                                setPhoneNumber(e.target.value)
                                if (!!errors['phoneNumber']) setErrors({
                                    ...errors,
                                    ['phoneNumber']: null
                                })
                            }}
                            isInvalid={!!errors.phoneNumber}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.phoneNumber}</Form.Control.Feedback>

                        <Form.Label className={"mt-2"}>City</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="City"
                            defaultValue={userStore.details?.city}
                            onChange={e => {
                                setCity(e.target.value)
                                if (!!errors['city']) setErrors({
                                    ...errors,
                                    ['city']: null
                                })
                            }}
                            isInvalid={!!errors.city}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.city}</Form.Control.Feedback>

                        <Form.Label className={"mt-2"}>Document number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Document number"
                            defaultValue={userStore.details?.documentNumber}
                            onChange={e => {
                                setDocumentNumber(e.target.value)
                                if (!!errors['documentNumber']) setErrors({
                                    ...errors,
                                    ['documentNumber']: null
                                })
                            }}
                            isInvalid={!!errors.documentNumber}
                        />
                        <Form.Control.Feedback type='invalid'>{errors.documentNumber}</Form.Control.Feedback>

                        <Form.Control onChange={selectImage}
                                      className="mt-3" type="file" placeholder="Image" accept="image/png, image/jpeg"/>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                        <Button variant={"outline-success"} type="submit">Update</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
});

export default AddUserDetails;