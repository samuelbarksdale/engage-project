import React, { Component } from "react";
import axios from 'axios';
import config from '../config';
import Absence from '../components/Absence'

export default class AbsenceList extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      absences: []
    }
  }

  async componentDidMount() {
    let response = await axios.get(`${config.absenceURL}/absences?course_id=${this.props.courseId}`);
    this.setState({absences: response.data});
  }

  render() {

    return (
      <div id="absence">
      <h1>Absence</h1>
        <table>
        <thead>
          <tr>
            <th>uid</th>
            <th>section id</th>
            <th>missing days</th>
            <th>type</th>
            <th>rationale</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
        {
          this.state.absences.map(absence => {
            return <Absence {...absence}/>
          })
        }
        </tbody>
        
        </table>
        
      </div>
    );
  }
}