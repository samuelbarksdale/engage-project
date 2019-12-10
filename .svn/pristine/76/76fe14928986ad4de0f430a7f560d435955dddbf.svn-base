import React from 'react';
import api from '../api'
import {Container} from 'react-bootstrap'
export default class Dashboardpage extends React.Component {

    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }

    render() {
        if (this.props.user) {
            return (
                <Container >
                    <h4>{"Welcome to Engage, " + this.props.user.name}</h4>
                </Container>
                
            );
        } else {
            return (<p>Loading...</p>)
        }

    }
}