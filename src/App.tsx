import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Category } from './models/Category';
import AnswerPage from './pages/AnswerPage';
import CategoryPage from './pages/CategoryPage';
import Navbar from './pages/common/Navbar';
import MainPage from './pages/MainPage';
import QuestionPage from './pages/QuestionPage';
import service from './service/ForumService';

const App: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>(service.getCategories());

    return (
        <>
            <Navbar categories={categories} />
            <Switch>
                <Route exact path='/question/:id'>
                    <QuestionPage />
                </Route>
                <Route exact path='/answer/:id'>
                    <AnswerPage />
                </Route>
                <Route exact path='/category/:id'>
                    <CategoryPage categories={categories} />
                </Route>
                <Route path='/'>
                    <MainPage />
                </Route>
            </Switch>
        </>
    );
}

export default App;
