import React, { useContext, useState } from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingState } from '../models/LoadingState';
import { UserContext } from './common/UserContext';

const EditAnswerPage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [answer, setAnswer] = useState<string>('');
    const [question, setQuestion] = useState<Question>();
    const [error, setError] = useState<string>('');
    const params: {aId: string, qId: string} = useParams();
    const aId = parseInt(params.aId);
    const qId = parseInt(params.qId);
    const history = useHistory();
    const userCtx = useContext(UserContext);
    
    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        const questionLoad = service.getQuestionById(qId)
        .then(res => {
            setQuestion(res.data);
        });

        const answerLoad = service.getAnswerById(aId, userCtx)
        .then(res => {
            setAnswer(res.data.text);
        });
        
        Promise.all([questionLoad, answerLoad])
        .then(() => setLoad(LoadingState.LOADED));
    }

    const updateAnswer = () => {
        service.putAnswer({
            id: aId,
            questionId: qId,
            text: answer,
            userId: userCtx.id!,
            time: new Date()
        }, userCtx)
        .then(res => history.push(`/question/${qId}`))
        .catch(err => {
            setError(err.response.data);
        });
    }

    return (
        <div className='container mt-3'>
            {error && <div className="alert alert-danger" role="alert">
                {error}
            </div>}

            <div className='p-3 bg-light border border-secondary'>
                <h1>{question?.title}</h1>
                <p>{question?.description}</p>
            </div>

            <textarea className='form-control p-3 mt-3' onChange={e => setAnswer(e.target.value)} value={answer}></textarea>

            <button className='mt-3 btn btn-primary' onClick={updateAnswer}>Update answer</button>
        </div>
    );
    
}

export default EditAnswerPage;
