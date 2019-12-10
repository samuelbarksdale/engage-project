import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
    status: {
        type: String
    },
    creator: {
        type: String, 
        required: true
    },
    question: {
        type: String,
        required: true
    },
    type: {
        type:  String,
        required: true
    },
    choices: [{
        choice: {
            type: String
        },
        choiceId: {
            type: String
        },
        votes: {
            type: Number
        },
        voters: [{
            type: String
        }]
    }],
    text_answers: [{
        uid: {
            type: String,
            retuiqred: true
        },
        answer: {
            type: String
        }
    }],
    date: {
        type: String,
    }
});

const PollModel = mongoose.model('Polls', pollSchema);
export {PollModel}