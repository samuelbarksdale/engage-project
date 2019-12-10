import React from 'react'
import { Button, Card } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    Switch, 
    Route
  } from "react-router-dom";
import {useStore} from "../App";


 const CourseCard = (props: any) =>  {
    const store = useStore();
    const deleteCourse = (event) => {
      event.preventDefault();
      store.deleteCourse(
        props.course_id
      )
        alert(`deleting course ${props.course_id}`); 

    }

    return (
    <div>    
    <Card style={{ width: '18rem' }}>
    <Card.Body>
    <Card.Title>{props.title}</Card.Title>
      <Link to={`/${props.title}`}>Open </Link>
      <Button onClick={deleteCourse}>Delete Course</Button>
    </Card.Body>
    </Card>
  </div> 
  )

  
} 

export default CourseCard