import React, { useState } from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { useHistory, useParams } from 'react-router-dom';

const AnswerPage: React.FC = () => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [answer, setAnswer] = useState<string>('');
    const [question, setQuestion] = useState<Question>();
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const history = useHistory();
    
    if (!loaded) {
        service.getQuestionById(id)
        .then(res => {
            setQuestion(res.data);
            setLoaded(true);
        });
    }

    const sendAnswer = () => {
        service.postAnswer({
            questionId: id,
            text: answer,
            userId: 2
        })
        .then(res => history.push(`/question/${id}`));
    }

    return (
        <div className='container'>
            <div className='p-3 mt-3 bg-light border border-secondary'>
                <h1>{question?.title}</h1>
                <p>{question?.description}</p>
            </div>

            <textarea className='form-control p-3 mt-3' onChange={e => setAnswer(e.target.value)} value={answer}></textarea>

            <button className='mt-3 btn btn-primary' onClick={sendAnswer}>Post answer</button>
        </div>
    );
    
}

export default AnswerPage;
