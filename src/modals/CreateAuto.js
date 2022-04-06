import React, {createRef, useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {addCar, fetchAllCarsPaginated, fetchMakes, fetchTypes} from "../api/CarsharingApi";

const CreateAuto = observer(({show, onHide}) => {
    const {autoStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const [model, setModel] = useState('')
    const [year, setYear] = useState()
    const [seatsNumber, setSeatsNumber] = useState()
    const [pricePerDay, setPricePerDay] = useState()
    const [selectedType, setSelectedType] = useState(null)
    const [selectedMake, setSelectedMake] = useState(null)
    const [transmission, setTransmission] = useState()
    const [engine, setEngine] = useState()
    const [image, setImage] = useState()

    const selectFile = e => {
        setImage(e.target.files[0])
    }

    const addAuto = () => {
        const idType = selectedType.idType
        const idMake = selectedMake.idMake
        const idUser = userStore.id
        const reader = new FileReader();
        reader.onload = () => {
            const img = "data:image/jpeg;base64," + reader.result?.replace("data:", "")
                .replace(/^.+,/, "");
            const data = {model, year, seatsNumber, pricePerDay, transmission, engine, idType, idMake, img, idUser}
            addCar(data).then(onHide).catch(error => {
                console.log(error.message());
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
                    Specify your auto characteristics
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className={"text-center"}>
                        <Col>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectedType ? selectedType.type : 'Select type'}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {autoStore.types.map(type =>
                                        <Dropdown.Item
                                            onClick={() => setSelectedType(type)}
                                            key={type.idType}
                                        >
                                            {type.type}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectedMake ? selectedMake.make : 'Select make'}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {autoStore.makes.map(make =>
                                        <Dropdown.Item
                                            onClick={() => setSelectedMake(make)}
                                            key={make.idMake}
                                        >
                                            {make.make}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Form.Control value={model} onChange={e => setModel(e.target.value)} className="mt-3"
                                  placeholder="Model"/>
                    <Form.Control value={transmission} onChange={e => setTransmission(e.target.value)} className="mt-3"
                                  placeholder="Transmission"/>
                    <Form.Control value={engine} onChange={e => setEngine(e.target.value)} className="mt-3"
                                  placeholder="Engine"/>
                    <Form.Control value={year} onChange={e => setYear(Number(e.target.value))} className="mt-3"
                                  type="number" placeholder="Year"/>
                    <Form.Control value={seatsNumber} onChange={e => setSeatsNumber(Number(e.target.value))}
                                  className="mt-3" type="number" placeholder="Seats number"/>
                    <Form.Control value={pricePerDay} onChange={e => setPricePerDay(Number(e.target.value))}
                                  className="mt-3" type="number" placeholder="Price per day"/>
                    <Form.Control onChange={selectFile}
                                  className="mt-3" type="file" placeholder="Image" accept="image/png, image/jpeg"/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addAuto}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateAuto;