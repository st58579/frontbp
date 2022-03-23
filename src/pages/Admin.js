import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateAuto from "../modals/CreateAuto";
import CreateType from "../modals/CreateType";
import CreateMake from "../modals/CreateMake";

const Admin = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [makeVisible, setMakeVisible] = useState(false)
    const [autoVisible, setAutoVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-success"} className="mt-3" onClick={() => setTypeVisible(true)} >Add type</Button>
            <Button variant={"outline-success"} className="mt-3" onClick={() => setMakeVisible(true)}>Add make</Button>
            <Button variant={"outline-success"} className="mt-3" onClick={() => setAutoVisible(true)}>Add car</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateMake show={makeVisible} onHide={() => setMakeVisible(false)}/>
            <CreateAuto show={autoVisible} onHide={() => setAutoVisible(false)}/>
        </Container>
    );
};

export default Admin;