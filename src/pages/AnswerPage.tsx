import React from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { useParams } from 'react-router-dom';

const AnswerPage: React.FC = () => {
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const question: Question = service.getQuestionById(id);

    return (
        <div className='container'>
            <div className='p-3 mt-3 bg-light border border-secondary'>
                <h1>{question.title}</h1>
                <p>{question.description}</p>
            </div>

            <textarea className='form-control p-3 mt-3'></textarea>

            <button className='mt-3 btn btn-primary'>Post answer</button>
        </div>
    );
    
}

export default AnswerPage;
