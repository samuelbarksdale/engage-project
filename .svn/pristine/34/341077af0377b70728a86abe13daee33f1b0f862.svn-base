import React, {Component} from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';

export default class PollCard extends Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

            <CardColumns>
            <Card>
                <Card.Header as="h5"> Poll #{this.props.pollNum + 1} </Card.Header>
                <Card.Body>
                    <Card.Title> Opened on {this.props.date}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.type}</Card.Subtitle>
                    <Card.Text> {this.props.question} </Card.Text>
                    <Card.Link href="#">Close</Card.Link>
                    <Card.Link href="#">Delete</Card.Link>
                    <Card.Link href="#">View Answers</Card.Link>
                </Card.Body>
            </Card>
            </CardColumns>
            
        )
        
    }
}