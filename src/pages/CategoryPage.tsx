import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';
import { Category } from '../models/Category';

interface ICategoryPage {
    categories: Category[];
}

const CategoryPage: React.FC<ICategoryPage> = props => {
    const params: {id: string} = useParams();
    const id = parseInt(params.id);

    return (
        <div className='container'>
            <h1>{props.categories.find(e => e.id === id)?.name}</h1>
            {service.getQuestionsByCategoryId(id).map(e => (<QuestionTitle question={e} key={`q-${id}`} />))}
        </div>
    );
}
    
export default CategoryPage;
