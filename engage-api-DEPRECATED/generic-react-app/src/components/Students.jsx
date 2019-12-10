import React from 'react'
import axios from 'axios'
import config from '.././config'

export default class Students extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            students: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let response = await axios.get(`${config.courseURL}/courses/${this.props.courseId}/students`);
        this.setState({students: response.data})
        // this.setState({students: response})
    }

    async handleSubmit() {

        let student = {
            uid: this.refs.uid.value,
            name: this.refs.name.value,
            sectionId: this.refs.sectionId.value
        }
        let response = await axios.post(`${config.courseURL}/courses/${this.props.courseId}/students`, student);
        console.log(response.data)
        let students = this.state.students;
        students.push(response.data);
        this.setState({students: students});
    }

    render() {
        return (
            <div>
                <h2>Students</h2>
                <div>
                    <label> Name: <input ref="name" type="text"></input></label>
                    <label>UID: <input ref="uid" type="text"></input></label>
                    <label>Section ID:<input ref="sectionId" type="text"></input></label>
                    <button onClick={this.handleSubmit}>Add</button>
                </div>
                <ul>
                    {
                        this.state.students.map(student => {
                            return <li>{student.uid}</li>
                        })
                    }
                </ul>
            </div>
        );
    }

}