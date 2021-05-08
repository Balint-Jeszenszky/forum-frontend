import axios from 'axios';
import { Question } from '../models/Question';
import { Category } from '../models/Category';
import { User } from '../models/User';
import { Answer, NewAnswer } from '../models/Answer';

class ForumService {
    baseUrl = 'http://192.168.0.2:8080/api';

    getAnswersByQuestionId(id: number) {
        return axios.get(`${this.baseUrl}/answers/${id}`);
    }

    getAnswerById(id: number) {}

    postAnswer(answer: NewAnswer) {
        return axios.post(`${this.baseUrl}/answers/answer`, answer);
    }

    putAnswer(answer: Answer) {}

    deleteAnswerById(id: number) {}

    getCategories() {
        return axios.get(`${this.baseUrl}/categories`);
    }

    getCategoryById(id: number) {}

    postCategory(category: Category) {}

    putCategory(category: Category) {}

    deleteCategoryById(id: number) {}

    getNewestQuestions(): Question[] {
        return [
            {   
                id: 1,
                userId: 1,
                categoryId: 1,
                title: 'new question',
                description: 'what',
                time: new Date()
            }
        ];
    }

    getQuestionsByCategoryId(id: number) {
        return axios.get(`${this.baseUrl}/questions/${id}`);
    }

    getQuestionById(id: number) {
        return axios.get(`${this.baseUrl}/questions/question/${id}`)
    }

    postQuestion(question: Question) {}

    putQuestion(question: Question) {}

    deleteQuestionById(id: number) {}

    getUserById(id: number) {}

    postUser(user: User) {
        return axios.post(`${this.baseUrl}/users`, user);
    }

    putUser(user: User) {}

    deleteUserById(id: number) {}
}

const service = new ForumService();

export default service;
