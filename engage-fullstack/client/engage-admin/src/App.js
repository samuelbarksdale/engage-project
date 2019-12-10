import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomePage from './pages/HomePage';
import AttendancePage from './pages/AttendancePage';
import AbsencePage from './pages/AbsencePage';
import PollsPage from './pages/PollsPage';
import SettingsPage from './pages/SettingsPage';
import api from './api'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {user: {}}
  }
  async componentDidMount() {
    let {data} = await api.getMe();
    this.setState({user: data});
  }
 

  render() {
    const LinkStyles = {
      textDecoration: 'none',
      color: 'white',
      margin: '7px',
    }
    return (

      <Router>
        <Navbar style={{background: "#990000"}} expand="lg">
          <Link to="/home"><Navbar.Brand style={{color: "#FFFFFF"}}>Engage</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link style={LinkStyles} to="/attendance">Attendance</Link>
              <Link style={LinkStyles} to="/absence">Absence Requests</Link>
              <Link style={LinkStyles} to="/polls">Polls</Link>
              <Link style={LinkStyles} to="/settings">Settings</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>


        <Switch>
          <Route path="/home">
            <HomePage user={this.state.user}/>
          </Route>
          <Route path="/attendance">
            <AttendancePage user={this.state.user}/>
          </Route>
          <Route path="/absence">
            <AbsencePage user={this.state.user}/>
          </Route>
          <Route path="/polls">
            <PollsPage user={this.state.user}/>
          </Route>
          <Route path="/settings">
            <SettingsPage user={this.state.user}/>
          </Route>
          <Route path="/">
            <Redirect to="/home"/>
          </Route>
        </Switch>
      </Router>
    )
  }
}
