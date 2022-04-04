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
    const [image, setImage] = useState()
    const [error, setError] = useState('')

    const validate = () => {
        if (name === '') {
            setName(userStore.details?.name)
        }
        if (surname === '') {
            setSurname(userStore.details.surname)
        }
        if (email === '') {
            setEmail(userStore.details.email)
        }
        if (city === '') {
            setCity(userStore.details.city)
        }
        if (phoneNumber === '') {
            setPhoneNumber(userStore.details.phoneNumber)
        }
        if (documentNumber === '') {
            setDocumentNumber(userStore.details.documentNumber)
        }
    }

    const selectImage = e => {
        setImage(e.target.files[0])
    }

    const onSubmit = () => {
        validate()

        const reader = new FileReader();
        reader.onload = () => {
            const img = "data:image/jpeg;base64," + reader.result?.replace("data:", "")
                .replace(/^.+,/, "");
            const data = {username: userStore.username, role: userStore.role, name, surname, email, city, phoneNumber, documentNumber, image: img}
            addUserDetails(userStore.id, data).then(onHide).catch(error => {
                console.log('Error while adding user details');
            });
        };
        reader.readAsDataURL(image);
    }


    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update profile details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className={"text-center"}>

                    </Row>
                    <Form.Control defaultValue={userStore.details?.name} onChange={e => setName(e.target.value)}
                                  className="mt-3" placeholder="Name"/>
                    <Form.Control defaultValue={userStore.details?.surname} onChange={e => setSurname(e.target.value)}
                                  className="mt-3" placeholder="Surname"/>
                    <Form.Control defaultValue={userStore.details?.email} onChange={e => setEmail(e.target.value)}
                                  className="mt-3" placeholder="Email"/>
                    <Form.Control defaultValue={userStore.details?.city} onChange={e => setCity(e.target.value)}
                                  className="mt-3" placeholder="City"/>
                    <Form.Control defaultValue={userStore.details?.phoneNumber}
                                  onChange={e => setPhoneNumber(e.target.value)}
                                  className="mt-3" placeholder="Phone number"/>
                    <Form.Control defaultValue={userStore.details?.documentNumber}
                                  onChange={e => setDocumentNumber(e.target.value)}
                                  className="mt-3" placeholder="Document number"/>
                    <Form.Control onChange={selectImage}
                                  className="mt-3" type="file" placeholder="Image" accept="image/png, image/jpeg"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={onSubmit}>Update</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default AddUserDetails;