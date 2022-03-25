import React, {createContext, useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import UserStore from "./store/UserStore";
import AutoStore from "./store/AutoStore";

export const Context = createContext(null)
const userStore = new UserStore()
const autoStore = new AutoStore()

ReactDOM.render(
    <Context.Provider value={{userStore: userStore, autoStore}}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
)
;
