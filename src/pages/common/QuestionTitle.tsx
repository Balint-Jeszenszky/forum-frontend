import React from 'react';
import { Link } from 'react-router-dom';
import { Question } from '../../models/Question';

interface IQuestionTitle {
    question: Question;
}

const QuestionTitle: React.FC<IQuestionTitle> = props => {
    
    return (
        <div className='p-3 mt-3 bg-light border border-secondary'>
            <Link to={`/question/${props.question.id}`}>{props.question.title}</Link>
        </div>
    );
}

export default QuestionTitle;
