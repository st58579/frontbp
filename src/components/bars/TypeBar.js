import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {ListGroup} from "react-bootstrap";
import {Context} from "../../index";


const TypeBar = observer(() => {
    const {autoStore} = useContext(Context)

    return (
        <ListGroup>
            <ListGroup.Item
                key={"all-types"}
                className="p-3"
                onClick={() => autoStore.setSelectedType({idType: 0, type: "All types"})}
                active={0 === autoStore.selectedType.idType}
                style={{cursor: "pointer"}}
            >
                All types
            </ListGroup.Item>
            {autoStore.types.map(type =>
                <ListGroup.Item
                    key={type.idType}
                    active={type.idType === autoStore.selectedType.idType}
                    onClick={() => {
                        autoStore.setPage(1)
                        autoStore.setSelectedType(type)
                    }}
                    style={{cursor: "pointer"}}
                >
                    {type.type}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;