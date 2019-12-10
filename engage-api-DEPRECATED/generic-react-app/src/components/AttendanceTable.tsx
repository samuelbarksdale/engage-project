import React, {Component} from 'react'
import { Button, Card, Table  } from 'react-bootstrap';
import config from '../config';
//import { Agent } from 'http';

interface IAttendanceState {
  students: {directoryID:any, name:any, dates: string[]}[]

}

class AttendanceTable extends React.Component<any, IAttendanceState> {

  constructor(props:any) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    const tempDate = new Date()
    this.state = { //state is by default an object
       students: [
          // { directoryID: "sbarksda", name: 'Samuel Barksdale', dates: [tempDate.toDateString()]}
       ]
    }
  }

  componentDidMount(){
    console.log("Component Mounted, initiating request to backend courses"); 
    console.log(this.getAttendanceFromApiAsync()); 
  }
  getAttendanceFromApiAsync() {

    console.log("here trying to fetch data from localhost data"); 
    return fetch(config.attendanceURL+ "/attendance", {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
    }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(" I am here with the response object"); 
      console.log(responseJson)
      var uidDict = {}
      responseJson.map((data, index) => {
        const {uid, timestamp} = data
        const date = new Date(timestamp);
        
        if (uid in uidDict){
          console.log("found duplicate id: " + uid)
          const i = this.state.students.findIndex(x=>x.directoryID===uid)          
          this.setState({
            students:[...this.state.students.slice(0,i), Object.assign({},this.state.students[i],{dates:[...this.state.students[i].dates, ", " + date.toDateString()]}),...this.state.students.slice(i+1)]
          })

        } else {
          uidDict[uid] = true
          const student = {directoryID: uid, name: uid, dates: [date.toDateString()]}
          this.setState({students: [...this.state.students, student]})
        }

      })
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { directoryID, name, dates} = student //destructuring

      return (
          <tr key={directoryID}>
            <td>{directoryID}</td>
            <td>{name}</td>
            <td>{dates}</td>
          </tr>
      )
    })
  }



  renderTableHeader() {
    let header = Object.keys(this.state.students[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }

                  // <tr>{this.renderTableHeader()}</tr>
  render() {
      return (
        <div>
            <h1 id='title'>Attendance</h1>
            <Table striped bordered hover id='student'>
              <tr>
                <th>Directory ID</th>
                <th>Name</th>
                <th>Dates Attended</th>
              </tr>
                <tbody>
                  {this.state.attendance}
                </tbody>
            </Table>
        </div>
      )
  }


}

export default AttendanceTable; 