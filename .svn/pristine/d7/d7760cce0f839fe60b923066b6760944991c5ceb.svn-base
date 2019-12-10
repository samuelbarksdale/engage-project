import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CoursePage from './views/CoursePage';
import HomePage from './views/HomePage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Button, Nav} from 'react-bootstrap';
import {Spinner} from "react-bootstrap";

import {createStore, EStoreState} from "./store/createStore";
import {observer} from "mobx-react-lite";

export const storesContext = React.createContext({
    store: new createStore(),
});
export const useStore: () => createStore = () => React.useContext(storesContext).store;


export default observer(function App() {
    const {storeState, errorMessage} = useStore();
    if (storeState == EStoreState.init) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div>
            {storeState == EStoreState.loading && <Spinner animation={"grow"}/>}
            {storeState}
            {storeState == EStoreState.error && <div>{errorMessage}</div>}
            <Router>
                <Switch>
                    <Route path='/' component={HomePage} />
                    <Route path='/:classId' component={CoursePage}/>
                </Switch>
            </Router>
        </div>
    );
});

