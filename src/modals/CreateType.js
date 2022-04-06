import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {addType} from "../api/CarsharingApi";

const CreateType = ({show, onHide}) => {
    const [type, setType] = useState('')

    const onSubmit = () => {
        addType(type).then(onHide)
    }

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={type} onChange={(e) => setType(e.target.value)} placeholder={"Add type name"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={onSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;