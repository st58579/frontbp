import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateAuto from "../modals/CreateAuto";
import CreateType from "../modals/CreateType";
import CreateMake from "../modals/CreateMake";
import UserGrid from "../components/grids/UserGrid";
import UserTransactionsGrid from "../components/grids/UserTransactionsGrid";

const AdminPage = () => {
    const [typeVisible, setTypeVisible] = useState(false)
    const [makeVisible, setMakeVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button variant={"outline-success"} className="mt-3" onClick={() => setTypeVisible(true)} >Add type</Button>
            <Button variant={"outline-success"} className="mt-3" onClick={() => setMakeVisible(true)}>Add make</Button>
            <UserGrid />
            <UserTransactionsGrid />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateMake show={makeVisible} onHide={() => setMakeVisible(false)}/>
        </Container>
    );
};

export default AdminPage;