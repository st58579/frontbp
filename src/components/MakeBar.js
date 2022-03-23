import React, {useContext} from 'react';
import {Card, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const MakeBar = observer(() => {
    const {autoStore} = useContext(Context)

    return (
        <ListGroup horizontal={"lg"}>
            <ListGroup.Item
                key={"all-makes"}
                className="p-3"
                onClick={() => autoStore.setSelectedMake({idMake: 0, make: "All makes"})}
                active={0 === autoStore.selectedMake.idMake}
                style={{cursor: "pointer"}}
            >
                All makes
            </ListGroup.Item>
            {autoStore.makes.map(make =>
                <ListGroup.Item
                    key={make.idMake}
                    className="p-3"
                    onClick={() => autoStore.setSelectedMake(make)}
                    active={make.idMake === autoStore.selectedMake.idMake}
                    style={{cursor: "pointer"}}
                >
                    {make.make}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default MakeBar;