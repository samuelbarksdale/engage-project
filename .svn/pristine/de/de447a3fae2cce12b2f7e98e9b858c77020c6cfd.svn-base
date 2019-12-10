import React from 'react';
import config from "../config";
import CourseCard from "../components/CourseCard";
import axios from "axios";

export default class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: []}
    }

    async componentDidMount() {
        
        try{
            let result = await axios.get(config.courseURL+`/classes?uid=${this.props.user.uid}`);
            this.setState({courses: result.data});
        } catch (e) {
            console.error(e)
        }
    }


    render() {
        return (
            <div>
                {
                   ( this.state.courses.length === 0)
                    ? <p>Loading...</p>
                    : this.state.courses.map((data) => {
                        return <CourseCard {...data}/>
                    })
                }
            </div>
        ) 
    }
}
    