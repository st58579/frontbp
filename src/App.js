import {BrowserRouter} from "react-router-dom";
import ApplicationRouter from "./components/ApplicationRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {CookiesProvider} from "react-cookie";

const App = observer(() => {
    const {userStore} = useContext(Context)

    useEffect(() => {
        userStore.setIsAuth(localStorage.getItem('isAuth') === 'true')
        userStore.setUsername(localStorage.getItem('username'))
        userStore.setRole(localStorage.getItem('role'))
        userStore.setId(localStorage.getItem('id'))
    }, [])


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
