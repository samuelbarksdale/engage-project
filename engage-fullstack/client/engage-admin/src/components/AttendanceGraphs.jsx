import React, {Component} from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList } from 'recharts'
import api from '../api';

export default class AttendanceGraphs extends React.Component {
    constructor(props){
        super(props)
        this.state = {attendance: [], filter: {}
        }
    }
    componentWillMount(){
        

    }

    async componentDidMount() {
        let data = await api.getAttendance();
        console.log(data);

        var dateDict = {}
        data.map((record, index) => {
            // Day of the week dateArray[0]
            // Month dateArray[1]
            // Numerical day of the month dateArray[2]
            // Year dateArray[3]
            console.log(record.timestamp);
            const timestampConverted = new Date(record.timestamp)
            var dateStr = timestampConverted.toDateString() 

            if (dateStr in  dateDict) {
                dateDict[dateStr] += 1;
            } else {
                dateDict[dateStr] = 1;
            }

        });
        
        // Sorting for date dictionary so that dates will always be in ascending order
        // when visualizing in graph.

        var items = Object.keys(dateDict).map(function(key) {
            return [key, dateDict[key]]
        })
        items.sort(function(first, second) {
            var date1 = new Date(first)
            var date2 = new Date(second)
            return date1 > date2 
        })
        var newState = []
        items.map(function(obj) {
            const attendanceRecord = {date: obj[0], totalAttended: obj[1]}
            newState.push(attendanceRecord);
        })
        this.setState({attendance: newState});

    }

    render(){
        return (
            <div className='line-charts-wrapper' width="150px">
                <LineChart width={1100} height={600} data={this.state.attendance}>
                    <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                    <Legend
                        onMouseEnter={this.handleLegendMouseEnter}
                        onMouseLeave={this.handleLegendMouseLeave}
                    />
                    <XAxis dataKey="date" height={40}>
                    <Label value="Current Week" position="insideBottom" />
                    </XAxis>
                    <YAxis type="number" dataKey="totalAttended" unit="">
                    <Label value="Amount of Students" position="" angle={-90} />
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="totalAttended" stroke="#8884d8" activeDot={{ r: 8 }} />
                    
                </LineChart>
            </div>
        )
    }
} 