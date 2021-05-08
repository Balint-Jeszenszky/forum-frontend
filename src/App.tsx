import React, { useRef, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Category } from './models/Category';
import AnswerPage from './pages/AnswerPage';
import CategoryPage from './pages/CategoryPage';
import Navbar from './pages/common/Navbar';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NewQuestionPage from './pages/NewQuestionPage';
import QuestionPage from './pages/QuestionPage';
import service from './service/ForumService';

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    if (!loaded) {
        service.getCategories()
        .then(res => {
            setCategories(res.data);
            setLoaded(true);
        });
    }

    return (
        <>
            <Navbar categories={categories} />
            <Switch>
                <Route exact path='/'>
                    <MainPage />
                </Route>
                <Route exact path='/question/:id'>
                    <QuestionPage />
                </Route>
                <Route exact path='/answer/:id'>
                    <AnswerPage />
                </Route>
                <Route exact path='/category/:id'>
                    <CategoryPage categories={categories} />
                </Route>
                <Route exact path='/newquestion'>
                    <NewQuestionPage />
                </Route>
                <Route exact path='/login'>
                    <LoginPage />
                </Route>
                <Route path='/'>
                    <Redirect to='/' />
                </Route>
            </Switch>
        </>
    );
}

export default App;
