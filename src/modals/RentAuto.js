import React, {useContext, useState} from 'react';
import {Alert, Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import DateAdapter from '@mui/lab/AdapterDateFns';
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import {TextField} from "@mui/material";
import {rentCar} from "../api/CarsharingApi";


const RentAuto = observer(({show, onHide}) => {
    const {autoStore} = useContext(Context)
    const {userStore} = useContext(Context)
    const selectedAuto = autoStore.selectedAuto
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const rentAuto = () => {
        rentCar(userStore.id, selectedAuto.idCar, startDate, endDate)
            .then((data) => {
                onHide()
            })
            .catch(e => {
                setError(e.message)
                setShowError(true)
            })
    }

    return (
        <Modal
            centered
            show={show}
            onHide={onHide}
        >
            <LocalizationProvider dateAdapter={DateAdapter}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Rent {selectedAuto.makeName} {selectedAuto.model}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={"align-text-center"}>
                    <h4>Price per rent day for this auto: {selectedAuto.pricePerDay}$</h4>
                    <DesktopDatePicker
                        label="Reservation start day"
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        renderInput={(params) => <TextField className="mt-3" {...params} />}
                    />
                    <DesktopDatePicker
                        label="Reservation end day"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        renderInput={(params) => <TextField className="mt-3" {...params} />}
                    />

                    <Alert className={"mt-3"} variant="danger" show={showError} onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading>Rent error!</Alert.Heading>
                        <p>{error}</p>
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-danger"} onClick={onHide}>Back</Button>
                    <Button variant={"outline-success"} onClick={rentAuto}>Confirm</Button>
                </Modal.Footer>
            </LocalizationProvider>
        </Modal>
    );
});

export default RentAuto;