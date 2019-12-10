import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import config from './config'
import {Container} from 'react-bootstrap'
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

(async () => {
    let response = await axios.get(config.backendUrl + "/me");
    if (response.status === 401) {
        ReactDOM.render(() => {
            return (
                <Container>
                    <h4 className="text-center">You are not logged in. <a href="/login">Login.</a></h4>
                </Container>
            )
        }, document.getElementById('root'));
    } else if (response.status === 404) {
        ReactDOM.render(() => {return (<p>404 User Not Found</p>)}, document.getElementById('root'));
    } else {
        // ReactDOM.render(<App user={response.data}/>, document.getElementById('root'));
        ReactDOM.render(<App user={response.data}/>, document.getElementById('root'));
    }
})()



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
