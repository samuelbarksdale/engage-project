import React from 'react'
import { Button, Card } from 'react-bootstrap';
import api from '../api'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useRouteMatch
} from "react-router-dom";
import AbsencePage from '../pages/AbsencePage';
import AttendancePage from '../pages/AttendancePage';
import DashboardPage from '../pages/DashboardPage';




const ClassCard = (props) =>  {
    const deleteCourse = (event) => {
      event.preventDefault();
      
    }

    let { path, url } = useRouteMatch();


    const LinkStyles = {
      textDecoration: 'none',
      color: 'blue',
      margin: '3px',
    }
    let startTime = new Date(props.schedule.time.start); 
    let endTime = new Date(props.schedule.time.end);
    let str = ""; 
    let days = props.schedule.days.map((day) => {
        if(day == "1"){str += "| Monday |"; }
        else if(day == "3"){str += "| Wednesday | "; }
        else{str += "| Friday |"; }
    }); 

   
    return ( 
    <Router>
      <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>Course: {props.courseName}</Card.Title>
            <h3>Lecture: {props.lectureName}</h3>
          {/* <Button onClick={deleteCourse}>Delete Course</Button> */}
            <h4>Educators: {props.educators[0]}</h4>
            <h4>Start Time: {startTime.toLocaleTimeString()}</h4>
            <h4>End EndTime: {endTime.toLocaleTimeString()}</h4>
              <h6>Days: {str}</h6>
            <Link style={LinkStyles} to={`${path}/attendance/${props.courseName}`}>View Attendance</Link>
            <Link style={LinkStyles} to={`${path}`}>Close</Link>

        </Card.Body>
      </Card>
      
      <Switch>
      <Route path={`${path}`} exact>
        </Route>
        <Route path={`${path}/attendance/:coursename`} exact>
          <AttendancePage />
        </Route>
      </Switch>
      

      </Router>
  )

  
} 
export default ClassCard


