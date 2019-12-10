import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import config from '../config';


export default class PollForm extends Component {

    constructor(props) {
        super(props);

        this.initialState = {
            question: '',
            questionType: '',
            choices: [],
        }

        this.state = initialState;
        this.handleQuestions = this.handleQuestions.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }



    async handleQuestions() {
     
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    async handleChoices() {
     
        const { name, value } = event.target;

        this.setState({
            [name]: [...this.state.choices, value],
        });
    }

    async submitForm() {

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {

        return (
            <Form>
            <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control 
                as="textarea" 
                placeholder="Enter question for poll"
                name="question"
                value={this.state.question}
                onChange={this.handleChange} 
                />
            </Form.Group>

            <Form.Group controlId="questionType">
                <Form.Label>Question Type</Form.Label>
                <Form.Control 
                as="select" multiple
                name="questionType"
                value={this.state.questionType}
                onChange={this.handleChange}>
                    <option>Free Response</option>
                    <option>Multiple Choice</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="choices">
                <Form.Label>Answer Choices</Form.Label>
                <Form.Text className="text-muted">
                    Provide only if question type is Multiple Choice.
                </Form.Text>
                <Form.Row>
                    <Form.Control 
                    type="text" 
                    placeholder="Answer A"
                    name="choices"
                    value={this.state.choices}
                    onChange={this.handleChange}/>
                </Form.Row>
                <Form.Row>
                <Form.Control 
                    type="text" 
                    placeholder="Answer B"
                    name="choices"
                    value={this.state.choices}
                    onChange={this.handleChange}/>
                </Form.Row>
                <Form.Row>
                <Form.Control 
                    type="text" 
                    placeholder="Answer C"
                    name="choices"
                    value={this.state.choices}
                    onChange={this.handleChange}/>
                </Form.Row>
                <Form.Row>
                <Form.Control 
                    type="text" 
                    placeholder="Answer D"
                    name="choices"
                    value={this.state.choices}
                    onChange={this.handleChange}/>
                </Form.Row>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={this.submitForm}>
                Submit
            </Button>
            </Form>
        )
    }

}