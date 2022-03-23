import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import UserStore from "./store/UserStore";
import AutoStore from "./store/AutoStore";

export const Context = createContext(null)
const user = new UserStore()
const autoStore = new AutoStore()

ReactDOM.render(
    <Context.Provider value={{user, autoStore}}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
)
;
