import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';
import { Category } from '../models/Category';
import { Question } from '../models/Question';
import { LoadingState } from '../models/LoadingState';
import { UserContext } from './common/UserContext';

interface ICategoryPage {
    categories: Category[];
}

const CategoryPage: React.FC<ICategoryPage> = props => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [questions, setQuestions] = useState<Question[]>([]);
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        setLoad(LoadingState.START);
    }, [params]);

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getQuestionsByCategoryId(id)
        .then(res => {
            setQuestions(res.data);
            setLoad(LoadingState.LOADED);
        });
    }

    service.getQuestionsByCategoryId(id)

    return (
        <div className='container'>
            <h1>{props.categories.find(e => e.id === id)?.name}</h1>
            {userCtx.id && <Link to={`/newquestion/${id}`} className='btn btn-primary'>New question</Link>}
            {questions.map(e => (<QuestionTitle question={e} key={`q-${e.id}`} />))}
        </div>
    );
}
    
export default CategoryPage;
