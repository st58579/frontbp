import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../utils/routes";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {withCookies} from "react-cookie";

const ApplicationRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.isAuth && user.role === 'admin' && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {/*<Route path="*" element={<Auth />}/>*/}
        </Routes>
    );
});

export default ApplicationRouter;