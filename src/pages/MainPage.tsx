import React, { useState } from 'react';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';
import { Question } from '../models/Question';
import { LoadingState } from '../models/LoadingState';

const MainPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getNewestQuestions()
        .then(res => {
            const data = res.data;
            data.time = new Date(data.time);
            setQuestions(res.data);
        });
    }

    return (
        <div className='container'>
            <h1>Newest questions</h1>
            {questions.map(e => (<QuestionTitle question={e} key={`q-${e.id}`} />))}
        </div>
    );
}
    
export default MainPage;
