import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { LoadingState } from '../models/LoadingState';
import service from '../service/ForumService';
import { UserContext } from './common/UserContext';

const EditQuestionPage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string>('');
    const params: {id: string} = useParams();
    const id = parseInt(params.id);
    const history = useHistory();
    const userCtx = useContext(UserContext);
    
    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getQuestionById(id)
        .then(res => {
            setTitle(res.data.title);
            setDescription(res.data.description);
            setLoad(LoadingState.LOADED);
        });
    }

    const updateQuestion = () => {
        service.putQuestion({
            id,
            categoryId: id,
            userId: userCtx.id!,
            title,
            description
        }, userCtx)
        .then(res => {
            history.push(`/question/${id}`);
        })
        .catch(err => {
            setError(err.response.data);
        });
    }

    return (
        <div className='container'>
            <h1>New question</h1>
            {error && <div className="alert alert-danger" role="alert">
                {error}
            </div>}
            <label htmlFor='title'>Title:</label>
            <input className='form-control mb-3' id='title' type='text' onChange={e => setTitle(e.target.value)} value={title} />
            <label htmlFor='question'>Question:</label>
            <textarea className='form-control mb-3' id='question' onChange={e => setDescription(e.target.value)} value={description}></textarea>
            <button className='btn btn-primary' onClick={updateQuestion}>Update question</button>
        </div>
    );
}
    
export default EditQuestionPage;
