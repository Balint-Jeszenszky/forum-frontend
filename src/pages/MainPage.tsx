import React from 'react';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';

const MainPage: React.FC = () => {

    return (
        <div className='container'>
            <h1>Newest questions</h1>
            {service.getNewestQuestions().map(e => (<QuestionTitle question={e} />))}
        </div>
    );
}
    
export default MainPage;
