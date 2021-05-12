import React, { useContext, useState } from 'react';
import { Question } from '../models/Question';
import service from '../service/ForumService';
import { useHistory, useParams } from 'react-router-dom';
import { LoadingState } from '../models/LoadingState';
import { UserContext } from './common/UserContext';

const AnswerPage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [answer, setAnswer] = useState<string>('');
    const [question, setQuestion] = useState<Question>();
    const [error, setError] = useState<string>('');
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const history = useHistory();
    const userCtx = useContext(UserContext);
    
    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getQuestionById(id)
        .then(res => {
            setQuestion(res.data);
            setLoad(LoadingState.LOADED);
        });
    }

    const sendAnswer = () => {
        service.postAnswer({
            questionId: id,
            text: answer,
            userId: userCtx.id!
        }, userCtx)
        .then(res => history.push(`/question/${id}`))
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

            <button className='mt-3 btn btn-primary' onClick={sendAnswer}>Post answer</button>
        </div>
    );
    
}

export default AnswerPage;
