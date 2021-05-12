import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoadingState } from '../models/LoadingState';
import { Question } from '../models/Question';
import { User } from '../models/User';
import service from '../service/ForumService';
import QuestionTitle from './common/QuestionTitle';
import { UserContext } from './common/UserContext';

const ProfilePage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [user, setUser] = useState<User>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answered, setAnswered] = useState<Question[]>([]);
    const userCtx = useContext(UserContext);

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);

        const userLoad = service.getUserById(userCtx.id!, userCtx)
        .then(res => {
            setUser(res.data);
        });

        const questionsLoad = service.getQuestionByUserId(userCtx.id!, userCtx)
        .then(res => {
            setQuestions(res.data);
        });

        const answeredLoad = service.getAnsweredQuestionsByUserId(userCtx.id!, userCtx)
        .then(res => {
            setAnswered(res.data);
        });

        Promise.all([userLoad, questionsLoad, answeredLoad])
        .then(() => setLoad(LoadingState.LOADED));
    }

    return (
        <div className='container'>
            <div className="row">
                <div className='col-12 col-md-6'>
                <h1 className='text-center'>Your details:</h1>
                    <div className='row'>
                        <div className='col-6 text-right'>
                            <p>Username:</p>
                            <p>Email:</p>
                        </div>
                        <div className='col-6'>
                            <p>{user?.username}</p>
                            <p>{user?.email}</p>
                        </div>
                    </div>
                    <div className='text-center'>
                        <Link to='/profile/edit' className='btn btn-primary'>Edit</Link>
                    </div>
                </div>
                
                <div className='col-12 col-md-6'>
                    <h1 className='text-center'>Your questions:</h1>
                    <div>
                        {questions.map(e => (<QuestionTitle question={e} key={`q-${e.id}`}></QuestionTitle>))}
                    </div>

                    <h1 className='text-center'>Questions answered:</h1>
                    <div>
                        {answered.map(e => (<QuestionTitle question={e} key={`a-${e.id}`}></QuestionTitle>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
