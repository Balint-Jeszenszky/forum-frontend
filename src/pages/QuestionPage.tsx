import React, { useState } from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { Link, useParams } from 'react-router-dom';
import { Answer } from '../models/Answer';

const QuestionPage: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [question, setQuestion] = useState<Question>();
    const [answers, setAnswers] = useState<Answer[]>([]);
    const params: {id: string} = useParams();
    const id = parseInt(params.id);

    if (!loaded) {
        setLoaded(true);
        service.getQuestionById(id)
        .then(res => {
            const data = res.data;
            data.time = new Date(data.time);
            setQuestion(res.data);
            service.getAnswersByQuestionId(id)
            .then(res => {
                setAnswers(res.data.map((e: Answer) => {e.time = new Date(e.time); return e}));
            });
        });
    }

    return (
        <div className='container'>
            <div className='p-3 mt-3 bg-light border border-secondary'>
                <h1>{question?.title}</h1>
                <p>{question?.description}</p>
                <p className='text-right m-0'>{question?.time.toLocaleDateString()} {question?.time.toLocaleTimeString()}</p>
            </div>

            {answers.map(e => (
                <div className='p-3 mt-3 bg-light border border-secondary' key={`a-${e.id}`}>
                    <p className='m-0'>{e.text}</p>
                    <p className='m-0 text-right'>{e.time.toLocaleDateString()} {e.time.toLocaleTimeString()}</p>
                </div>
            ))}

            <Link to={`/answer/${id}`} className='mt-3 btn btn-primary'>Answer</Link>
        </div>
    );
    
}

export default QuestionPage;
