import React, { Component } from "react";
import CourseList from '../components/CourseList';

export default class Home extends Component {
  
  render() {
    return (
      <div id="home">
        <h1>Welcome to Engage</h1>
        <CourseList />
      </div>
    );
  }
}