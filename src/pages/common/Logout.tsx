import React from 'react';
import { Redirect } from 'react-router-dom';
import { Login } from '../../models/User';

interface ILogout {
    setUserCtx(userCtx: Login): void;
}
const Logout: React.FC<ILogout> = props => {

    // update userCtx after redirect
    setTimeout(() => props.setUserCtx({}), 0);

    localStorage.removeItem('userCtx');
    
    return (
        <Redirect to="/" />
    );
}

export default Logout;
