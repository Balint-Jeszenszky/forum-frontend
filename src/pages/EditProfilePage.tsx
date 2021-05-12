import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { LoadingState } from '../models/LoadingState';
import { EditUser, User } from '../models/User';
import service from '../service/ForumService';
import { UserContext } from './common/UserContext';

const EditProfilePage: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [oldPass, setOldPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    const history = useHistory();
    const userCtx = useContext(UserContext);
    
    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);

        service.getUserById(userCtx.id!, userCtx)
        .then(res => {
            const user: User = res.data;
            setUsername(user.username);
            setEmail(user.email);
            setLoad(LoadingState.LOADED);
        });
    }

    const deleteProfile = () => {
        if (window.confirm('Delete your profile?')) {
            service.deleteUserById(userCtx.id!, userCtx)
            .then(res => {
                localStorage.removeItem('userCtx');
                history.push('/logout');
            })
            .catch(err => {
                setError(err.response.data);
            });
        }
    }

    const save = () => {
        const user: EditUser = {
            id: userCtx.id!,
            email: email,
            oldPassword: oldPass,
            newPassword: newPass,
            confirmPassword: confirmPass
        }

        service.putUser(user, userCtx)
        .then(res => {
            history.push('/profiel');
        })
        .catch(err => {
            setError(err.response.data);
        });
    }

    return (
        <div className='container py-3'>
            {error && <div className="alert alert-danger" role="alert">
                {error}
            </div>}
            <div className="form-group">
                <label htmlFor="usernameInput">Username</label>
                <input type="text" className="form-control" id="usernameInput" aria-describedby="usernameHelp" value={username} disabled />
                <small id="usernameHelp" className="form-text text-muted">You can't change your username.</small>
            </div>
            <div className="form-group">
                <label htmlFor="emailInput">Email</label>
                <input type="email" className="form-control" id="emailInput" onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div className="form-group">
                <label htmlFor="oldPassInput">Old assword</label>
                <input type="password" className="form-control" id="oldPassInput" aria-describedby="oldPassHelp" onChange={e => setOldPass(e.target.value)} value={oldPass} />
                <small id="oldPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
            </div>
            <div className="form-group">
                <label htmlFor="newPassInput">New password</label>
                <input type="password" className="form-control" id="newPassInput" aria-describedby="newPassHelp" onChange={e => setNewPass(e.target.value)} value={newPass} />
                <small id="newPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
            </div>
            <div className="form-group">
                <label htmlFor="newPassConfirmInput">Confirm new password</label>
                <input type="password" className="form-control" id="newPassConfirmInput" aria-describedby="confirmNewPassHelp" onChange={e => setConfirmPass(e.target.value)} value={confirmPass} />
                <small id="confirmNewPassHelp" className="form-text text-muted">Leave this empty if you don't want to change your password.</small>
            </div>
            <button type="button" className="btn btn-primary" onClick={save} >Save</button>
            <button type="button" className="btn btn-secondary mx-2" onClick={() => history.goBack()}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={deleteProfile}>Delete profile</button>
        </div>
    );
}

export default EditProfilePage;
