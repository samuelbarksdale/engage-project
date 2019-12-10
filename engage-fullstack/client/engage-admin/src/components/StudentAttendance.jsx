import React, {Component} from 'react';
import {Form, Button, Col, Container, Table} from 'react-bootstrap'
import api from '../api';

export default class StudentAttendance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {attendance: "", did: "", display: "none"}
        this.setDisplay = this.setDisplay.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.test = this.test.bind(this);
    }

    async renderTableData(){
        this.setState({display:"block"});
        let data = await api.getAttendance();
        console.log(this.state.did)

        var uidDict = {}
        data.map(function (record, index) {
            console.log(record.timestamp);
            const timestampConverted = new Date(record.timestamp)
            if (record.did in uidDict){
                if (uidDict[record.did].includes(timestampConverted.toDateString())){
                } else {
                    uidDict[record.did].push(timestampConverted.toDateString())
                }
            } else {
                uidDict[record.did] = [timestampConverted.toDateString()]
            }
        })
        uidDict[this.state.did].sort(function(first, second) {
            var date1 = new Date(first)
            var date2 = new Date(second)
            return date1 > date2 
        })
        var dateString = ""
        uidDict[this.state.did].map(function(date, index) {
            dateString += date + ", "
        })
        dateString = dateString.slice(0, -2)
        this.setState({attendance: dateString})
    }

    setDisplay(){
        this.setState({display:"block"});
    }

    test(){
        console.log("hello")
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Label> Filter Student </Form.Label>
                    <Form.Control
                        onChange={(e) => {this.setState({did: e.target.value})}} 
                        value={this.state.did}
                        type="text" 
                        placeholder="Enter student directory id" 
                    />
                    <Form.Row><Button onClick={this.renderTableData} style={{marginTop: "10px"}} variant="success" size="md">Search</Button></Form.Row>
                </Form>
                <h1 id='title' style={{display:this.state.display}}>Attendance</h1>
                <div id="student_attendance" style={{display:this.state.display}}>
                {/* <h1 id='title' >Attendance</h1>
                <div id="student_attendance" > */}
                    <Table striped bordered hover id='student'>
                        <tr>
                            <th>Directory ID</th>
                            <th>Dates Attended</th>
                        </tr>
                            <tbody>
                                <tr key={this.state.did}>
                                    <td>{this.state.did}</td>
                                    <td>{this.state.attendance}</td>
                                </tr>
                            </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}