import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../utils/routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Auth from "../pages/Auth";

const ApplicationRouter = observer(() => {
    const {user} = useContext(Context);

    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.isAuth && user.user.roles === 'admin' && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Auth key="login-key"/>} />
        </Routes>
    );
});

export default ApplicationRouter;