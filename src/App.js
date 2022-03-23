import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./components/ApplicationRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./api/UserApi";
import {Spinner} from "react-bootstrap";
import {CookiesProvider} from "react-cookie";

const App = observer(() => {


    // useEffect(() => {
    //     check().then(data => {
    //         user.setUser(user.username)
    //         user.setIsAuth(true)
    //     }).finally(() => setLoading(false))
    // }, [])
    //
    // if(loading){
    //     return <Spinner animation={"grow"}/>
    // }

    return (
        <BrowserRouter>
            <CookiesProvider>
                <NavBar/>
                <ApplicationRouter/>
            </CookiesProvider>
        </BrowserRouter>
    );
});

export default App;
