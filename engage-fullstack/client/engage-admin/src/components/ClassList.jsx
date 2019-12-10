import React from 'react';
import ClassCard from "./ClassCard";
import axios from "axios";
import api from '../api';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
  
export default class ClassList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {classes: []}
    }

    async componentDidMount() {
        try{
            let {data} = await api.getMyClasses();
            this.setState({classes: data});
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div></div>
            // <div>
            //     {
            //        ( this.state.classes.length === 0)
            //         ? <p>You don't have any courses</p>
            //         : this.state.courses.map((info) => {
            //             return <ClassCard {...info} user={this.props.user}/>
            //         })
            //     }
            // </div>
        ) 
    }
}
    