import React from 'react';

const NewQuestionPage: React.FC = () => {

    return (
        <div className='container'>
            <h1>New question</h1>
            <label htmlFor='title'>Title:</label>
            <input className='form-control mb-3' id='title' type='text' />
            <label htmlFor='question'>Question:</label>
            <textarea className='form-control mb-3' id='question'></textarea>
            <button className='btn btn-primary'>Ask question</button>
        </div>
    );
}
    
export default NewQuestionPage;
