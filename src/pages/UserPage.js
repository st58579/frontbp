import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const UserPage = observer(() => {
    const {userStore} = useContext(Context)
    const [loading, setLoading] = useState(true)

    return (
        <h3>
            {userStore.username}
        </h3>
    );
});

export default UserPage;