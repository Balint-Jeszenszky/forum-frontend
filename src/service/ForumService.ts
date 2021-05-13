import axios from 'axios';
import { NewQuestion } from '../models/Question';
import { Category, NewCategory } from '../models/Category';
import { EditUser, Login, User } from '../models/User';
import { Answer, NewAnswer } from '../models/Answer';

class ForumService {
    baseUrl = '/api';

    private getHeader(userCtx: Login) {
        return {
            headers: {
                Authorization: `Bearer ${userCtx.token}`
            }
        }
    }

    getAnswersByQuestionId(id: number) {
        return axios.get(`${this.baseUrl}/answers/question/${id}`);
    }

    getAnswerById(id: number, userCtx: Login) {
        return axios.get(`${this.baseUrl}/answers/answer/${id}`, this.getHeader(userCtx));
    }

    postAnswer(answer: NewAnswer, userCtx: Login) {
        return axios.post(`${this.baseUrl}/answers/answer`, answer, this.getHeader(userCtx));
    }

    putAnswer(answer: Answer, userCtx: Login) {
        return axios.put(`${this.baseUrl}/answers/answer`, answer, this.getHeader(userCtx));
    }

    deleteAnswerById(id: number, userCtx: Login) {
        return axios.delete(`${this.baseUrl}/answers/answer/${id}`, this.getHeader(userCtx));
    }

    getCategories() {
        return axios.get(`${this.baseUrl}/categories`);
    }

    postCategory(category: NewCategory, userCtx: Login) {
        return axios.post(`${this.baseUrl}/categories`, category, this.getHeader(userCtx));
    }

    putCategory(category: Category, userCtx: Login) {
        return axios.put(`${this.baseUrl}/categories`, category, this.getHeader(userCtx));
    }

    deleteCategoryById(id: number, userCtx: Login) {
        return axios.delete(`${this.baseUrl}/categories/${id}`, this.getHeader(userCtx));
    }

    getNewestQuestions() {
        return axios.get(`${this.baseUrl}/questions/newest`);
    }

    getQuestionsByCategoryId(id: number) {
        return axios.get(`${this.baseUrl}/questions/category/${id}`);
    }

    getQuestionById(id: number) {
        return axios.get(`${this.baseUrl}/questions/question/${id}`);
    }

    getQuestionByUserId(id: number, userCtx: Login) {
        return axios.get(`${this.baseUrl}/questions/user/${id}`, this.getHeader(userCtx));
    }

    getAnsweredQuestionsByUserId(id: number, userCtx: Login) {
        return axios.get(`${this.baseUrl}/questions/answeredby/${id}`, this.getHeader(userCtx));
    }

    postQuestion(question: NewQuestion, userCtx: Login) {
        return axios.post(`${this.baseUrl}/questions/question`, question, this.getHeader(userCtx));
    }

    putQuestion(question: NewQuestion, userCtx: Login) {
        return axios.put(`${this.baseUrl}/questions/question`, question, this.getHeader(userCtx));
    }

    deleteQuestionById(id: number, userCtx: Login) {
        return axios.delete(`${this.baseUrl}/questions/question/${id}`, this.getHeader(userCtx));
    }

    getAllUsers(userCtx: Login) {
        return axios.get(`${this.baseUrl}/users`, this.getHeader(userCtx));
    }

    getUserById(id: number, userCtx: Login) {
        return axios.get(`${this.baseUrl}/users/${id}`, this.getHeader(userCtx));
    }

    registerUser(user: User) {
        return axios.post(`${this.baseUrl}/auth/register`, user);
    }

    putUser(user: EditUser, userCtx: Login) {
        return axios.put(`${this.baseUrl}/users`, user, this.getHeader(userCtx));
    }

    deleteUserById(id: number, userCtx: Login) {
        return axios.delete(`${this.baseUrl}/users/${id}`, this.getHeader(userCtx));
    }

    login(username: string, password: string) {
        return axios.post(`${this.baseUrl}/auth/login`, {username, password});
    }
}

const service = new ForumService();

export default service;
