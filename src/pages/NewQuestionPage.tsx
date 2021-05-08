import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import service from '../service/ForumService';
import { UserContext } from './common/UserContext';

const NewQuestionPage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const history = useHistory();
    const userCtx = useContext(UserContext);

    const askQuestion = () => {
        service.postQuestion({
            categoryId: id,
            userId: userCtx.id!,
            title,
            description
        }, userCtx).then(res => {
            history.push(`/question/${res.data.id}`);
        });
    }

    return (
        <div className='container'>
            <h1>New question</h1>
            <label htmlFor='title'>Title:</label>
            <input className='form-control mb-3' id='title' type='text' onChange={e => setTitle(e.target.value)} value={title} />
            <label htmlFor='question'>Question:</label>
            <textarea className='form-control mb-3' id='question' onChange={e => setDescription(e.target.value)} value={description}></textarea>
            <button className='btn btn-primary' onClick={askQuestion}>Ask question</button>
        </div>
    );
}
    
export default NewQuestionPage;
