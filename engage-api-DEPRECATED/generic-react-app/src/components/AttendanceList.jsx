import React from 'react'
import axios from 'axios'
import config from '.././config'

export default class AttendanceList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attendance: []
        }
    }

    async componentDidMount() {
        let endpoint = `${config.attendanceURL}/attendance?course_id=${this.props.courseId}`;
        console.log(endpoint)
        let response = await axios.get(endpoint);
        console.log(response.data)
        this.setState({attendance: response.data})
    }

    render() {
        return (
            <div>
                <h2>Attendance</h2>
                <table>
                    <thead>
                        <th>uid</th>
                        <th>section id</th>
                        <th>timestamp</th>
                    </thead>
                    {
                        this.state.attendance.map(obj => {
                            return (
                                <tr key={obj.uid}>
                                    <td>{obj.uid}</td>
                                    <td>{obj.sectionId}</td>
                                    <td>{obj.timestamp}</td>
                                </tr>)
                        })
                    }
                </table>

            </div>
        );
    }

}