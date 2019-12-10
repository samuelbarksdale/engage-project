import React from 'react';
import CourseForm from '../components/CourseForm'
import CourseEditForm from '../components/CourseEditForm'
import { Container, Alert, Button } from 'react-bootstrap';
import api from '../api';

export default class Settings extends React.Component {

    constructor(props) {
        super(props)
        this.state = {course: "", alert: {show: false, type: "", message: ""}}
        this.showAlert = this.showAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }

    showAlert(type, message) {
        this.setState({alert: {show: true, type, message}})
    }

    hideAlert() {
        this.setState({alert: {show: false, type: "", message: ""}})
    }

    async componentDidMount() {
        let {data} = await api.getMyClasses();
        if (data.length) this.setState({course: data[0].courseName})
    }

    render() {
        return (
  
                <div>
                    {this.state.alert.show && 
                        <Alert 
                            variant={this.state.alert.type} 
                            onClose={this.hideAlert}
                            dismissible
                        >
                            {this.state.alert.message}
                        </Alert>
                    }
                    <h3 className="text-center mt-4">Settings</h3>
                    
                    <Container>
                        {
                            (this.state.course !== "" )
                            ? (
                                <div>
                                    <h4>Edit Course</h4>
                                    <CourseEditForm course={this.state.course} showAlert={this.showAlert} />
                                </div>
                                )
                            : (
                                <div>
                                    <h4>Setup Course</h4>
                                    <CourseForm showAlert={this.showAlert} />
                                </div>
                            )
                        }
          
                    </Container>
                    
                </div>
            
        );
    }
}