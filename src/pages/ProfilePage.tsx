import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { LoadingState } from '../models/LoadingState';
import { User } from '../models/User';
import service from '../service/ForumService';
import { UserContext } from './common/UserContext';

const ProfilePage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [user, setUser] = useState<User>();
    const [editing, setEditing] = useState<boolean>(false);
    const userCtx = useContext(UserContext);
    const history = useHistory();

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getUserById(userCtx.id!, userCtx)
        .then(res => {
            const data = res.data;
            data.time = new Date(data.time);
            setUser(res.data);
        });
    }

    const deleteProfile = () => {
        if (window.confirm('Delete your profile?')) {
            service.deleteUserById(userCtx.id!, userCtx)
            .then(res => {
                localStorage.removeItem('userCtx');
                history.push('/logout');
            });
        }
    }

    const edit = () => {
        setEditing(true);

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
                        {!editing && <div className='col-6'>
                            <p>{user?.username}</p>
                            <p>{user?.email}</p>
                        </div>}
                        {editing && <div className='col-6'>
                            <p>{user?.username}</p>
                            <input type="text" className='form-control form-control-sm' />
                        </div>}
                    </div>
                    {!editing && <div className='text-center'>
                        <button className='btn btn-primary' onClick={edit}>Edit</button>
                    </div>}
                    {editing && <div className='text-center'>
                        <button className='btn btn-primary'>Save</button>
                        <button className='btn btn-secondary mx-1' onClick={() => setEditing(false)}>Cancel</button>
                        {!userCtx.roles?.find(e => e === 'ROLE_ADMIN') && <button className='btn btn-danger' onClick={deleteProfile}>Delete profile</button>}
                    </div>}
                </div>
                
                <div className='col-12 col-md-6'>
                    <h1 className='text-center'>Your questions:</h1>
                    <div>
                        
                    </div>

                    <h1 className='text-center'>Questions answered:</h1>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
