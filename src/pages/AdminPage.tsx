import React from 'react';
import CategoryManager from './components/CategoryManager';
import UserManager from './components/UserManager';

const AdminPage: React.FC = () => {

    return (
        <div className='container'>
            <div className="row">

                <div className='col-12 col-md-6 w-100'>
                    <h1 className='text-center'>Categories:</h1>
                    
                    <CategoryManager />
                </div>

                <div className='col-12 col-md-6'>
                    <h1 className='text-center'>Users:</h1>

                    <UserManager />
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
