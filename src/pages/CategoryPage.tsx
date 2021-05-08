import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';
import { Category } from '../models/Category';
import { Question } from '../models/Question';

interface ICategoryPage {
    categories: Category[];
}

const CategoryPage: React.FC<ICategoryPage> = props => {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const params: {id: string} = useParams();
    const id = parseInt(params.id);

    if (!loaded) {
        service.getQuestionsByCategoryId(id)
        .then(res => {
            setQuestions(res.data);
            setLoaded(true);
        });
    }

    service.getQuestionsByCategoryId(id)

    return (
        <div className='container'>
            <h1>{props.categories.find(e => e.id === id)?.name}</h1>
            {questions.map(e => (<QuestionTitle question={e} key={`q-${id}`} />))}
        </div>
    );
}
    
export default CategoryPage;
