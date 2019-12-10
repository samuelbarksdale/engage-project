export interface IPollQuestionChoice {
    pollId: IPollQuestion['_id'];
    choiceId: string;
    choice: string;
}

export interface IPollQuestionChoiceAnonymousResult extends IPollQuestion {
    votes: number;
    voters: string[];
}

export interface IPollQuestionChoiceResult extends IPollQuestionChoiceAnonymousResult {
    voters: string[];
}

export interface IPollQuestionTextAnswer {
    uid: string;
    answer: string;
}

export interface IPollQuestion {
    _id: string;
    course_id: string;
    status: string;
    creator: string;
    question: string;
    type: string;
    choices: IPollQuestionChoice[];
    text_answers: IPollQuestionTextAnswer[];
}