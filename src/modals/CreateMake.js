import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

const CreateMake = ({show, onHide}) => {
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
                    <Form.Control placeholder={"Add make name"}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={onHide}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMake;