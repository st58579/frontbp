import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import UserStore from "./store/UserStore";
import AutoStore from "./store/AutoStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        cars: new AutoStore()
    }}>
        <App/>
    </Context.Provider>,
    document.getElementById('root')
)
;
