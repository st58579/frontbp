import React, {useContext} from 'react';
import {Card, ListGroup, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const MakeBar = observer(() => {
    const {cars} = useContext(Context)

    return (
        <ListGroup horizontal={"lg"}>
            {cars.makes.map(make =>
                <ListGroup.Item
                    key={make.idMake}
                    className="p-3"
                    onClick={() => cars.setSelectedMake(make)}
                    active={make.idMake === cars.selectedMake.idMake}
                    style={{cursor: "pointer"}}
                >
                    {make.make}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default MakeBar;