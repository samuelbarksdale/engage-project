import React from 'react';
import { Button, Card } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    Switch, 
    Route
  } from "react-router-dom";

const AbsenceCard = (props: any) =>  {


    let query = new URLSearchParams(useLocation().search); 
    
    const getAbsence = () => {

    }

    return (
    <div>    
      <Card style={{ width: '18rem' }}>
      <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      
        <Link to={`/dashboard/${props.title}`}>Go to section </Link>
        <Button onClick={getAbsence}>See Absence</Button>
      </Card.Body>
      </Card>

    </div>
  )
//   <div>
//   <h1>Testing</h1>
// </div>
// <div className="cart">
//  <button className="btn btn-block" onClick={this.toggle.bind(this)}>
//                       Open/close
//  </button>
//  </div>
  
} 

export default AbsenceCard