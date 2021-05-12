import React, { useContext, useState } from 'react';
import { LoadingState } from '../../models/LoadingState';
import { User } from '../../models/User';
import service from '../../service/ForumService';
import { UserContext } from '../common/UserContext';

const UserManager: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>(-1);
    const userCtx = useContext(UserContext);

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getAllUsers(userCtx)
        .then(res => {
            setUsers(res.data.filter((e: User) => !e.roles?.find(e => e.name === 'ROLE_ADMIN')));
            console.log(res.data);
        });
    }

    const selectUser = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(parseInt(e.target.value));
    }

    const onDelete = () => {
        if (selectedUserId !== -1) {
            service.deleteUserById(selectedUserId, userCtx)
            .then(res => {
                setUsers(users.filter(e => e.id !== selectedUserId));
                setSelectedUserId(-1);
            });
        }
    }

    return (
        <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
            <div className="w-100">
                <select className='form-control w-50' onChange={selectUser}>
                    <option value={-1}>Choose...</option>
                    {users.map(e => (<option value={e.id} key={e.id}>{e.username}</option>))}
                </select>
                <button className='btn btn-danger ml-2' type='button' onClick={onDelete} disabled={selectedUserId === -1}>Delete</button>
            </div>
        </form>
    );
}

export default UserManager;
