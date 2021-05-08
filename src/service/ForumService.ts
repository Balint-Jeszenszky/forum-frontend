import axios from 'axios';
import { NewQuestion, Question } from '../models/Question';
import { Category } from '../models/Category';
import { Login, User } from '../models/User';
import { Answer, NewAnswer } from '../models/Answer';

class ForumService {
    baseUrl = 'http://192.168.0.2:8080/api';

    private getHeader(userCtx: Login) {
        return {
            headers: {
                Authorization: `Bearer ${userCtx.token}`
            }
        }
    }

    getAnswersByQuestionId(id: number) {
        return axios.get(`${this.baseUrl}/answers/${id}`);
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

    deleteAnswerById(id: number) {} // TODO ADMIN

    getCategories() {
        return axios.get(`${this.baseUrl}/categories`);
    }

    getCategoryById(id: number) {} // TODO ADMIN

    postCategory(category: Category) {} // TODO ADMIN

    putCategory(category: Category) {} // TODO ADMIN

    deleteCategoryById(id: number) {} // TODO ADMIN

    getNewestQuestions() {
        return axios.get(`${this.baseUrl}/questions/newest`);
    }

    getQuestionsByCategoryId(id: number) {
        return axios.get(`${this.baseUrl}/questions/${id}`);
    }

    getQuestionById(id: number) {
        return axios.get(`${this.baseUrl}/questions/question/${id}`);
    }

    postQuestion(question: NewQuestion, userCtx: Login) {
        return axios.post(`${this.baseUrl}/questions/question`, question, this.getHeader(userCtx));
    }

    putQuestion(question: NewQuestion, userCtx: Login) {
        return axios.put(`${this.baseUrl}/questions/question`, question, this.getHeader(userCtx));
    }

    deleteQuestionById(id: number) {} // TODO ADMIN

    getUserById(id: number) {} // TODO

    registerUser(user: User) {
        return axios.post(`${this.baseUrl}/auth/register`, user);
    }

    putUser(user: User) {} // TODO

    deleteUserById(id: number) {} // TODO

    login(username: string, password: string) {
        return axios.post(`${this.baseUrl}/auth/login`, {username, password});
    }
}

const service = new ForumService();

export default service;
