import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Alert, Container, Row, Col, Button, Navbar, Nav} from 'react-bootstrap'
import AbsenceForm from "./components/AbsenceForm"
import api from './api'

import Checkin from "./components/Checkin"

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: "checkin", 
      user: {}, 
      alert: {show: false, message:"", type:""},
    }

    this.showAlert = this.showAlert.bind(this);
    this.handleNav = this.handleNav.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
  }
  async componentDidMount() {
    let res = await api.getMe()
    if (res.data) this.setState({user: res.data})
    else this.showAlert("danger", res.error)
  }
 

  showAlert(type, message) {
    this.setState({alert: {show: true, type, message}});
    setTimeout(() => {
      this.setState({alert: {show: false, type: '', message: ''}})
    }, 3000)
  }

  handleNav(selected) {
    this.setState({selected});
  }

  async handleCheckIn(coords) { 
    let res = await api.checkin(coords);
    if (res.error) this.showAlert("danger", res.error);
    else this.showAlert("success", "Successfully logged attendance!")
  }

  render() {
    let Child;
    switch(this.state.selected) {
      case "checkin":
        Child = <Checkin checkInSubmit={this.handleCheckIn}/>
        break;
      case "absence":
        Child = <AbsenceForm />
        break;
      default:
        Child = <p>Oh. This wasn't supposed to happen.</p>
    }
    return (
      <div>
        <Container>
          <h3>Engage</h3>
          <p className="loggedinP">Logged in as {this.state.user.name}</p>
          <Navbar variant="tabs" defaultActiveKey="checkin">
            <Nav onSelect={this.handleNav}>
              <Nav.Item><Nav.Link eventKey="checkin">Checkin</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="absence">Absence</Nav.Link></Nav.Item>
            </Nav>
          </Navbar>
          {this.state.alert.show && <Alert variant={this.state.alert.type}>{this.state.alert.message}</Alert>}
            {Child}
        </Container>
      </div>
      
     
    );
  }
}
