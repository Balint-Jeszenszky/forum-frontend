import React, { useState } from 'react';
import QuestionTitle from './common/QuestionTitle';
import service from '../service/ForumService';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [wrongCredentials, setWrongCredentials] = useState<boolean>(false);
    const [regEmail, setRegEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [regPassword, setregPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const login = () => {

    }

    const register = () => {
        service.postUser({
            username,
            email: regEmail,
            password: regPassword
        })
        .then(res => {
            setSuccess(true);
        })
    }

    return (
        <div className="container">
            <div className="row justify-content-around mt-0 mt-lg-5">
                <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
                    <h1 className="text-center">Login</h1>
                    {wrongCredentials && <p className="text-danger text-center">Wrong credentials</p>}
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Username" onChange={e => setEmail(e.target.value)} value={email} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className="text-center form-group">
                            <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-lg-4 border border-dark rounded mt-2 mt-lg-5">
                    <h1 className="text-center">Register</h1>
                    {success && <p className="text-success text-center">Successful registration</p>}
                    <form>
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="Email" onChange={e => setRegEmail(e.target.value)} value={regEmail} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Name" onChange={e => setUsername(e.target.value)} value={username} />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" onChange={e => setregPassword(e.target.value)} value={regPassword} />
                        </div>
                        <div className="text-center form-group">
                            <button type="button" className="btn btn-primary" onClick={register}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
