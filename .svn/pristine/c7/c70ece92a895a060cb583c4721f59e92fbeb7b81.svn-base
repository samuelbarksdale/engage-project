import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AbsenceList from './AbsenceList'
import Students from '../components/Students'
import AttendanceTable from '../components/AttendanceTable'
import AttendanceList from '../components/AttendanceList'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps,
  useParams
} from "react-router-dom";
import { Button, Nav, Card} from 'react-bootstrap';
import Absence from './AbsenceList';

interface ISelectedCourse{
  courseid:number;
}


const  Course =  ()  => {
  let parameters : any = {}
  parameters = useParams(); 
  let courseId = parameters.courseId;


  return (
    <div>
      <h1>{courseId}</h1>
      <Students courseId={courseId} />
      <AttendanceList courseId={courseId}/>
      <AbsenceList courseId={courseId} />
    </div>
  )



  // return (
  //     <Router>
  //     <div>
  //     <Nav>
  //       <Nav.Item>
  //           <Link to={`//home`}> Home</Link>
  //       </Nav.Item>
  //       <Nav.Item>
  //       <Link to={`//absence`}> Absences</Link>
  //       </Nav.Item>
  //       <Nav.Item>
  //       <Link to={`//attendance`}> Attendance</Link>
  //       </Nav.Item>
  //       <Nav.Item>
  //         <Link to='/polls'>Polls</Link>
  //       </Nav.Item>
  //       <Nav.Item>
  //         <Nav.Link>
  //           Logout
  //         </Nav.Link>
  //       </Nav.Item>
  //   </Nav>

  //       {/* A <Switch> looks through its children <Route>s and
  //           renders the first one that matches the current URL. */}
  //       <Route path="//home" exact>
  //           <Home />
  //       </Route>
  //       <Route path="//absence" exact>
  //           <Absence />
  //       </Route>
  //       <Route path="/polls" exact>
  //         <Polls/> 
  //       </Route>
  //     </div>
  //     </Router>
  // );
}


export default Course;
