import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Category } from './models/Category';
import { LoadingState } from './models/LoadingState';
import { Login } from './models/User';
import AdminPage from './pages/AdminPage';
import AnswerPage from './pages/AnswerPage';
import CategoryPage from './pages/CategoryPage';
import Logout from './pages/common/Logout';
import Navbar from './pages/common/Navbar';
import { UserContext } from './pages/common/UserContext';
import EditAnswerPage from './pages/EditAnswerPage';
import EditQuestionPage from './pages/EditQuestionPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NewQuestionPage from './pages/NewQuestionPage';
import ProfilePage from './pages/ProfilePage';
import QuestionPage from './pages/QuestionPage';
import service from './service/ForumService';

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [userCtx, setUserCtx] = useState<Login>({});

    if (load === LoadingState.START) {
        const u = localStorage.getItem('userCtx');
        if (u) {
            setUserCtx(JSON.parse(u));
        }

        setLoad(LoadingState.LOADING);
        service.getCategories()
        .then(res => {
            setCategories(res.data);
            setLoad(LoadingState.LOADED);
        });
    }

    return (
        <UserContext.Provider value={userCtx}>
            <Navbar categories={categories} />
            <Switch>
                <Route exact path='/'>
                    <MainPage />
                </Route>
                <Route exact path='/question/:id'>
                    <QuestionPage />
                </Route>
                <Route exact path='/question/:id/edit'>
                    <EditQuestionPage />
                </Route>
                <Route exact path='/question/:qId/answer/:aId'>
                    <EditAnswerPage />
                </Route>
                <Route exact path='/answer/:id'>
                    <AnswerPage />
                </Route>
                <Route exact path='/category/:id'>
                    <CategoryPage categories={categories} />
                </Route>
                <Route exact path='/newquestion/:id'>
                    <NewQuestionPage />
                </Route>
                <Route exact path='/login'>
                    {userCtx.id ? <Redirect to='/' /> : <LoginPage setUserCtx={setUserCtx} />}
                </Route>
                <Route exact path='/logout'>
                    <Logout setUserCtx={setUserCtx} />
                </Route>
                <Route exact path='/profile'>
                    <ProfilePage />
                </Route>
                <Route exact path='/admin'>
                    <AdminPage />
                </Route>
                <Route path='/'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </UserContext.Provider>
    );
}

export default App;
