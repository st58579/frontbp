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
    const [image, setImage] = useState()
    const fileInputRef = createRef()


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
            // console.log(base64String)

            const data = {model, year, seatsNumber, pricePerDay, idType, idMake, img, idUser}
            console.log(data)
            addCar(data).then(onHide).catch(error => {
                console.log('Došlo k chybě při změně obrázku');
            });
        };
        reader.readAsDataURL(image);


        // reader.onload = () => {
        //     const img = "data:image/jpeg;base64," + reader.result?.replace("data:", "")
        //         .replace(/^.+,/, "");
        //     const data = {model, year, seatsNumber, pricePerDay, idType, idMake, img, idUser}
        //     addCar(data).then(data => onHide)
        // }
        // reader.readAsDataURL(fileInputRef.current.files[0]);
        // const formData = new FormData()
        // formData.append('model', model)
        // formData.append('year', year)
        // formData.append('seatsNumber', seatsNumber)
        // formData.append('pricePerDay', pricePerDay)
        // formData.append('idType', idType)
        // formData.append('idMake', idMake)
        // formData.append('img', img)
        // formData.append('idUser', idUser)
        // addCar(formData).then(data => onHide)
        // const reader = new FileReader()
        // reader.onload = () => {
        //     const base64String = "data:image/jpeg;base64," + reader.result?.replace("data:", "")
        //         .replace(/^.+,/, "");
        //     console.log(data)
        //     console.log(img)
        // }
        // reader.readAsDataURL(img);

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
                    <Form.Control value={year} onChange={e => setYear(Number(e.target.value))} className="mt-3"
                                  type="number" placeholder="Year"/>
                    <Form.Control value={seatsNumber} onChange={e => setSeatsNumber(Number(e.target.value))}
                                  className="mt-3" type="number" placeholder="Seats number"/>
                    <Form.Control value={pricePerDay} onChange={e => setPricePerDay(Number(e.target.value))}
                                  className="mt-3" type="number" placeholder="Price per day"/>
                    <Form.Control onChange={selectFile}
                                  className="mt-3" type="file" placeholder="Image"/>
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