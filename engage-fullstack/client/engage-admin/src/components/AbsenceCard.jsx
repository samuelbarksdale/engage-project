import React from 'react';
import { Button, Card} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    Switch, 
    Route
  } from "react-router-dom";
import api from "../api"
import config from '../config';

  const APPROVAL_SUBJECT_TEXT = "Your request has been approved"; 
  const DENIAL_SUBJECT_TEXT = "Your request has been denied"; 

  export default class AbsenceCard extends React.Component {
    constructor() {
      super()
      this.state = {fileMetadata: []}
    }
   
    async componentDidMount() {
      let res = await api.getAbsenceFiles(this.props.id);
      if (res && res.length > 0) this.setState({fileMetadata: res})
    }

    render() {
      console.log(this.state)
         return (  
                <Card >
                  <Card.Body>
                    <Card.Title>{this.props.section_id}</Card.Title>
                      <h3><strong>University ID: </strong>  {this.props.uid}</h3>
                      <h4><strong>Request Type: </strong> {this.props.type}</h4>
                      <h5><strong>Student Reason: </strong> {this.props.rationale}</h5>
                      <h6><strong>Student Email: </strong>{this.props.email}</h6>
                      <h6><strong>Start Date: </strong>{this.props.startDate}</h6>
                      <h6><strong>End Date: </strong>{this.props.endDate}</h6>
                      {
                        this.state.fileMetadata.map(md =>
                          <a target="_blank" href={`${config.backendDomain}/api/absences/${this.props.id}/files/${md._id}`}>
                            {md.filename}
                          </a>
                        )
                      }
                  </Card.Body>
                </Card>
             )
    }
   
  
} 

