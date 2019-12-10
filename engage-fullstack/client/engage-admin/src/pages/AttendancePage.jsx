import React from 'react';
import api from '../api'
import AttendanceGraphs from '../components/AttendanceGraphs';
import StudentAttendance from '../components/StudentAttendance';
import { Container } from 'react-bootstrap';

export default class AttendancePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {attendance: [], filter: {}}
    }

    async componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h3 className="text-center mt-4">Class Attendance</h3>
                <Container>
                    <AttendanceGraphs />
                </Container>
                <Container>
                    <StudentAttendance />
                </Container>
            </div>
        );
    }
}