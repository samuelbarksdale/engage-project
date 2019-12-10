import React, {Component} from 'react';
import { Button, Card, Alert, Form, Col, Text} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import api from "../api"
import "react-datepicker/dist/react-datepicker.css";




export default class AbsenceForm extends Component {

    constructor(props){
        super(props); 
        this.state = {
            uid: '',
            did: '',
            course_id: '',
            section_id: '',
            start_date: new Date(),
            end_date: new Date(), 
            type: '',
            rationale: '',
            email: '',
            missed_assignments: '', 
            files: null,
            picture: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);


    }

    async handleSubmit(){

        

        
        try {
            const parseDays = (days) => {
                try{
                    return days.match(/[A-Z][a-z]?/g)
                       
                } catch (e) {
                    throw new Error("Invalid date character, must be M T W Th F ")
                }
             }   

            if (this.state.rationale.length == 0) return alert("warning", "Reasons cannot be empty");
            else if (this.state.email.length == 0) return alert("warning", "Email must be provided");
            
            
            const requestObject = {
                uid: this.state.uid, 
                section_id: this.state.course_id + "-" + this.state.section_id, 
                rationale: this.state.rationale, 
                email: this.state.email, 
                missed_assignments: this.state.missed_assignments, 
                type: this.state.type, 
                missed_days: {start: this.state.start_date,
                end: this.state.end_date},
                isDeleted: false
            }
            console.log(JSON.stringify(requestObject)); 
            

            let absenceRequestID = await api.createAbsenceRequest(requestObject);
            const fd = new FormData(); 
            fd.append('files', this.state.picture, this.state.picture.name);
            let success_image = await api.postAbsenceFile(absenceRequestID, fd); 
           
        } catch(e) {
            console.error(e)
        }
    }

     handleStartDateChange = (date) => {
        this.setState({
            startDate: date
          });
    }

    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
          });
    }

    onDrop(picture) {
        this.setState({
            picture: this.state.picture.concat(picture),
        });
        alert(JSON.stringify(this.state.picture)); 
    }

    fileSelectedHandler = (event) => {
        this.setState({picture: event.target.files[0]}); 
       //  console.log(event.target.files[0]); 
    }

    render(){

        return(
            <Card>
                <Card.Body>
                <Card.Title>Submit an Absence Request</Card.Title>
            <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Enter UID</Form.Label>
                    <Form.Control 
                        onChange={(e) => {this.setState({uid: e.target.value})}} 
                        value={this.state.uid} 
                        type="text" 
                    />
                </Form.Group>
                
            </Form.Row>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({email:e.target.value})}}
                    value={this.state.email}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Course Name</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({course_id:e.target.value})}}
                    value={this.state.course_id}
                    placeholder="e.g CMSC131" 

                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({section_id:e.target.value})}}
                    value={this.state.section_id}
                    placeholder="e.g 0101" 

                />
            </Form.Group>
            <Form.Label>Absence Start Date</Form.Label>
            <DatePicker  selected={this.state.startDate} onChange={this.handleStartDateChange}/> 
            <Form.Label>Absence End Date</Form.Label>
            <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange}/> 

            <Form.Group>
                <Form.Label>Please provide a reason along with what assignments you will be missing</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({rationale:e.target.value})}}
                    value={this.state.rationale}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Type of Illness - Must be one of the following (Copy in exact format) - (illness, religious, military, university, external, other)</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({type:e.target.value})}}
                    value={this.state.type}
                    placeholder="illness" 

                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Missed Assignments</Form.Label>
                <Form.Control 
                    type="text"
                    onChange={(e)=>{this.setState({missed_assignments:e.target.value})}}
                    value={this.state.missed_assignments}
                />
            </Form.Group>
            <input type="file" onChange={this.fileSelectedHandler}></input>
                        
            <Form.Row><Button onClick={this.handleSubmit} style={{marginTop: "10px", background: "#990000", borderColor: "#990000"}}  size="md">Submit Absence Request</Button></Form.Row>
           
        </Form>
        </Card.Body>
        </Card>
        )

    }

}