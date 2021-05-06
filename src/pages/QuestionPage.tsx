import React from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { Link, useParams } from 'react-router-dom';
import { Answer } from '../models/Answer';

const QuestionPage: React.FC = () => {
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const question: Question = service.getQuestionById(id);
    const answers: Answer[] = service.getAnswersByQuestionId(id);

    return (
        <div className='container'>
            <div className='p-3 mt-3 bg-light border border-secondary'>
                <h1>{question.title}</h1>
                <p>{question.description}</p>
                <p className='text-right m-0'>{question.time.toLocaleDateString()} {question.time.toLocaleTimeString()}</p>
            </div>

            {answers.map(e => (
                <div className='p-3 mt-3 bg-light border border-secondary'>
                    <p className='m-0'>{e.text}</p>
                    <p className='m-0 text-right'>{e.time.toLocaleDateString()} {e.time.toLocaleTimeString()}</p>
                </div>
            ))}

            <Link to={`/answer/${id}`} className='mt-3 btn btn-primary'>Answer</Link>
        </div>
    );
    
}

export default QuestionPage;
