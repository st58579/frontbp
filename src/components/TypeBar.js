import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../index";


const TypeBar = observer(() => {
    const {cars} = useContext(Context)

    return (
        <ListGroup>
            {cars.types.map(type =>
                <ListGroup.Item
                    key={type.idType}
                    active={type.idType === cars.selectedType.idType}
                    onClick={() => cars.setSelectedType(type)}
                    style={{cursor: "pointer"}}
                >
                    {type.type}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;