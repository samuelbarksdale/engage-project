import React, {Label} from 'react';
import { Button, Card, Image} from 'react-bootstrap';
import api from '../api';
import AbsenceCard from "./AbsenceCard"
import {
    BrowserRouter as Router,
    Link,
    useLocation,
    Switch, 
    Route
  } from "react-router-dom";



  export default class AbsenceList extends React.Component {

    constructor(props){
        super(props); 
        this.state = {absences: []}
    }
    
    async componentDidMount(){
        let res = await api.getAbsences();
        if (res) this.setState({absences: res.data});
    }

    async handleAllDelete(){
        await api.deleteAbsences();
        window.location.reload(); 
    }

    async handleDeleteSpecificRequest(id){
        await api.deleteSpecificRequest(id); 
        
        window.location.reload(); 
        
    }
    
    render() {
         return (
               <div>
                   <Button onClick={() => {window.location.reload()}}>Refresh</Button>
                   <span style={{width: 10}}>                      </span>
                   <Button onClick={this.handleAllDelete}> Hard Delete All Requests </Button>
                   <br/>
                   <br/>
                   <br/>
                   {this.state.absences.map((data) => {
                        return (
                            <Card>
                                <AbsenceCard
                                    key={data._id}
                                    id={data._id}
                                    section_id = {data.section_id}    
                                    type={data.type} 
                                    rationale={data.rationale}
                                    uid={data.uid}
                                    email={data.email}
                                    startDate={data.missed_days.start}
                                    endDate={data.missed_days.end}
                                    files={data.files}
                                />
                                <br/>
                                <button onClick={() => this.handleDeleteSpecificRequest(data._id)}>Delete</button>
                                <br/>
                            </Card>
                        )
                    })}

               </div>
             )
    }
} 

