import React from 'react';
import api from '../api'
import ClassList from '../components/ClassList'
import {Container} from 'react-bootstrap'
export default class Dashboardpage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
    }

    render() {
        return (
            <Container >
                <h4>{"Welcome to Engage, " + this.props.user.name}</h4>
                <ClassList user={this.props.user}/>
            </Container>
            
        );
    }
}