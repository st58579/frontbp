import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {addMake} from "../api/CarsharingApi";

const CreateMake = ({show, onHide}) => {
    const [make, setMake] = useState('')

    const onSubmit = () => {
        addMake(make).then(onHide)
    }

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add make
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={make} onChange={e => setMake(e.target.value)} placeholder={"Add make name"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={onSubmit}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMake;