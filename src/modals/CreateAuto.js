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
    const [transmission, setTransmission] = useState('')
    const [engine, setEngine] = useState('')
    const [image, setImage] = useState()
    const [errors, setErrors] = useState({})
    const [validated, setValidated] = useState(false)

    const selectFile = e => {
        setImage(e.target.files[0])
    }

    const validate = () => {
        const errors = {}
        if (!model || model.trimStart() === '') {
            errors.model = 'Cannot be blank!'
        } else if (model.length > 50) {
            errors.model = 'Maximum model length is 50!'
        }
        if (!year || year == 0) {
            errors.year = 'Cannot be blank!'
        } else if (year < 1900 || year > new Date().getFullYear()) {
            errors.year = 'Please specify correct manufacturing year!'
        }
        if (!seatsNumber || seatsNumber == 0) {
            errors.seatsNumber = 'Cannot be blank!'
        } else if (seatsNumber < 1 || seatsNumber > 10) {
            errors.seatsNumber = 'How is this ever possible?'
        }
        if (!pricePerDay || pricePerDay <= 0) {
            errors.pricePerDay = 'Cannot be blank!'
        }
        if (!transmission || transmission.trimStart() === '') {
            errors.transmission = 'Cannot be blank!'
        } else if (transmission.length > 20) {
            errors.transmission = 'Maximum transmission length is 20!'
        }
        if (!engine || engine.trimStart() === '') {
            errors.engine = 'Cannot be blank!'
        } else if (engine.length > 20) {
            errors.engine = 'Maximum engine length is 20!'
        }
        return errors
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

    const onSubmit = e => {
        e.preventDefault()
        const errors = validate()
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
        } else {
            addAuto()
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
                    Specify your auto characteristics
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Form.Group controlId="createAutoValidation">
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
                        <Form.Control required
                                      type="text"
                                      value={model}
                                      className="mt-3"
                                      onChange={e => {
                                          setModel(e.target.value)
                                          if (!!errors['model']) setErrors({
                                              ...errors,
                                              ['model']: null
                                          })
                                      }}
                                      isInvalid={!!errors.model}
                                      placeholder="Model"/>
                        <Form.Control.Feedback type='invalid'>{errors.model}</Form.Control.Feedback>

                        <Form.Control required
                                      type="text"
                                      value={transmission}
                                      className="mt-3"
                                      onChange={e => {
                                          setTransmission(e.target.value)
                                          if (!!errors['transmission']) setErrors({
                                              ...errors,
                                              ['transmission']: null
                                          })
                                      }}
                                      isInvalid={!!errors.transmission}
                                      placeholder="Transmission"/>
                        <Form.Control.Feedback type='invalid'>{errors.transmission}</Form.Control.Feedback>

                        <Form.Control required
                                      type="text"
                                      value={engine}
                                      className="mt-3"
                                      onChange={e => {
                                          setEngine(e.target.value)
                                          if (!!errors['engine']) setErrors({
                                              ...errors,
                                              ['engine']: null
                                          })
                                      }}
                                      isInvalid={!!errors.engine}
                                      placeholder="Engine"/>
                        <Form.Control.Feedback type='invalid'>{errors.engine}</Form.Control.Feedback>

                        <Form.Control required
                                      type="number"
                                      value={year}
                                      className="mt-3"
                                      onChange={e => {
                                          setYear(e.target.value)
                                          if (!!errors['year']) setErrors({
                                              ...errors,
                                              ['year']: null
                                          })
                                      }}
                                      isInvalid={!!errors.year}
                                      placeholder="Manufacture year"/>
                        <Form.Control.Feedback type='invalid'>{errors.year}</Form.Control.Feedback>

                        <Form.Control required
                                      type="number"
                                      value={seatsNumber}
                                      className="mt-3"
                                      onChange={e => {
                                          setSeatsNumber(e.target.value)
                                          if (!!errors['seatsNumber']) setErrors({
                                              ...errors,
                                              ['seatsNumber']: null
                                          })
                                      }}
                                      isInvalid={!!errors.seatsNumber}
                                      placeholder="Seats count"/>
                        <Form.Control.Feedback type='invalid'>{errors.seatsNumber}</Form.Control.Feedback>

                        <Form.Control required
                                      type="number"
                                      value={pricePerDay}
                                      className="mt-3"
                                      onChange={e => {
                                          setPricePerDay(e.target.value)
                                          if (!!errors['pricePerDay']) setErrors({
                                              ...errors,
                                              ['pricePerDay']: null
                                          })
                                      }}
                                      isInvalid={!!errors.pricePerDay}
                                      placeholder="Rent price per day"/>
                        <Form.Control.Feedback type='invalid'>{errors.pricePerDay}</Form.Control.Feedback>

                        <Form.Control onChange={selectFile}
                                      className="mt-3" type="file" placeholder="Image" accept="image/png, image/jpeg"/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                        <Button variant={"outline-success"} type="submit">Add</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </Modal>
    );
});

export default CreateAuto;